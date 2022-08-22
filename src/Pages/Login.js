import {
  FormControl,
  FormGroup,
  InputLabel,
  Box,
  Typography,
  Button,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { loginSchema } from "../forms/auth";
import { Toaster } from "react-hot-toast";
import Loader from "../Components/Loader";
import { login, verify } from "../bloc/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const [visibility, setVisibility] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setVisibility(true);
    login(data)
      .then((val) => {
        if (val) {
          verify()
            .then((u) => {
              setUser(u);
              switch (u.role) {
                case "User":
                  setTimeout(() => navigate("/faculty/profile"), 1400);
                  break;
                case "HEI":
                  setTimeout(() => navigate("/hei/profile"), 1400);
                  break;
                case "AICTE-Admin":
                  setTimeout(() => navigate("/aicte/viewHeis"), 1400);
                  break;
                default:
                  setTimeout(() => navigate("/"), 1400);
              }
            })
            .finally(setVisibility(false));
        }
      })
      .finally(setVisibility(false));
  };
  return (
    <>
      <Loader visible={visibility}></Loader>
      <Toaster></Toaster>
      <Box style={{ width: "80%", margin: "10em auto" }}>
        <Typography variant="h3" style={{ margin: "1em 0" }}>
          Login
        </Typography>
        <FormGroup>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <InputLabel htmlFor="email" error={errors.email ? true : false}>
              Email
            </InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              error={errors.email ? true : false}
              label="Email"
              {...register("email")}
            ></OutlinedInput>
            <FormHelperText sx={{ color: errors.email ? "red" : "black" }}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <InputLabel
              htmlFor="password"
              error={errors.password ? true : false}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type="password"
              label="Password"
              error={errors.password ? true : false}
              {...register("password")}
            ></OutlinedInput>
            <FormHelperText sx={{ color: errors.password ? "red" : "black" }}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
        </FormGroup>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          style={{ float: "right" }}
        >
          Submit
        </Button>
        <Button
          type="clear"
          variant="outlined"
          style={{ float: "right", marginRight: "1em" }}
        >
          Clear
        </Button>
      </Box>
    </>
  );
}

export default Login;
