import { useEffect } from "react";
// Style
import "./Modal.css";
// Components
import { Button } from "@barito-bahalap/components";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    document.body.classList.add("no-scroll");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("no-scroll");
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        {title && (
          <div className="modal__header stack row middle between gap-0">
            <h6 className="modal__title">{title}</h6>
            <Button
              onClick={onClose}
              iconName="xLg"
              iconSize={18}
              variant="ghost"
              // size="sm"
            />
          </div>
        )}
        <div className="modal__body">{children}</div>
      </div>
    </>
  );
}
