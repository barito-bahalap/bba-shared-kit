// Style
import "./SkeletonImage.css";

export function SkeletonImage() {
  return (
    <div className="pgal pgal--loading pgal--5" aria-hidden="true">
      <div className="pgal__hero" />
      <div className="pgal__row">
        <div className="pgal__slot" />
        <div className="pgal__slot" />
        <div className="pgal__slot" />
        <div className="pgal__slot" />
      </div>
    </div>
  );
}
