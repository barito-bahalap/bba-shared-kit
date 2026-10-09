import React from "react";
// Style
import "./Icon.css";
// Assets
import { SVG_PATHS } from "@baritobahalap/icons";
import type { IconsType } from "@baritobahalap/types";

// Types
type SVGShapeType =
  | "path"
  | "circle"
  | "rect"
  | "ellipse"
  | "line"
  | "polyline"
  | "polygon";

interface SVGShapeObjectLoose {
  type: string;
  [key: string]: unknown;
}
interface SVGShapeObject {
  type: SVGShapeType;
  [key: string]: unknown;
}
type IconData = string | Array<string | SVGShapeObjectLoose> | React.ReactNode;

interface IconProps {
  path?: IconData;
  iconName?: IconsType;
  size?: number | string;
  fill?: string;
  fillHover?: string;
  stroke?: string;
  strokeWidth?: number;
  viewBox?: string;
  circle?: boolean;
  circleRadius?: number;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
  text?: string;
  label?: string;
  className?: string;
  ariaLabel?: string;
  pointer?: boolean;
  bgColor?: string;
}

const VALID_SHAPE_TYPES = new Set<SVGShapeType>([
  "path",
  "circle",
  "rect",
  "ellipse",
  "line",
  "polyline",
  "polygon",
]);
function isValidShapeType(type: string): type is SVGShapeType {
  return VALID_SHAPE_TYPES.has(type as SVGShapeType);
}
const SHAPE_COMPONENTS: Record<SVGShapeType, React.ElementType> = {
  path: "path",
  circle: "circle",
  rect: "rect",
  ellipse: "ellipse",
  line: "line",
  polyline: "polyline",
  polygon: "polygon",
};
function renderShapes(data: IconData): React.ReactNode {
  if (!data) return null;
  if (typeof data === "string") return <path d={data} />;
  if (Array.isArray(data)) {
    return data.map((item, i) => {
      if (typeof item === "string") return <path key={i} d={item} />;
      const { type, ...props } = item as SVGShapeObject;
      if (!isValidShapeType(type)) return null;
      const Tag = SHAPE_COMPONENTS[type];
      return <Tag key={i} {...props} />;
    });
  }
  return data as React.ReactNode;
}

export function Icon({
  path,
  iconName,
  size = 20,
  fill = "var(--clr-primary)",
  fillHover = "var(--clr-accent-hover)",
  stroke = "none",
  strokeWidth = 2,
  viewBox = "0 0 16 16",
  circle = false,
  circleRadius = 6,
  onClick,
  style,
  text,
  label,
  className = "",
  ariaLabel,
  pointer = false,
  bgColor = "transparent",
}: IconProps) {
  const iconPaths = SVG_PATHS as Record<string, IconData> | undefined;
  const resolvedData: IconData | null =
    path ?? (iconName ? (iconPaths?.[iconName as string] ?? null) : null);
  const baseClass =
    `app-icon ${className} ${pointer ? "app-icon--pointer" : ""}`.trim();
  const cssVars = {
    "--icon-fill": fill,
    "--icon-fill-hover": fillHover,
  } as React.CSSProperties;
  const sharedSvgProps: React.SVGProps<SVGSVGElement> = {
    className: baseClass,
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    fill,
    onClick,
    style: { ...style, ...cssVars },
    "aria-label": ariaLabel,
    "aria-hidden": ariaLabel ? undefined : true,
    role: ariaLabel ? "img" : undefined,
  };

  if (text) {
    return (
      <svg {...sharedSvgProps} viewBox={viewBox}>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
          {text}
        </text>
      </svg>
    );
  }

  if (circle) {
    const diameter = circleRadius * 2;
    return (
      <svg {...sharedSvgProps} viewBox={`0 0 ${diameter} ${diameter}`}>
        <circle cx={circleRadius} cy={circleRadius} r={circleRadius} />
      </svg>
    );
  }

  const svg = (
    <div className="icon-svg" style={{ background: bgColor }}>
      <svg
        {...sharedSvgProps}
        viewBox={viewBox}
        stroke={stroke}
        strokeWidth={stroke !== "none" ? strokeWidth : undefined}
      >
        {renderShapes(resolvedData)}
      </svg>
    </div>
  );

  if (!label) return svg;
  return (
    <span className="stack row middle fit gap-2 icon-container">
      {svg}
      <p className="icon-label" style={{ color: fill }}>
        {label}
      </p>
    </span>
  );
}
