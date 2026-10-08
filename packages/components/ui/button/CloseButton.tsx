// Style
import "./CloseButton.css";

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button className="close-btn" onClick={onClick} aria-label="Close">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

type CloseButtonProps = {
  onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
  >;
} & React.HTMLAttributes<HTMLElement>;
