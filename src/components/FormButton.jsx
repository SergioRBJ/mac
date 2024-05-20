import { Button } from "@nextui-org/react";
import PlaneIcon from "@/icons/PlaneIcon.svg";

const FormButton = () => (
  <>
    <Button
      className="text-primary border-primary"
      size="lg"
      variant="bordered"
      startContent={<PlaneIcon />}
    >
      Enviar Formulário
    </Button>
  </>
);
export { FormButton };
