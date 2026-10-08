export type RegionStatus = "registered" | "unregistered";

export type Region = {
  key: string;
  name: string;
  status: RegionStatus;
};
