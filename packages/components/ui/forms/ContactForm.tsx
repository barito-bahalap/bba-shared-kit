import type { FormEvent, ReactNode } from "react";
// Style
import "./ContactForm.css";
// Components
import { Button, Checkbox } from "@barito-bahalap/components";
import { Input, Select, Textarea } from "@barito-bahalap/components";
// Types
import type { SelectOption } from "@barito-bahalap/components";

export type ContactField =
  | "name"
  | "organization"
  | "email"
  | "division"
  | "message"
  | "consent";

export interface ContactFormValues {
  name: string;
  organization: string;
  email: string;
  division: string;
  message: string;
  consent: boolean;
}

export type ContactFormErrors = Partial<Record<ContactField, string>>;

export interface ContactFormLabels {
  name: string;
  organization: string;
  email: string;
  division: string;
  message: string;
}

const DEFAULT_LABELS: ContactFormLabels = {
  name: "Full name",
  organization: "Organization",
  email: "Email address",
  division: "Enquiry concerns",
  message: "Message",
};

interface ContactFormProps {
  values: ContactFormValues;
  errors: ContactFormErrors;
  divisionOptions: readonly SelectOption[];
  status: "idle" | "prepared";
  onChange: (field: ContactField, value: string | boolean) => void;
  onSubmit: () => void;
  labels?: Partial<ContactFormLabels>;
  submitLabel?: string;
  consentLabel?: ReactNode;
  statusMessage?: string;
}

export function ContactForm({
  values,
  errors,
  divisionOptions,
  status,
  onChange,
  onSubmit,
  labels,
  submitLabel = "Prepare email",
  consentLabel = "I agree that the details above may be used to respond to my enquiry.",
  statusMessage = "Your email app should open with the message ready to send. If nothing opens, copy the address shown beside this form.",
}: ContactFormProps) {
  const text = { ...DEFAULT_LABELS, ...labels };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <Input
          id="contact-name"
          label={text.name}
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event) => onChange("name", event.target.value)}
        />
        <Input
          id="contact-organization"
          label={text.organization}
          autoComplete="organization"
          value={values.organization}
          error={errors.organization}
          onChange={(event) => onChange("organization", event.target.value)}
        />
      </div>
      <Input
        id="contact-email"
        label={text.email}
        type="email"
        autoComplete="email"
        required
        value={values.email}
        error={errors.email}
        onChange={(event) => onChange("email", event.target.value)}
      />
      <Select
        id="contact-division"
        label={text.division}
        options={divisionOptions}
        value={values.division}
        error={errors.division}
        onChange={(event) => onChange("division", event.target.value)}
      />
      <Textarea
        id="contact-message"
        label={text.message}
        required
        value={values.message}
        error={errors.message}
        onChange={(event) => onChange("message", event.target.value)}
        rows={3}
      />
      <Checkbox
        id="contact-consent"
        label={consentLabel}
        checked={values.consent}
        error={errors.consent}
        onChange={(checked) => onChange("consent", checked)}
      />

      <Button label={submitLabel} type="submit" fullWidth />

      {status === "prepared" && (
        <p className="contact-form__status" role="status">
          {statusMessage}
        </p>
      )}
    </form>
  );
}
