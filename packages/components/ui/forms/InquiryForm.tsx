import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
// Style
import "./InquiryForm.css";
// Components
import { Button, cx } from "@barito-bahalap/components";
// Types
import { inquiryCopy } from "./inquiryCopy";
import type {
  InquiryDivision,
  InquiryFormCopy,
  InquiryLocale,
} from "./inquiryCopy";
import { useTurnstile } from "./useTurnstile";
import type { Brand } from "@barito-bahalap/types";

export interface InquiryFormProps {
  /** Full URL of the bba-api inquiry endpoint. */
  endpoint: string;
  /** Public Cloudflare Turnstile site key (safe to ship to the browser). */
  turnstileSiteKey: string;
  locale: InquiryLocale;
  /** Divisions offered in step 1. With a single entry, step 1 is skipped. Default: bbt, bbm, partnership. */
  divisions?: InquiryDivision[];
  defaultDivision?: InquiryDivision;
  privacyHref: string;
  brand?: Brand;
  /** Adds the optional budget and timeline selects (9 fields instead of 7). */
  showProjectDetails?: boolean;
  /** Override any string; defaults come from inquiryCopy[locale]. */
  copy?: InquiryFormCopy;
  onSuccess?: (ref: string | null) => void;
  className?: string;
}

type FieldKey =
  | "division"
  | "name"
  | "email"
  | "whatsapp"
  | "org_type"
  | "organization"
  | "service_interest"
  | "message"
  | "budget_range"
  | "timeline"
  | "consent"
  | "_form";
type Errors = Partial<Record<FieldKey, string>>;

interface Values {
  division: InquiryDivision | "";
  name: string;
  email: string;
  whatsapp: string;
  orgType: string;
  organization: string;
  serviceInterest: string;
  message: string;
  budgetRange: string;
  timeline: string;
  consent: boolean;
  honeypot: string;
}

const EMPTY: Values = {
  division: "",
  name: "",
  email: "",
  whatsapp: "",
  orgType: "",
  organization: "",
  serviceInterest: "",
  message: "",
  budgetRange: "",
  timeline: "",
  consent: false,
  honeypot: "",
};

const DEFAULT_DIVISIONS: InquiryDivision[] = ["bbt", "bbm", "partnership"];
const EMAIL_RE =
  /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]{2,}$/;
const WHATSAPP_RE = /^\+[1-9][0-9]{7,14}$/;
const FIELD_ORDER: FieldKey[] = [
  "division",
  "name",
  "email",
  "whatsapp",
  "org_type",
  "organization",
  "service_interest",
  "message",
  "consent",
];

// Mirrors the server rules for fast feedback. The server stays authoritative.
function normalizeWhatsapp(input: string): string {
  const s = input.replace(/[\s().-]/g, "");
  if (s.startsWith("+")) return s;
  if (s.startsWith("00")) return `+${s.slice(2)}`;
  if (s.startsWith("0")) return `+62${s.slice(1)}`;
  if (s.startsWith("62")) return `+${s}`;
  return s;
}

