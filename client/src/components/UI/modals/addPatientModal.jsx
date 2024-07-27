import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useInput from "../../../hooks/use-input";
const validateNotEmpty = (value) => value.trim() !== "";
const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

const AddPatientModal = ({ open, onClose, onConfirm }) => {
  const nameInput = useInput(validateNotEmpty);
  const fatherNameInput = useInput(validateNotEmpty);
  const ageInput = useInput(validateNotEmpty);
  const genderInput = useInput(validateNotEmpty);
  const cellInput = useInput(validateNotEmpty);
  const emailInput = useInput(validateEmail);
  const addressInput = useInput(validateNotEmpty);
  const weightInput = useInput(validateNotEmpty);

  const formIsValid =
    nameInput.isValid &&
    fatherNameInput.isValid &&
    ageInput.isValid &&
    genderInput.isValid &&
    cellInput.isValid &&
    emailInput.isValid &&
    addressInput.isValid &&
    weightInput.isValid;

  const modalConfirmationHandler = (e) => {
    if (!formIsValid) {
      return;
    }

    onConfirm(
      {
        name: nameInput.value,
        fatherName: fatherNameInput.value,
        age: ageInput.value,
        gender: genderInput.value.toLowerCase(),
        cell: cellInput.value,
        email: emailInput.value,
        address: addressInput.value,
        weight: weightInput.value,
      },
      () => {
        nameInput.reset();
        fatherNameInput.reset();
        ageInput.reset();
        genderInput.reset();
        cellInput.reset();
        emailInput.reset();
        addressInput.reset();
        weightInput.reset();
      }
    );
  };

  return (
    <Dialog
      open={open}
      sx={{
        borderRadius: 16,
      }}
    >
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
        Register Patient
      </DialogTitle>
      <DialogContent
        sx={{
          paddingTop: "20px !important",
        }}
      >
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
            label="Father Name"
            name="fathername"
            placeholder="Father Name"
            type="text"
            value={fatherNameInput.value}
            onChange={fatherNameInput.ChangeHandler}
            onBlur={fatherNameInput.BlurHandler}
            error={fatherNameInput.hasError}
          />
          <TextField
            label="Age"
            name="age"
            placeholder="Age"
            type="number"
            value={ageInput.value}
            onChange={ageInput.ChangeHandler}
            onBlur={ageInput.BlurHandler}
            error={ageInput.hasError}
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
          {/* <TextField
            label="Contact Number"
            name="contact"
            placeholder="Contact"
            type="number"
            onChange={(e) => {
              setFormValues({
                ...formValues,
                contactNumber: e.target.value,
              });
            }}
          /> */}
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
            placeholder="Address"
            type="address"
            label="Address"
            value={addressInput.value}
            onChange={addressInput.ChangeHandler}
            onBlur={addressInput.BlurHandler}
            error={addressInput.hasError}
          />
          <TextField
            placeholder="Weight"
            type="number"
            label="Weight (In kg)"
            value={weightInput.value}
            onChange={weightInput.ChangeHandler}
            onBlur={weightInput.BlurHandler}
            error={weightInput.hasError}
          />
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          paddingBottom: 2,
        }}
      >
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

export default AddPatientModal;
