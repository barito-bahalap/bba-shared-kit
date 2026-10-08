// Style
import "./RegionMapCounter.css";
// Components
import { Badge, Button } from "@ampikalteng/components";
// Types
import type { Region } from "@ampikalteng/types";

type RegionMapCounterProps = {
  variant?: "summary" | "full";
  padded?: boolean;
  surface?: boolean;
  md?: boolean;
  clasName?: string;
  counterLabel?: string;
  cta?: {
    label: string;
    to: string;
  };
  regions?: readonly Region[];
};

// TODO: make interactive map visualization
export function RegionMapCounter({
  variant = "summary",
  padded = false,
  surface = false,
  md = false,
  clasName,
  counterLabel,
  cta,
  regions,
}: RegionMapCounterProps) {
  const totalRegions = regions?.length ?? 0;
  const registeredCount =
    regions?.filter((r) => r.status === "registered").length ?? 0;

  const sectionLayout = [
    "region-map-counter stack col",
    padded ? "padded" : "",
    surface ? "surface" : "",
    md ? "md" : "",
    clasName,
  ]
    .filter(Boolean)
    .join(" ");

  // Mock-fetch simulation point: swap this for a real loading/error hook
  // when Supabase is wired in. Keeping the shape here now avoids a rewrite later.
  const isLoading = false;
  const isError = false;

  if (isLoading)
    return (
      <section className={`${sectionLayout} gap-3`}>
        <div className="skeleton" style={{ height: 240 }} />
      </section>
    );

  if (isError)
    return (
      <section className={`${sectionLayout} center gap-2`}>
        <p className="text s, muted">Data belum dapat dimuat saat ini.</p>
      </section>
    );

  const resolvedCounterLabel =
    counterLabel ??
    (registeredCount === 0
      ? "Jadilah kabupaten/kota pertama yang bergabung"
      : `${registeredCount} dari ${totalRegions} kabupaten/kota telah bergabung sebagai mitra resmi`);

  return (
    <section className={`${sectionLayout} gap-12 $`}>
      <h6>{resolvedCounterLabel}</h6>

      {/* Text-equivalent list: accessible fallback for the visual map,
          not just a decorative addition. Screen readers get this either way. */}
      <ul className="region-map-counter__list grid-3 gap-3" role="list">
        {regions?.map((region) => {
          const isRegistered = region.status === "registered";

          return (
            <li key={region.key} className="stack row middle gap-2">
              <span
                className={`region-map-counter__dot region-map-counter__dot--${region.status}`}
                aria-hidden="true"
              />
              <p>{region.name}</p>
              <Badge
                label={isRegistered ? "Terdaftar" : "Belum terdaftar"}
                variant={isRegistered ? "primary" : "ghost"}
              />
            </li>
          );
        })}
      </ul>

      {variant === "summary" && (
        <div className="stack center">
          <Button
            label={cta?.label ?? "Lihat Detail"}
            to={cta?.to ?? "/kemitraan"}
            variant="ink"
            fullWidth
          />
        </div>
      )}
    </section>
  );
}
