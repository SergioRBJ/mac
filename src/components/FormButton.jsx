// components/FormButton.jsx

import { useFormContext } from "react-hook-form";
import { Button } from "@nextui-org/react";
import PlaneIcon from "@/icons/PlaneIcon.svg";

const FormButton = () => {
  const { handleSubmit } = useFormContext();

  return (
    <Button
      className="text-primary border-primary"
      size="lg"
      variant="bordered"
      startContent={<PlaneIcon />}
      onClick={handleSubmit}
      type="submit"
    >
      Enviar Formulário
    </Button>
  );
};

export { FormButton };
