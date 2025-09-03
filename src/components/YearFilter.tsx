import React from 'react';
import { FaCheck } from "react-icons/fa";

interface YearFilterProps {
  startYear: string;
  endYear: string;
  selectedType: string;
  onStartYearChange: (year: string) => void;
  onEndYearChange: (year: string) => void;
  onTypeChange: (type: string) => void;
  availableYears: string[];
  availableTypes: string[];
}

const YearFilter: React.FC<YearFilterProps> = ({
  startYear,
  endYear,
  selectedType,
  onStartYearChange,
  onEndYearChange,
  onTypeChange,
  availableYears,
  availableTypes
}) => {
  return (
    <div className="mb-6">
      <div className="space-y-4">
        {/* 타입 필터 */}
        <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto pb-2">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-3 py-1 rounded-md font-medium transition-all duration-300 text-xs whitespace-nowrap flex items-center gap-1 flex-shrink-0 ${
                selectedType === type
                  ? "bg-white text-blue-600 border border-blue-400"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-white hover:text-blue-600 hover:border-blue-300"
              }`}
            >
              {selectedType === type && (
                <FaCheck className="w-3 h-3" />
              )}
              {type}
            </button>
          ))}
        </div>

        {/* 연도 선택기 */}
        <div className="flex items-center justify-center space-x-4">
          <select
            id="startYear"
            value={startYear}
            onChange={(e) => onStartYearChange(e.target.value)}
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-600 focus:outline-none focus:border-blue-400 hover:border-blue-300 transition-all duration-300 min-w-[100px]"
          >
            <option value="">All</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          
          <span className="text-xl text-gray-400 font-light">~</span>
          
          <select
            id="endYear"
            value={endYear}
            onChange={(e) => onEndYearChange(e.target.value)}
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-600 focus:outline-none focus:border-blue-400 hover:border-blue-300 transition-all duration-300 min-w-[100px]"
          >
            <option value="">All</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default YearFilter; 