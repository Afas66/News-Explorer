import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, getDaysInMonth } from "date-fns";

interface DatePickerWithYearProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

// Generate years from 1900 to current year + 10
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 11 }, (_, i) =>
  (currentYear + 10 - i).toString()
);

export function DatePickerWithYear({
  value,
  onChange,
  placeholder = "Pick a date",
}: DatePickerWithYearProps) {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  // Parse existing value
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedYear(date.getFullYear().toString());
      setSelectedMonth(String(date.getMonth() + 1).padStart(2, "0"));
      setSelectedDay(String(date.getDate()).padStart(2, "0"));
    } else {
      setSelectedYear("");
      setSelectedMonth("");
      setSelectedDay("");
    }
  }, [value]);

  // Calculate available days based on selected year and month
  const availableDays = useMemo(() => {
    if (!selectedYear || !selectedMonth) {
      return Array.from({ length: 31 }, (_, i) =>
        String(i + 1).padStart(2, "0")
      );
    }
    const daysInMonth = getDaysInMonth(
      new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1)
    );
    return Array.from({ length: daysInMonth }, (_, i) =>
      String(i + 1).padStart(2, "0")
    );
  }, [selectedYear, selectedMonth]);

  // Update parent when all fields are selected
  const updateDate = (year: string, month: string, day: string) => {
    if (year && month && day) {
      // Validate day is within range for the month
      const daysInMonth = getDaysInMonth(
        new Date(parseInt(year), parseInt(month) - 1)
      );
      const validDay = Math.min(parseInt(day), daysInMonth);
      const formattedDay = String(validDay).padStart(2, "0");
      onChange(`${year}-${month}-${formattedDay}`);
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    updateDate(year, selectedMonth, selectedDay);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    updateDate(selectedYear, month, selectedDay);
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    updateDate(selectedYear, selectedMonth, day);
  };

  return (
    <div className="flex gap-1.5 sm:gap-2 flex-1 min-w-0">
      {/* Day Selector */}
      <Select value={selectedDay} onValueChange={handleDayChange}>
        <SelectTrigger className="w-[60px] sm:w-[70px] bg-input border-border text-xs sm:text-sm px-2 sm:px-3">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {availableDays.map((day) => (
            <SelectItem key={day} value={day}>
              {parseInt(day)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Month Selector */}
      <Select value={selectedMonth} onValueChange={handleMonthChange}>
        <SelectTrigger className="flex-1 min-w-[80px] bg-input border-border text-xs sm:text-sm px-2 sm:px-3">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {MONTHS.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Selector */}
      <Select value={selectedYear} onValueChange={handleYearChange}>
        <SelectTrigger className="w-[75px] sm:w-[90px] bg-input border-border text-xs sm:text-sm px-2 sm:px-3">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {YEARS.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
