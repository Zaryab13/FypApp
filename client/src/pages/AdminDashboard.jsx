import React, { useEffect, useState } from "react";
import AddTechnicianModal from "../components/UI/modals/AddTechnicianModal";
import DeleteConfirmationModal from "../components/UI/modals/DeleteConfirmationModal";
import TechniciansTable from "../components/Tables/TechnicianTable";
import useToast from "../hooks/useToast";

const AdminDashboard = () => {
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [techniciansData, setTechniciansData] = useState([]);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    getTechnicians();
  }, []);

  const technicianModalCloseHandler = () => setIsTechnicianModalOpen(false);
  const addTechnicianModalConfirmHandler = async (formData, resetForm) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/registerTechnician", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        showToast(data.message, "error");
        return;
      }
      await getTechnicians();
      showToast(data.message, "success");
      resetForm();
      setIsTechnicianModalOpen(false);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const deleteTechnicianModalConfirmHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/auth/deleteTechnician/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error("There was an error deleting the technician");

      const data = await response.json();
      showToast(data.message, "success");
      await getTechnicians();
      setIsDeletionModalOpen(false);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const deletionModalCloseHandler = () => setIsDeletionModalOpen(false);

  const getTechnicians = async () => {
    const response = await fetch(
      "http://localhost:3001/api/auth/getTechnicians",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setTechniciansData(data);
  };

  return (
    <section className="w-full py-4 px-2">
      <div className="flex justify-between">
        <h1 className="font-medium text-2xl">List of Technicians</h1>
        <button
          className="text-slate-100 hover:text-white bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-md"
          onClick={() => setIsTechnicianModalOpen(true)}
        >
          Add Technician
        </button>
      </div>
      <div className="mt-4">
        <TechniciansTable
          techniciansData={techniciansData}
          onDelete={(id) => {
            setSelectedTechnicianId(id);
            setIsDeletionModalOpen(true);
          }}
        />
        <AddTechnicianModal
          open={isTechnicianModalOpen}
          onClose={technicianModalCloseHandler}
          onConfirm={addTechnicianModalConfirmHandler}
        />
        <DeleteConfirmationModal
          open={isDeletionModalOpen}
          onClose={deletionModalCloseHandler}
          onConfirm={() => deleteTechnicianModalConfirmHandler(selectedTechnicianId)}
        />
      </div>
    </section>
  );
};

export default AdminDashboard;
