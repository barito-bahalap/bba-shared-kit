import type { DivisionConfig } from "@barito-bahalap/types";

export const divisions: DivisionConfig[] = [
  {
    id: "bbt",
    name: "Barito Bahalap Tech",
    shortName: "BBT",
    pitch:
      "Digital infrastructure, internal systems and operational dashboards for organizations.",
    externalUrl: import.meta.env.VITE_BBT_URL ?? "",
    accentVar: "--bba-accent-tech",
  },
  {
    id: "bbm",
    name: "Barito Bahalap Media",
    shortName: "BBM",
    pitch:
      "Strategic communications, content operations and editorial publication.",
    externalUrl: import.meta.env.VITE_BBM_URL ?? "",
    accentVar: "--bba-accent-media",
  },
];

export const getDivision = (id: DivisionConfig["id"]) =>
  divisions.find((d) => d.id === id);
