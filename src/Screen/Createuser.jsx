import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
const CreateUser = () => {
  const [createData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z\s]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,14}$/;

    if (!createData.name) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(createData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    if (!createData.username) {
      newErrors.username = "Username is required";
    } else if (!usernameRegex.test(createData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!createData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(createData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!createData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(createData.phone)) {
      newErrors.phone = "Enter a valid phone number (10 to 14 digits)";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios
      .post("http://localhost:3000/usersArr", createData)
      .then((res) => {
        alert("User created successfully");
        setUserData({
          name: "",
          username: "",
          email: "",
          phone: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{ backgroundImage: "linear-gradient(#17A8D7, #0E50B2)" }}
      className="sm:p-[50px] p-[0]"
    >
      <form className=" sm:w-[60%] w-100 m-auto " onSubmit={handleSubmit}>
        <Paper elevation={24} sx={{ padding: 5 }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: 5,
              color: "#1C2EAA",
              fontWeight: 800,
              fontFamily: "sans-serif",
              textAlign: "center",
            }}
          >
            Create User
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={createData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label=" Username"
            name="username"
            value={createData.username}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            name="email"
            value={createData.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Phone"
            name="phone"
            value={createData.phone}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <div className="flex justify-between">
            {" "}
            <Button
              sx={{ px: 7, py: 1.5, mb: 2, borderRadius: 20 }}
              style={{
                background: "linear-gradient(to right ,#0E50B2 ,#17A8D7 )",
              }}
              variant="contained"
              type="submit"
            >
              Create
            </Button>
            <Button
              sx={{ px: 7, py: 1.5, mb: 2, borderRadius: 20 }}
              style={{
                background: "linear-gradient(to right ,#17A8D7 ,#0E50B2 )",
              }}
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default CreateUser;
