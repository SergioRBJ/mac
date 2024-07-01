import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { format, parse, isValid } from "date-fns";

const DateInput = ({ value, onChange, onBlur, placeholder, defaultValue }) => {
  const [formattedDate, setFormattedDate] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setFormattedDate(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value && isValid(value)) {
      setFormattedDate(format(value, "dd/MM/yyyy"));
    }
  }, [value]);

  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8); // Limita a entrada a 8 caracteres
    }

    // Adiciona a barra após o dia e o mês
    if (inputValue.length > 2 && inputValue.length <= 4) {
      inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
    } else if (inputValue.length > 4) {
      inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(
        2,
        4
      )}/${inputValue.slice(4)}`;
    }

    setFormattedDate(inputValue);

    const [day, month, year] = inputValue.split("/");
    if (day && month && year && year.length === 4) {
      const parsedDate = parse(
        `${year}-${month}-${day}`,
        "yyyy-MM-dd",
        new Date()
      );
      if (isValid(parsedDate)) {
        onChange(parsedDate);
      } else {
        onChange(null);
      }
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
      maxLength={10} // Limita a entrada a 10 caracteres (dd/MM/yyyy)
    />
  );
};

export { DateInput };
