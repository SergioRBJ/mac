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
import { signOut } from "next-auth/react";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const hiddenRoutes = [
    "/profissional/login",
    "/paciente/anamnese/preencher",
    "/paciente/anamnese/ficha",
  ];

  const shouldHideNavbarContent = hiddenRoutes.includes(pathname);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/profissional/login" });
  };

  const handleChangePassword = () => {
    router.push("/profissional/alterar-senha");
  };

  return !shouldHideNavbarContent ? (
    <Navbar
      maxWidth="full"
      className=" bg-secondary text-clear header-fixed no-print"
      height="55px"
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
                Anamnese
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="anamnese-opcoes"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="paciente-liberar"
              description="Liberar acesso do paciente ao preenchimento da ficha de anamnese."
              startContent={
                <Image
                  alt="ficha"
                  height={40}
                  radius="sm"
                  src="/icons/FileIcon.svg"
                  width={40}
                  className="text-primary"
                />
              }
              onClick={() => handleNavigation("/paciente/anamnese/liberar")}
            >
              Liberar Ficha
            </DropdownItem>
            <DropdownItem
              key="paciente-listar-fichas"
              description="Listar todas as fichas de anamnese preenchidas pelos pacientes."
              startContent={
                <Image
                  alt="fichas"
                  height={40}
                  radius="sm"
                  src="/icons/FilePatientIcon.svg"
                  width={40}
                  className="text-primary"
                />
              }
              onClick={() =>
                handleNavigation("/paciente/anamnese/listar-fichas")
              }
            >
              Listar Fichas
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

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
                Mais Ações
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="mais-acoes"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="profissional-trocar-senha"
              description="Alterar a senha do seu usuário."
              startContent={
                <Image
                  alt="trocar-senha-icone"
                  height={40}
                  radius="sm"
                  src="/icons/PasswordIcon.svg"
                  width={40}
                  className="text-primary"
                />
              }
              onClick={handleChangePassword}
            >
              Alterar Senha
            </DropdownItem>
            <DropdownItem
              key="profissional-logout"
              description="Fazer o logout do sistema."
              startContent={
                <Image
                  alt="sair-icone"
                  height={40}
                  radius="sm"
                  src="/icons/ExitIcon.svg"
                  width={40}
                  className="text-primary"
                />
              }
              onClick={handleLogout}
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarBrand
        className={`flex items-center ${
          shouldHideNavbarContent ? "justify-start" : "justify-end"
        }`}
      >
        <Image
          src={"/assets/logo.png"}
          alt="logo"
          width={60}
          height={60}
          className="rounded-lg"
        />
      </NavbarBrand>
    </Navbar>
  ) : (
    <></>
  );
};

export { Header };
