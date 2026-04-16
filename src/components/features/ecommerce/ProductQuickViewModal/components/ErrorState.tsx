'use client';

import './ErrorState.css';

interface ErrorStateProps {
  message?: string;
  onClose: () => void;
}

export default function ErrorState({ message = 'Product not found', onClose }: ErrorStateProps) {
  return (
    <div className="modal-error">
      <p>{message}</p>
      <button onClick={onClose} className="error-close-button">
        Close
      </button>
    </div>
  );
}

