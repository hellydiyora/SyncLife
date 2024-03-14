import React from "react";

const GratiProgress = ({ onClose }) => {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-5xl font-subTag">Grati Progress</p>
      <div>
        {" "}
        <button
          onClick={onClose}
          className="bg-slate-200 shadow-lg shadow-slate-400 p-2 rounded-md mt-2 text-black"
        >
          Back to progress page
        </button>
      </div>
    </div>
  );
};

export default GratiProgress;
