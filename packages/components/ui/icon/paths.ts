export const ICON_PATHS = {
  layers: ["M12 3 3 8l9 5 9-5-9-5Z", "m3 13 9 5 9-5"],
  split: ["M12 3v6", "m12 9-6 6v6", "m12 9 6 6v6"],
  shield: ["M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z", "m9 12 2 2 4-4"],
  file: ["M7 3h7l5 5v13H7V3Z", "M14 3v5h5", "M10 13h6", "M10 17h6"],
  lock: ["M6 11h12v10H6V11Z", "M8 11V8a4 4 0 0 1 8 0v3"],
  code: ["m8 8-4 4 4 4", "m16 8 4 4-4 4", "m13.5 6-3 12"],
  chart: ["M4 4v16", "M4 20h16", "M8 16v-5", "M12 16V8", "M16 16v-3"],
  workflow: ["M4 5h6v6H4V5Z", "M14 13h6v6h-6v-6Z", "M7 11v3a2 2 0 0 0 2 2h5"],
  megaphone: ["M4 10v4h3l7 4V6l-7 4H4Z", "M17 9a4 4 0 0 1 0 6"],
  newspaper: [
    "M5 4h12v16H7a2 2 0 0 1-2-2V4Z",
    "M17 8h2v10a2 2 0 0 1-2 2",
    "M8 8h6",
    "M8 12h6",
    "M8 16h4",
  ],
  camera: ["M4 8h4l2-3h4l2 3h4v11H4V8Z", "M9 13a3 3 0 1 0 6 0 3 3 0 1 0-6 0"],
  users: [
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M3 20a6 6 0 0 1 12 0",
    "M16 5.5a3 3 0 0 1 0 5.5",
    "M18 14.5A6 6 0 0 1 21 20",
  ],
  mail: ["M3 6h18v12H3V6Z", "m3 7 9 6 9-6"],
  pin: [
    "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z",
    "M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  ],
  check: ["m5 12 5 5 9-10"],
  "arrow-right": ["M5 12h14", "m13 6 6 6-6 6"],
} as const;

export type IconName = keyof typeof ICON_PATHS;
