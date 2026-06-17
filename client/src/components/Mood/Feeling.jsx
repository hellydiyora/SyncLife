import React from "react";
import { feelings } from "../../assets/data/moodPage";

const Feeling = ({
  selectedOption,
  handleToggle,
  handleOptionClick,
}) => {
  return (
    <div className="space-y-4 text-left w-full">
      <div onClick={handleToggle} className="cursor-pointer">
        {selectedOption ? (
          <div className="flex items-center gap-3 bg-[#7E8F7A]/10 border border-[#7E8F7A]/20 p-4 rounded-xl max-w-xs animate-scaleIn">
            <img
              src={selectedOption.image}
              className="w-10 h-10 object-contain"
              alt={selectedOption.value}
            />
            <div>
              <p className="text-xs text-[#736E67] font-semibold tracking-wider uppercase">Currently Selected</p>
              <p className="font-serif text-lg font-semibold text-[#2D2A26]">{selectedOption.value}</p>
            </div>
          </div>
        ) : (
          <div className="py-2.5 px-4 bg-[#C38A72]/10 border border-[#C38A72]/15 text-[#C38A72] text-xs font-semibold rounded-xl max-w-xs text-center">
            No mood selected yet
          </div>
        )}
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-5 bg-white border border-[#736E67]/[0.08] rounded-2xl items-center justify-center p-3.5 shadow-sm gap-2 w-full">
        {feelings.map((item) => {
          const isSelected = selectedOption?.value === item.value;
          return (
            <li
              key={item.value}
              onClick={() => handleOptionClick(item)}
              className={`p-4 rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer transition-all duration-300 group ${
                isSelected
                  ? "bg-[#7E8F7A] text-white shadow-sm"
                  : "hover:bg-[#7E8F7A]/5"
              }`}
            >
              <img
                src={item.image}
                alt={item.value}
                className="w-11 h-11 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <span className={`text-xs font-medium ${
                isSelected ? "text-white" : "text-[#736E67] group-hover:text-[#2D2A26]"
              }`}>
                {item.value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Feeling;
