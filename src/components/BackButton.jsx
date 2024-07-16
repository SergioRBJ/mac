"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const BackButton = ({ children }) => {
  const router = useRouter();
  return (
    <Button
      className="bg-slate-700"
      color="primary"
      onClick={() => router.back()}
    >
      {children}
    </Button>
  );
};

export { BackButton };
