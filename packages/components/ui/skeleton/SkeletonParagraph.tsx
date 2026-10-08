// Style
import "./SkeletonParagraph.css";
// Components
import { SkeletonBlock } from "./SkeletonBlock";

export function SkeletonParagraph({ count = 5, className = "" }) {
  return (
    <div className={`skel-paragraph ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonBlock key={index} width={index === 0 ? "90%" : "100%"} />
      ))}
    </div>
  );
}
