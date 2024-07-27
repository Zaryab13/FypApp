import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const PatientTestHistory = ({ patientId, refresh }) => {
  const [testHistory, setTestHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTestHistory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/api/patient/getPatientHistory/${patientId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch test history");
        }

        const data = await response.json();
        setTestHistory(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching test history:", error);
        setIsLoading(false);
      }
    };

    fetchTestHistory();
  }, [patientId, refresh]);
  const getResult = (result) => {
    // Ensure the property names match exactly as in the result object
    const { Affected, "Not Affected": NotAffected } = result;

    // Use the correct variable names in the comparison
    return Affected >= NotAffected ? "Positive" : "Negative";
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="border shadow w-full px-4 py-3 rounded-lg">
      <h2 className="text-2xl text-slate-800 mb-4">Test History</h2>
      {testHistory.length === 0 ? (
        <p className="text-slate-600">No test history available.</p>
      ) : (
        <ul className="space-y-2">
          {testHistory.map((test, index) => (
            <li key={index} className="p-2 border rounded">
              <p className="text-slate-600">
                <span className="font-medium text-slate-700">Result: </span>
                {getResult(test.result)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientTestHistory;
