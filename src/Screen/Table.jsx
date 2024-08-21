import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tables({ data, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3000/usersArr/${id}`)
        .then(() => {
          onDelete(id);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ bgcolor: "transparent" }}>
            <StyledTableCell sx={{ fontWeight: "bold" }}>Id</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: "bold" }}>Name</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
              Username
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
              Email
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
              Phone
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: "bold" }} align="center">
              Action
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: "black" }}>
          {data.map((e) => (
            <StyledTableRow sx={{ bgcolor: "#1A1A1A" }} key={e.id}>
              <StyledTableCell
                sx={{ color: "white" }}
                component="th"
                scope="row"
              >
                {e.id}
              </StyledTableCell>
              <StyledTableCell
                sx={{ color: "white" }}
                component="th"
                scope="row"
              >
                {e.name}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="left">
                {e.username}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="left">
                {e.email}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="left">
                {e.phone}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="center">
                <DeleteSweepIcon
                  sx={{
                    fontSize: 40,
                    paddingRight: 2,
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(e.id)}
                />
                <EditIcon
                  sx={{
                    color: "blue",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`edituser/${e.id}`)} // Correctly pass e.id to navigate
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
