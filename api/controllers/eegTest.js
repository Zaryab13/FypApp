import fs from "fs";
import FormData from "form-data";
import EegTest from "../models/eegTest.js";
import Patient from "../models/patient.js";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

export const computeTest = async (req, res) => {
  console.log(req.file);
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const uniqueFilename = uuidv4();
    const formData = new FormData();
    formData.append(
      "file",
      fs.createReadStream(req.file.path, {
        filename: uniqueFilename,
      })
    );

    // Function to handle fetch with retry logic
    const fetchWithRetry = async (url, options, retries = 5) => {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const response = await fetch(url, options);
          if (response.ok) {
            return response;
          }
          throw new Error(
            `Failed to fetch (${response.status}): ${response.statusText}`
          );
        } catch (error) {
          console.error(`Fetch attempt ${attempt + 1} failed:`, error.message);
          attempt++;
        }
      }
      throw new Error(`Exceeded maximum retry attempts (${retries})`);
    };

    const response = await fetchWithRetry("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
      timeout: 60000, // Adjust timeout as necessary
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const responseData = await response.json();

    const newTest = new EegTest({
      technicianId: req.body.technicianId,
      patientId: req.body.patientId,
      result: responseData,
      file: uniqueFilename,
    });

    await newTest.save();

    await Patient.findByIdAndUpdate(
      req.body.patientId,
      { $push: { tests: newTest._id } },
      { new: true, useFindAndModify: false }
    );

    fs.unlinkSync(req.file.path);

    res.status(201).json(newTest);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};
