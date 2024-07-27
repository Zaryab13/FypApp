import React, { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

const EEGFileUpload = ({ technicianId, patientId, onSubmit, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("eegfile", selectedFile);
    formData.append("technicianId", technicianId);
    formData.append("patientId", patientId);

    onSubmit(formData);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {isLoading && <CircularProgress />}
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="eegfile"
      >
        Upload your EEG file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        ref={fileInputRef}
        id="eegfile"
        type="file"
        accept=".csv"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-1 mt-4 bg-blue-500 text-white outline-none rounded-md hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default EEGFileUpload;
