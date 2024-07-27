import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TechniciansTable = ({ techniciansData, onDelete }) => (
  <TableContainer
    component={Paper}
    sx={{ width: "100%", boxShadow: "1px 1px 6px 2px rgba(0,0,0,0.08)" }}
  >
    <Table sx={{ minWidth: 650 }} aria-label="technicians table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Serial No</TableCell>
          <TableCell>Technician Name</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell align="left">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {techniciansData.map((row, index) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="left">{row.fullName}</TableCell>
            <TableCell align="left">{row.gender}</TableCell>
            <TableCell align="left">{row.cell}</TableCell>
            <TableCell align="left">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onDelete(row._id)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <DeleteIcon className="group-hover:fill-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TechniciansTable;
