import React, { useEffect, useState } from "react";
import AddPatientModal from "../components/UI/modals/addPatientModal";
import DeleteConfirmationModal from "../components/UI/modals/DeleteConfirmationModal";
import PatientsTable from "../components/Tables/PatientsTable";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";

const Patients = () => {
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    getPatients();
  }, []);

  const patientModalCloseHandler = () => setIsPatientModalOpen(false);
  const addPatientModalConfirmHandler = async (formData, resetForm) => {
    try {
      const response = await fetch("http://localhost:3001/api/patient/add", {
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
      await getPatients();
      showToast(data.message, "success");
      resetForm();
      setIsPatientModalOpen(false);
    } catch (error) {
      showToast(error.message, "error");
    }
  };
  const deletePatientModalConfirmHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/patient/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error("There was an Error in Patient Deletion");

      const data = await response.json();
      showToast(data.message, "success");
      await getPatients();
      setIsDeletionModalOpen(false);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const deletionModalCloseHandler = () => setIsDeletionModalOpen(false);

  const getPatients = async () => {
    const response = await fetch(
      "http://localhost:3001/api/patient/getPatients",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setPatientsData(data);
  };

  return (
    <section className="w-full py-4 px-2">
      <div className="flex justify-between">
        <h1 className="font-medium text-2xl">List of Patients</h1>
        <button
          className="text-slate-100 hover:text-white bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-md"
          onClick={() => setIsPatientModalOpen(true)}
        >
          Add Patient
        </button>
      </div>
      <div className="mt-4">
        <PatientsTable
          patientsData={patientsData}
          onView={(patient) =>
            navigate(`/patients-manage/view`, { state: { patient } })
          }
          onDelete={(id) => {
            setSelectedPatientId(id);
            setIsDeletionModalOpen(true);
          }}
        />
        <AddPatientModal
          open={isPatientModalOpen}
          onClose={patientModalCloseHandler}
          onConfirm={addPatientModalConfirmHandler}
        />
        <DeleteConfirmationModal
          open={isDeletionModalOpen}
          onClose={deletionModalCloseHandler}
          onConfirm={() => deletePatientModalConfirmHandler(selectedPatientId)}
        />
      </div>
    </section>
  );
};

export default Patients;
