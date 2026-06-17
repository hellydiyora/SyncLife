import React from "react";

const ConfirmBox = ({ visible, message, onCancel, onConfirm }) => {
  return (
    visible && (
      <div
        className="fixed inset-0 bg-[#2D2A26]/40 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onCancel}
      >
        <div
          className="bg-white rounded-2xl shadow-xl border border-[#736E67]/[0.08] p-8 max-w-sm w-[90%] animate-scaleIn text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-12 bg-[#C38A72]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-5 h-5 text-[#C38A72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-[#2D2A26] text-base font-serif font-semibold mb-6 leading-relaxed">
            {message}
          </p>
          <div className="flex gap-3">
            <button
              className="flex-1 py-2.5 px-4 border border-[#736E67]/20 text-[#736E67] rounded-full text-sm font-medium tracking-wide hover:bg-[#FAF8F5] transition-all duration-300"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2.5 px-4 bg-[#7E8F7A] text-white rounded-full text-sm font-medium tracking-wide hover:bg-[#6B7D68] transition-all duration-300 shadow-sm"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmBox;