"use client";

import { Button } from "@nextui-org/react";

const handlePrint = () => {
  const printContent = document.getElementById("printable-content");
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(printContent.innerHTML);
  printWindow.document.close();
  printWindow.print();
};

const PrintButton = ({ children }) => {
  return (
    <Button
      className="bg-slate-700"
      color="primary"
      onClick={() => window.print()}
    >
      {children}
    </Button>
  );
};

export { PrintButton };
