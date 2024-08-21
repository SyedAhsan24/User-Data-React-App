import React, { useEffect, useState } from "react";
import Tables from "./Table";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/usersArr")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== id));

    axios
      .delete(`http://localhost:3000/usersArr/${id}`)
      .then(() => {
        console.log(`User with id ${id} deleted successfully.`);
      })
      .catch((err) => {
        console.log(err);
        fetchData();
      });
  };

  return (
    <div className="bg-[#1A1A1A] sm:p-10 p-0">
      <div className="pt-[20px] pb-[30px] text-white justify-between items-center flex">
        <h1 className=" text-[30px] font-sans font-bold ">User Data</h1>{" "}
        <Button
          onClick={() => navigate(`/createuser`)}
          sx={{ bgcolor: "#4DA4D4", borderRadius: 20, fontWeight: "bold" }}
          variant="contained"
        >
          Create User
        </Button>
      </div>
      <Box>
        <Tables
          data={userData}
          onClick={() => Navigate(`/edituser/${user.id}`)}
          onDelete={handleDelete}
        />
      </Box>
    </div>
  );
};

export default Home;
