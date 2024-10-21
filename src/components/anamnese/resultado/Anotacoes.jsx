"use client";

import { useState } from "react";
import { Textarea, Button, Tooltip, Spinner } from "@nextui-org/react";
import InfoIcon from "@/icons/InfoIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Anotacoes = ({ anotacoes: initialAnotacoes, idFicha }) => {
  const [anotacoes, setAnotacoes] = useState(initialAnotacoes);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setAnotacoes(e.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/paciente/anamnese/anotacoes/${idFicha}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ anotacoes }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Erro ao salvar anotações");
      }

      toast.success("Anotações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar anotações:", error);
      toast.error("Erro ao salvar anotações. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-6 pt-4 pb-6 gap-5 no-print">
      <ToastContainer /> {/* Adiciona o contêiner de toast */}
      <p className="flex items-center text-primary text-lg w-full">
        Anotações
        <Tooltip
          content="Espaço destinado a anotações gerais sobre o paciente. Essas informações não serão incluídas no PDF."
          className="w-[65%]"
        >
          <button>
            <InfoIcon className="w-[20px] h-[20px] ml-1" />
          </button>
        </Tooltip>
      </p>
      <Textarea
        fullWidth
        rows={6}
        minRows={6}
        value={anotacoes}
        onChange={handleChange}
        className="text-slate-800 border-2 border-slate-700 rounded-lg h-full"
      />
      <div>
        <Button
          className="bg-slate-700"
          color="primary"
          onClick={handleSave}
          disabled={isSaving}
          startContent={isSaving ? <Spinner size="sm" /> : <></>}
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
};

export { Anotacoes };
