import React, { useEffect, useState } from "react";

const PatientDetails = ({ patientId, refresh }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/patient/getPatientById/${patientId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patient details");
        }

        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [patientId, refresh]);

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div className="border shadow w-full px-4 py-3 rounded-lg">
      <h1 className="text-3xl font-medium mb-4 text-slate-800">{patient.name}</h1>
      <h2 className="text-2xl text-slate-800 mb-4">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Father Name: </span>
          {patient.fatherName}
        </p>
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Age: </span>
          {patient.age}
        </p>
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Gender: </span>
          {patient.gender}
        </p>
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Cell: </span>
          {patient.cell}
        </p>
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Email: </span>
          {patient.email}
        </p>
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Address: </span>
          {patient.address}
        </p>
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Weight: </span>
          {patient.weight} Kg
        </p>
        <p className="text-slate-600">
          <span className="font-medium text-slate-700 capitalize">Tests Conducted so Far: </span>
          {patient.tests.length === 0 ? "0" : patient.tests.length}
        </p>
      </div>
    </div>
  );
};

export default PatientDetails;
