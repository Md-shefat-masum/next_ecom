"use client";

import { X } from "lucide-react";
import "./ModalBackdrop.css";

export function ModalBackdrop({ isOpen, onClose, children, className = "" }) {
  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal-backdrop ${className}`} onClick={handleBackdropClick}>
      <div className="modal-container">
        <button onClick={onClose} className="modal-close" aria-label="Close modal" type="button">
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
