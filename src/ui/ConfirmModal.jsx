import React from "react";

function ConfirmModal({ title, message, onConfirm, onCloseModal }) {
  return (
    <div className="text-center space-y-5">
      {/* Title */}
      <h2 className="text-lg font-semibold text-[var(--color-black)]">
        {title || "Confirm Action"}
      </h2>

      {/* Message */}
      <p className="text-sm text-neutral-600 leading-relaxed">
        {message || "Are you sure you want to continue this operation?"}
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4 pt-4">
        {/* Cancel Button */}
        <button
          onClick={onCloseModal}
          className="px-5 py-2 rounded-lg border border-[var(--color-light-hover)] 
          bg-[var(--color-light)] text-[var(--color-black)]
          hover:bg-[var(--color-light-hover)] transition-colors"
        >
          Cancel
        </button>

        {/* Continue Button */}
        <button
          onClick={() => {
            onConfirm?.();
            onCloseModal();
          }}
          className="px-5 py-2 rounded-lg text-white
          bg-[var(--color-normal)] hover:bg-[var(--color-normal-hover)]
          active:bg-[var(--color-normal-active)] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
