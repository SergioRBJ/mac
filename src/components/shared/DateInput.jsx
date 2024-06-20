import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { format, parse } from "date-fns";

const DateInput = ({ value, onChange, onBlur, placeholder }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      setFormattedDate(format(value, "dd/MM/yyyy"));
    } else {
      setFormattedDate("");
    }
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setFormattedDate(inputValue);
    const [day, month, year] = inputValue.split("/");
    if (day && month && year) {
      const parsedDate = parse(
        `${year}-${month}-${day}`,
        "yyyy-MM-dd",
        new Date()
      );
      onChange(parsedDate);
    } else {
      onChange(null);
    }
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={formattedDate}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
};

export { DateInput };
