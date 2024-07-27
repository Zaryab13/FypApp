import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PatientDetails from "../components/patient/PatientDetails";
import PatientTestHistory from "../components/patient/PatientTestHistory";
import EEGFileUpload from "../components/patient/EEGFileUpload";
import useToast from "../hooks/useToast";

const ViewPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { state } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { patient } = location.state || {};

  const eegTestSubmissionHandler = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/test/eeg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network Error");
      }

      setIsLoading(false);
      showToast("EEG test submitted successfully!", "success");

      // Trigger refresh of patient history
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error uploading the file:", error);
      setIsLoading(false);
      showToast("Failed to submit the EEG test. Please try again.", "error");
    }
  };

  return (
    <section className="px-4 py-20 relative">
      <div
        className="absolute top-4 left-2 p-2 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer transition-all"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <PatientDetails patientId={patient._id} refresh={refresh} />
        <PatientTestHistory patientId={patient._id} refresh={refresh} />
        <EEGFileUpload
          technicianId={state._id}
          patientId={patient._id}
          onSubmit={eegTestSubmissionHandler}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default ViewPatient;
