"use client";

import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { useNavegacaoContext } from "@/contexts/navegacaoContext";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const hiddenRoutes = [
    "/profissional/login",
    "/paciente/anamnese/preencher",
    "/paciente/anamnese/formulario",
  ];
  const { setNavegacaoValida } = useNavegacaoContext();

  const shouldHideNavbarContent = hiddenRoutes.includes(pathname);

  const handleNavigation = (path) => {
    setNavegacaoValida(path);
    router.push(path);
  };
  return (
    <Navbar
      maxWidth="full"
      className=" bg-secondary text-clear"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[4px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-button",
        ],
      }}
    >
      {!shouldHideNavbarContent && (
        <NavbarContent className="gap-4">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 data-[hover=true]:bg-transparent text-clear text-medium"
                  endContent={<ChevronDownIcon />}
                  radius="sm"
                  variant="light"
                >
                  Paciente
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="paciente-liberar"
                description="Liberar acesso do paciente ao preenchimento do formulário de anamnese."
                startContent={
                  <Image
                    alt="formulario"
                    height={40}
                    radius="sm"
                    src="/icons/FileIcon.svg"
                    width={40}
                    className="text-primary"
                  />
                }
                onClick={() => handleNavigation("/paciente/anamnese/liberar")}
              >
                Liberar Formulário
              </DropdownItem>
              <DropdownItem
                key="paciente-listar-formularios"
                description="Listar todos os formulários preenchidos pelos pacientes."
                startContent={
                  <Image
                    alt="formulario"
                    height={40}
                    radius="sm"
                    src="/icons/FilePatientIcon.svg"
                    width={40}
                    className="text-primary"
                  />
                }
                onClick={() =>
                  handleNavigation("/paciente/anamnese/listar-formularios")
                }
              >
                Listar Formulários
              </DropdownItem>
              {/* <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
      <NavbarBrand
        className={`flex items-center ${
          shouldHideNavbarContent ? "justify-start" : "justify-end"
        }`}
      >
        <Image
          src={"/assets/logo.png"}
          alt="logo"
          width={80}
          height={80}
          className="rounded-lg"
        />
      </NavbarBrand>
    </Navbar>
  );
};

export { Header };