function validate(v: Values, needsService: boolean): Errors {
  const e: Errors = {};
  const name = v.name.trim();
  if (!name) e.name = "required";
  else if (name.length < 2) e.name = "too_short";
  else if (name.length > 120) e.name = "too_long";

  const email = v.email.trim();
  if (!email) e.email = "required";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    e.email = "invalid_email";

  if (
    v.whatsapp.trim() &&
    !WHATSAPP_RE.test(normalizeWhatsapp(v.whatsapp.trim()))
  ) {
    e.whatsapp = "invalid_whatsapp";
  }
  if (!v.orgType) e.org_type = "required";
  if (v.orgType && v.orgType !== "individual" && !v.organization.trim())
    e.organization = "required";
  if (v.organization.trim().length > 160) e.organization = "too_long";
  if (needsService && !v.serviceInterest) e.service_interest = "required";

  const message = v.message.trim();
  if (!message) e.message = "required";
  else if (message.length < 10) e.message = "too_short";
  else if (message.length > 5000) e.message = "too_long";
  else if ((message.match(/https?:\/\//gi)?.length ?? 0) > 3)
    e.message = "too_many_links";

  if (!v.consent) e.consent = "consent_required";
  return e;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optionalLabel?: string;
  children: (a11y: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => ReactNode;
}

function Field({
  id,
  label,
  error,
  hint,
  optionalLabel,
  children,
}: FieldProps) {
  const described =
    [error ? `${id}-err` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div className={cx("inq__field", error && "has-error")}>
      <label className="inq__label" htmlFor={id}>
        {label}
        {optionalLabel && (
          <span className="inq__optional"> ({optionalLabel})</span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": described,
      })}
      {hint && !error && (
        <p className="inq__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="inq__error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function InquiryForm({
  endpoint,
  turnstileSiteKey,
  locale,
  divisions = DEFAULT_DIVISIONS,
  defaultDivision,
  privacyHref,
  brand,
  showProjectDetails = false,
  copy,
  onSuccess,
  className,
}: InquiryFormProps) {
  const t = copy ?? inquiryCopy[locale];
  const single = divisions.length === 1;

  const [step, setStep] = useState<1 | 2>(single ? 2 : 1);
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    division: single
      ? (divisions[0] as InquiryDivision)
      : (defaultDivision ?? ""),
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [ref, setRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const inFlight = useRef(false);
  const openedAt = useRef(0);

  const turnstile = useTurnstile(
    turnstileSiteKey,
    step === 2 && status !== "success",
    locale,
  );

  const serviceOptions = values.division
    ? (t.services[values.division] ?? [])
    : [];
  const needsService = serviceOptions.length > 0;

  useEffect(() => {
    if (step === 2) openedAt.current = Date.now();
  }, [step]);

  useEffect(() => {
    if (status === "success") headingRef.current?.focus();
  }, [status]);

  const message = (code: string | undefined) =>
    code ? (t.errors[code] ?? t.errors.invalid) : undefined;

  const set = <K extends keyof Values>(
    key: K,
    value: Values[K],
    errorKey?: FieldKey,
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (submitted && errorKey)
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
  };
  const onText =
    (key: keyof Values, errorKey: FieldKey) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      set(key, e.target.value as never, errorKey);

  const focusFirst = (errs: Errors) => {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first)
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const chooseDivision = (division: InquiryDivision) => {
    setValues((prev) => ({ ...prev, division, serviceInterest: "" }));
    setErrors((prev) => ({ ...prev, division: undefined }));
  };

  const goNext = () => {
    if (!values.division) {
      setErrors({ division: "invalid_division" });
      return;
    }
    setStep(2);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (inFlight.current || status === "submitting") return; // double-submit guard

    setSubmitted(true);
    const errs = validate(values, needsService);
    if (!turnstile.token)
      errs._form =
        turnstile.state === "error" ? "captcha_load" : "captcha_required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirst(errs);
      return;
    }

    inFlight.current = true;
    setStatus("submitting");

    const params = new URLSearchParams(window.location.search);
    const optional = (v: string) => (v.trim() ? v.trim() : undefined);
    const payload = {
      division: values.division,
      locale,
      name: values.name,
      org_type: values.orgType,
      organization: optional(values.organization),
      email: values.email,
      whatsapp: optional(values.whatsapp),
      service_interest: optional(values.serviceInterest),
      budget_range: optional(values.budgetRange),
      timeline: optional(values.timeline),
      message: values.message,
      consent: values.consent,
      utm_source: params.get("utm_source") ?? undefined,
      utm_medium: params.get("utm_medium") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
      referrer: document.referrer || undefined,
      company_website: values.honeypot,
      t: Date.now() - openedAt.current,
      turnstile_token: turnstile.token,
    };

    let succeeded = false;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20_000),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        ref?: string | null;
        error?: string;
        fields?: Record<string, string>;
      } | null;

      if (response.ok && data?.ok) {
        succeeded = true;
        setRef(data.ref ?? null);
        setStatus("success");
        onSuccess?.(data.ref ?? null);
      } else if (response.status === 422 && data?.fields) {
        const mapped: Errors = {};
        for (const [field, code] of Object.entries(data.fields)) {
          mapped[(field === "turnstile_token" ? "_form" : field) as FieldKey] =
            code;
        }
        setErrors(mapped);
        focusFirst(mapped);
      } else if (response.status === 429) {
        setErrors({ _form: "rate_limited" });
      } else if (data?.error === "captcha_failed") {
        setErrors({ _form: "captcha_failed" });
      } else if (response.status === 503) {
        setErrors({ _form: "unavailable" });
      } else {
        setErrors({ _form: "server" });
      }
    } catch {
      setErrors({ _form: "network" });
    } finally {
      inFlight.current = false;
      if (!succeeded) {
        setStatus("idle");
        turnstile.reset(); // tokens are single-use
      }
    }
  };

  const copyRef = async () => {
    if (!ref) return;
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the reference is still selectable on screen */
    }
  };

  const startOver = () => {
    setValues({
      ...EMPTY,
      division: single ? (divisions[0] as InquiryDivision) : "",
    });
    setErrors({});
    setSubmitted(false);
    setRef(null);
    setStatus("idle");
    setStep(single ? 2 : 1);
  };

  // ---------------------------------------------------------------- success
  if (status === "success") {
    return (
      <div className={cx("inq", className)} data-brand={brand}>
        <div className="inq__success" role="status">
          <h3 className="inq__title" ref={headingRef} tabIndex={-1}>
            {t.success.title}
          </h3>
          <p>{t.success.body}</p>
          {ref && (
            <div className="inq__ref">
              <span className="inq__ref-label">{t.success.refLabel}</span>
              <code className="inq__ref-value">{ref}</code>
              <button type="button" className="inq__ref-copy" onClick={copyRef}>
                {copied ? t.success.copied : t.success.copy}
              </button>
            </div>
          )}
          <p className="inq__commitment">{t.success.commitment}</p>
          <Button
            type="button"
            variant="outline"
            label={t.success.again}
            onClick={startOver}
            brand={brand}
          />
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ steps
  return (
    <div className={cx("inq", className)} data-brand={brand}>
      {!single && <p className="inq__progress">{t.progress(step)}</p>}

      <form ref={formRef} className="inq__form" onSubmit={submit} noValidate>
        {step === 1 && (
          <fieldset className="inq__fieldset">
            <legend className="inq__title">{t.step1.title}</legend>
            <p className="inq__hint">{t.step1.hint}</p>
            <div
              className="inq__choices"
              role="radiogroup"
              aria-describedby={
                errors.division ? "inq-division-err" : undefined
              }
            >
              {divisions.map((d) => (
                <label
                  key={d}
                  className={cx(
                    "inq__choice",
                    values.division === d && "is-selected",
                  )}
                >
                  <input
                    type="radio"
                    name="division"
                    value={d}
                    checked={values.division === d}
                    onChange={() => chooseDivision(d)}
                  />
                  <span className="inq__choice-title">
                    {t.step1.divisions[d].title}
                  </span>
                  <span className="inq__choice-desc">
                    {t.step1.divisions[d].description}
                  </span>
                </label>
              ))}
            </div>
            {errors.division && (
              <p className="inq__error" id="inq-division-err">
                {message(errors.division)}
              </p>
            )}
            <div className="inq__actions">
              <Button
                type="button"
                label={t.step1.next}
                onClick={goNext}
                brand={brand}
              />
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <>
            <h3 className="inq__title">
              {values.division ? t.step1.divisions[values.division].title : ""}{" "}
              · {t.step2.title}
            </h3>

            <div className="inq__grid">
              <Field
                id="inq-name"
                label={t.fields.name}
                error={message(errors.name)}
              >
                {(a) => (
                  <input
                    {...a}
                    className="inq__input"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    value={values.name}
                    onChange={onText("name", "name")}
                  />
                )}
              </Field>
              <Field
                id="inq-email"
                label={t.fields.email}
                error={message(errors.email)}
              >
                {(a) => (
                  <input
                    {...a}
                    className="inq__input"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={values.email}
                    onChange={onText("email", "email")}
                  />
                )}
              </Field>
              <Field
                id="inq-org-type"
                label={t.fields.orgType}
                error={message(errors.org_type)}
              >
                {(a) => (
                  <select
                    {...a}
                    className="inq__input"
                    name="org_type"
                    value={values.orgType}
                    onChange={onText("orgType", "org_type")}
                  >
                    <option value="">{t.fields.choose}</option>
                    {t.orgTypes.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <Field
                id="inq-org"
                label={t.fields.organization}
                optionalLabel={
                  values.orgType === "individual" ? t.step2.optional : undefined
                }
                error={message(errors.organization)}
              >
                {(a) => (
                  <input
                    {...a}
                    className="inq__input"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    maxLength={160}
                    value={values.organization}
                    onChange={onText("organization", "organization")}
                  />
                )}
              </Field>
              <Field
                id="inq-wa"
                label={t.fields.whatsapp}
                optionalLabel={t.step2.optional}
                hint={t.fields.whatsappHint}
                error={message(errors.whatsapp)}
              >
                {(a) => (
                  <input
                    {...a}
                    className="inq__input"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={30}
                    value={values.whatsapp}
                    onChange={onText("whatsapp", "whatsapp")}
                  />
                )}
              </Field>
              {needsService && (
                <Field
                  id="inq-service"
                  label={t.fields.serviceInterest}
                  error={message(errors.service_interest)}
                >
                  {(a) => (
                    <select
                      {...a}
                      className="inq__input"
                      name="service_interest"
                      value={values.serviceInterest}
                      onChange={onText("serviceInterest", "service_interest")}
                    >
                      <option value="">{t.fields.choose}</option>
                      {serviceOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
              )}
              {showProjectDetails && (
                <>
                  <Field
                    id="inq-budget"
                    label={t.fields.budgetRange}
                    optionalLabel={t.step2.optional}
                  >
                    {(a) => (
                      <select
                        {...a}
                        className="inq__input"
                        name="budget_range"
                        value={values.budgetRange}
                        onChange={onText("budgetRange", "budget_range")}
                      >
                        <option value="">{t.fields.choose}</option>
                        {t.budgets.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <Field
                    id="inq-timeline"
                    label={t.fields.timeline}
                    optionalLabel={t.step2.optional}
                  >
                    {(a) => (
                      <select
                        {...a}
                        className="inq__input"
                        name="timeline"
                        value={values.timeline}
                        onChange={onText("timeline", "timeline")}
                      >
                        <option value="">{t.fields.choose}</option>
                        {t.timelines.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                </>
              )}
            </div>

            <Field
              id="inq-message"
              label={t.fields.message}
              hint={t.fields.messageHint}
              error={message(errors.message)}
            >
              {(a) => (
                <textarea
                  {...a}
                  className="inq__input inq__textarea"
                  name="message"
                  rows={5}
                  maxLength={5000}
                  value={values.message}
                  onChange={onText("message", "message")}
                />
              )}
            </Field>

            {/* Honeypot: invisible to people and assistive tech, irresistible to form-filling bots. */}
            <div className="inq__hp" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.honeypot}
                  onChange={(e) => set("honeypot", e.target.value)}
                />
              </label>
            </div>

            <div className={cx("inq__consent", errors.consent && "has-error")}>
              <label className="inq__check">
                <input
                  type="checkbox"
                  name="consent"
                  checked={values.consent}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent ? "inq-consent-err" : undefined
                  }
                  onChange={(e) => set("consent", e.target.checked, "consent")}
                />
                <span>
                  {t.consent.before}
                  <a
                    href={privacyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.consent.link}
                  </a>
                  {t.consent.after}
                </span>
              </label>
              {errors.consent && (
                <p className="inq__error" id="inq-consent-err">
                  {message(errors.consent)}
                </p>
              )}
            </div>

            <div ref={turnstile.containerRef} className="inq__turnstile" />

            {errors._form && (
              <p className="inq__error inq__error--form" role="alert">
                {message(errors._form)}
              </p>
            )}
            <p className="inq__sr" role="status" aria-live="polite">
              {status === "submitting" ? t.step2.submitting : ""}
            </p>

            <div className="inq__actions">
              {!single && (
                <Button
                  type="button"
                  variant="ghost"
                  label={t.step2.back}
                  onClick={() => setStep(1)}
                  disabled={status === "submitting"}
                />
              )}
              <Button
                type="submit"
                label={
                  status === "submitting"
                    ? t.step2.submitting
                    : turnstile.token
                      ? t.step2.submit
                      : t.step2.verifying
                }
                loading={status === "submitting"}
                disabled={!turnstile.token}
                brand={brand}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
