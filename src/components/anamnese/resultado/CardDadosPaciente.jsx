import {
  Card,
  CardHeader,
  Image,
  Divider,
  CardBody,
  CardFooter,
  Button,
  Link,
} from "@nextui-org/react";

const CardDadosPaciente = ({ label, value, variant }) => {
  switch (variant) {
    case "peso":
      value = value + " kg";
      break;
    case "altura":
      value = value + " m";
      break;
    case "idade":
      value = value + " anos";
      break;
    case "porcentagem":
      value = value + " %";
      break;
    default:
      break;
  }

  return (
    <Card className="flex items-center w-full" fullWidth={true}>
      <CardHeader className="flex items-center justify-center bg-slate-700">
        <p className="text-question">{label}</p>
      </CardHeader>
      <CardBody className="flex items-center justify-center bg-slate-300">
        <p className="text-small text-slate-800">{value}</p>
      </CardBody>
    </Card>
  );
};

export { CardDadosPaciente };
