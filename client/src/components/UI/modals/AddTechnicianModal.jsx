import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useInput from "../../../hooks/use-input";
import { PatternFormat } from "react-number-format";

const validateNotEmpty = (value) => value.trim() !== "";
const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

const AddTechnicianModal = ({ open, onClose, onConfirm }) => {
  const nameInput = useInput(validateNotEmpty);
  const dobInput = useInput(validateNotEmpty);
  const cellInput = useInput(validateNotEmpty);
  const emailInput = useInput(validateEmail);
  const genderInput = useInput(validateNotEmpty);
  const passwordInput = useInput(validateNotEmpty); // New input for password

  const formIsValid =
    nameInput.isValid &&
    dobInput.isValid &&
    cellInput.isValid &&
    emailInput.isValid &&
    genderInput.isValid &&
    passwordInput.isValid; // Include password validation

  const modalConfirmationHandler = (e) => {
    e.preventDefault(); // Prevent form submission

    if (!formIsValid) {
      return;
    }

    onConfirm(
      {
        fullName: nameInput.value,
        dateOfBirth: dobInput.value,
        cell: cellInput.value,
        email: emailInput.value,
        gender: genderInput.value.toLowerCase(),
        password: passwordInput.value, // Include password in the payload
      },
      () => {
        nameInput.reset();
        dobInput.reset();
        cellInput.reset();
        emailInput.reset();
        genderInput.reset();
        passwordInput.reset(); // Reset password field
      }
    );
  };

  return (
    <Dialog open={open} sx={{ borderRadius: 16 }}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "white",
          backgroundColor: "#7480FF",
          paddingX: 20,
        }}
      >
        Register Technician
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "20px !important" }}>
        <div className="grid grid-cols-2 gap-8">
          <TextField
            label="Name"
            name="name"
            placeholder="Name"
            type="text"
            value={nameInput.value}
            onChange={nameInput.ChangeHandler}
            onBlur={nameInput.BlurHandler}
            error={nameInput.hasError}
          />
          <TextField
            label="Date of Birth"
            name="dob"
            placeholder="Date of Birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dobInput.value}
            onChange={dobInput.ChangeHandler}
            onBlur={dobInput.BlurHandler}
            error={dobInput.hasError}
          />
          <FormControl>
            <InputLabel>Gender</InputLabel>
            <Select
              placeholder="Gender"
              label="Gender"
              value={genderInput.value}
              onChange={genderInput.ChangeHandler}
              onBlur={genderInput.BlurHandler}
              error={genderInput.hasError}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <PatternFormat
            format="+92 (###) ### ####"
            allowEmptyFormatting
            mask="_"
            value={cellInput.value}
            onChange={cellInput.ChangeHandler}
            onBlur={cellInput.BlurHandler}
            error={cellInput.hasError ? true : undefined}
            className="border border-gray-300 py-4 px-3 shadow-sm rounded-[4px] text-[rgba(0,0,0,0.87)] hover:border-black focus:border-blue-400 outline-none"
          />
          <TextField
            placeholder="Email"
            type="email"
            label="Email"
            value={emailInput.value}
            onChange={emailInput.ChangeHandler}
            onBlur={emailInput.BlurHandler}
            error={emailInput.hasError}
          />
          <TextField
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.ChangeHandler}
            onBlur={passwordInput.BlurHandler}
            error={passwordInput.hasError}
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ paddingBottom: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="success"
          onClick={modalConfirmationHandler}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTechnicianModal;
