import { Button, Paper, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Edituser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [createData, setCreateData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/usersArr/${id}`)
      .then((res) => {
        setCreateData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/usersArr/${id}`, createData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div
        style={{ backgroundImage: "linear-gradient(#17A8D7, #0E50B2)" }}
        className="sm:p-[50px] p-[0]"
      >
        <form className="sm:w-[60%] w-100 m-auto" onSubmit={handleSubmit}>
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
              Edit User
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
              label="Username"
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
              <Button
                sx={{ px: 7, py: 1.5, mb: 2, borderRadius: 20 }}
                style={{
                  background: "linear-gradient(to right ,#0E50B2 ,#17A8D7 )",
                }}
                variant="contained"
                type="submit"
              >
                Save
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
    </div>
  );
};

export default Edituser;
