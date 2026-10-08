import type { DropdownOption } from "@ampikalteng/components";
import type { Region } from "@ampikalteng/types";

export function buildRegionOptions(
  alreadyRegisteredLabel?: string,
  regions?: readonly Region[],
): DropdownOption[] {
  if (!regions) return [];

  return regions.map((region) => ({
    value: region.key,
    label:
      alreadyRegisteredLabel && region.status === "registered"
        ? `${region.name} (${alreadyRegisteredLabel})`
        : region.name,
    disabled: alreadyRegisteredLabel ? region.status === "registered" : false,
  }));
}
