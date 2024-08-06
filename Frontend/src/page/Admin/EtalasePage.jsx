import React from "react";
import FormEtalase from "../../components/Admin/Etalase/FormEtalase";
import TopBar from "../../components/Admin/TopBar";
import EtalaseTable from "../../components/Admin/Etalase/EtalaseTable";

function EtalasePage() {
  return (
    <div>
      <TopBar title="Halaman Etalase" />
      <div className="p-4">
        <FormEtalase />
        <EtalaseTable />
      </div>
    </div>
  );
}

export default EtalasePage;
