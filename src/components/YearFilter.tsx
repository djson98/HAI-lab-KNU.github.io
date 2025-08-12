import React from 'react';

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
        <div className="flex flex-wrap justify-center gap-3">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedType === type
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-600 border border-gray-300 hover:bg-gray-50 hover:border-blue-400 hover:shadow-md"
              }`}
            >
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
            className="px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-blue-300 transition-all duration-200 min-w-[100px]"
          >
            <option value="">All</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          
          <span className="text-2xl text-blue-400 font-light">~</span>
          
          <select
            id="endYear"
            value={endYear}
            onChange={(e) => onEndYearChange(e.target.value)}
            className="px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-blue-300 transition-all duration-200 min-w-[100px]"
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