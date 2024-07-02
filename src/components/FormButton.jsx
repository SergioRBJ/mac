import { useFormContext } from "react-hook-form";
import { Button } from "@nextui-org/react";

const FormButton = ({ label, icon, props }) => {
  const { handleSubmit } = useFormContext();

  return (
    <Button
      className="text-primary border-primary w-full"
      size="lg"
      variant="bordered"
      startContent={icon}
      onClick={handleSubmit}
      type="submit"
      {...props}
    >
      {label}
    </Button>
  );
};

export { FormButton };
