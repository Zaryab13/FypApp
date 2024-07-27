import React, { useEffect, useState } from "react";
import Loader from "../components/UI/Loader";
import useToast from "../hooks/useToast";

const PatientTestHistory = ({ patientId, refresh }) => {
  const [testHistory, setTestHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const getPatientHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/patient/getPatientHistory/${patientId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient history");
        }
        const data = await response.json();
        setTestHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPatientHistory();
  }, [patientId, refresh]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    showToast("Error loading patient history", "error");
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 py-4 border rounded-md px-4">
      <h2 className="text-xl font-medium mb-4 text-slate-800">
        History of Conducted Test
      </h2>
      <ul className="flex flex-col gap-2">
        {testHistory.map((test, index) => {
          const { Affected, "Not Affected": notAffected } = test.result;
          let result;
          if (Affected >= notAffected) {
            result = "You Tested Positive for ADHD";
          } else {
            result = "You Tested Negative for ADHD";
          }
          return (
            <li
              key={index}
              className="border border-Accent px-2 py-4 text-center rounded-md  bg-tertiary flex gap-4"
            >
              <span>{new Date(test.createdAt).toLocaleDateString()}</span>
              <span>{result}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PatientTestHistory;
