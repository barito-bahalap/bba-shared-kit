// Style
import "./SkeletonCard.css";
// Components
import { SkeletonBlock } from "./SkeletonBlock";

/**
SkeletonCard: Matches PropertyCard shape.
Photo area + body with title, location, price, specs row.

Props:
  count : number of cards to render (default: 1)
*/
export function SkeletonCard({ count = 1 }) {
  const card = (
    <div className="card skel-card">
      {/* Photo area matches .card-photo height: 220px */}
      <div className="skel-card-photo" />

      {/* Body matches .card-body padding */}
      <div className="skel-card-body">
        {/* Title */}
        <SkeletonBlock width="75%" height="18px" />
        {/* Location */}
        <SkeletonBlock width="50%" height="12px" />
        {/* Specs row */}
        <div className="skel-card-specs">
          <div className="skel-card-spec">
            <SkeletonBlock width="28px" height="16px" />
            <SkeletonBlock width="32px" height="10px" />
          </div>
          <div className="skel-card-spec">
            <SkeletonBlock width="28px" height="16px" />
            <SkeletonBlock width="32px" height="10px" />
          </div>
          <div className="skel-card-spec">
            <SkeletonBlock width="40px" height="16px" />
            <SkeletonBlock width="28px" height="10px" />
          </div>
        </div>
      </div>
    </div>
  );

  if (count === 1) return card;

  return (
    <div className={`grid-${count}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="card skel-card">
          <div className="skel-card-photo" />
          <div className="skel-card-body">
            <SkeletonBlock width="75%" height="18px" />
            <SkeletonBlock width="50%" height="12px" />
            <div className="skel-card-specs">
              {[0, 1, 2].map((s) => (
                <div key={s} className="skel-card-spec">
                  <SkeletonBlock width="28px" height="16px" />
                  <SkeletonBlock width="32px" height="10px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
