// Style
import "./MediaSection.css";
// Components
import { Icon } from "@ampikalteng/components";

export function MediaSection({
  title = "Media",
  subtitle = "Thumbnail for listing cards. Gallery for detail page.",
  gallery = [],
  onGalleryRemove = () => console.log("onGalleryRemove"),
}) {
  return (
    <div className="spep-section">
      <div className="spep-section-head">
        <p className="spep-section-title">{title}</p>
        <p className="spep-section-sub">{subtitle}</p>
      </div>
      <div className="spep-section-divider" />
      <div className="spep-section-body">
        <div className="spep-media-row">
          <div>
            <p className="input-label">Gallery</p>
            <div className="spep-gallery-grid">
              {[0, 1, 2, 3].map((i) => (
                <ImageSlot
                  key={i}
                  src={gallery[i] ?? ""}
                  label={`Photo ${i + 1}`}
                  onRemove={onGalleryRemove}
                />
              ))}
            </div>
          </div>
        </div>
        {/* TODO(PROD): integrate file upload system (storage + API), handle upload/remove actions, validation, and sync with property media state */}
        <p className="spep-media-caption text-caption">
          Upload functionality coming in Uploads section.
        </p>
      </div>
    </div>
  );
}

/** Image slot: placeholder or thumbnail */
export function ImageSlot({
  src = "",
  label = "",
  onRemove = () => console.log("onRemove"),
}) {
  const hasImg = src && src.trim() !== "";
  return (
    <div className="spep-img-slot">
      {hasImg ? (
        <>
          <img src={src} alt={label} className="spep-img" />
          <button className="spep-img-remove" onClick={onRemove} title="Remove">
            <Icon iconName="xLg" size={10} />
          </button>
        </>
      ) : (
        <div className="spep-img-placeholder">
          <Icon iconName="images" size={18} fill="var(--clr-ink-muted)" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
