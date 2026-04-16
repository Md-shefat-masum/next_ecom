'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import './ModalBackdrop.css';

interface ModalBackdropProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function ModalBackdrop({ isOpen, onClose, children, className = '' }: ModalBackdropProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-backdrop ${className}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-container">
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

