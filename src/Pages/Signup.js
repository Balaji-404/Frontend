import React from "react";
import Loader from "../Components/Loader";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker } from "@mui/x-date-pickers";
import {
  Typography,
  FormGroup,
  FormControl,
  TextField,
  FormHelperText,
  Button,
  MenuItem,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../forms/auth";
import { useState } from "react";
import { signUp, getRoles } from "../bloc/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(signupSchema) });
  const [visibility, setVisibility] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCnfPass, setCnfPass] = useState(false);
  const [value, setDate] = useState(Date.now());
  const navigate = useNavigate();
  const handleDate = (val) => {
    setDate(val);
    setValue("dob", val.toDate(), { shouldValidate: true });
  };
  const handleShowPassword = () => setShowPass(!showPass);
  const handleShowCnfPass = () => setCnfPass(!showCnfPass);
  const onSubmit = (data) => {
    setVisibility(true);
    let finalData = data;
    delete finalData.confirmPassword;
    getRoles()
      .then((roles) => {
        let roleReq = roles.filter((el) => el.name === data.role)[0];
        finalData.role = roleReq._id;
        setVisibility(true);
        signUp(finalData)
          .then((val) => {
            if (val) {
              setTimeout(
                () => navigate(`/verifyEmail/${val.data.userId}`),
                1400
              );
              setVisibility(false);
            }
          })
          .finally(setVisibility(false));
      })
      .finally(setVisibility(false));
  };
  return (
    <>
      <Loader visible={visibility}></Loader>
      <Toaster></Toaster>
      <Box style={{ width: "70%", margin: "5em auto" }}>
        <Typography variant="h3" style={{ margin: "1em 0" }}>
          Signup
        </Typography>
        <FormGroup>
          <FormControl style={{ margin: "1em 0" }}>
            <TextField
              error={errors.firstName ? true : false}
              id="firstName"
              label="First Name"
              {...register("firstName")}
            ></TextField>
            <FormHelperText sx={{ color: errors.firstName ? "red" : "black" }}>
              {errors.firstName?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              {...register("middleName")}
              error={errors.middleName ? true : false}
              id="middleName"
              label="Middle Name"
            ></TextField>
            <FormHelperText sx={{ color: errors.middleName ? "red" : "black" }}>
              {errors.middleName?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              {...register("lastName")}
              error={errors.lastName ? true : false}
              id="lastName"
              label="Last Name"
            ></TextField>
            <FormHelperText error={errors.lastName ? true : false}>
              {errors.lastName?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              {...register("mobile")}
              error={errors.mobile ? true : false}
              id="mobile"
              label="Mobile Number"
            ></TextField>
            <FormHelperText error={errors.mobile ? true : false}>
              {errors.mobile?.message}
            </FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            style={{ flexDirection: "row" }}
            sx={{ margin: "1em auto" }}
          >
            <FormControl style={{ width: "45%", marginRight: "auto" }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  label="Select DOB"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormHelperText error={errors.dob ? true : false}>
                {errors.dob?.message}
              </FormHelperText>
            </FormControl>
            <FormControl style={{ width: "45%" }}>
              <TextField
                defaultValue=""
                {...register("gender")}
                error={errors.gender ? true : false}
                id="gender"
                select
                label="Select Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <FormHelperText error={errors.gender ? true : false}>
                {errors.gender?.message}
              </FormHelperText>
            </FormControl>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              {...register("email")}
              error={errors.email ? true : false}
              id="email"
              label="Email"
            ></TextField>
            <FormHelperText error={errors.email ? true : false}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              type={showPass ? "text" : "password"}
              {...register("password")}
              error={errors.password ? true : false}
              id="password"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            ></TextField>
            <FormHelperText error={errors.password ? true : false}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              type={showCnfPass ? "text" : "password"}
              {...register("confirmPassword")}
              error={errors.confirmPassword ? true : false}
              id="confirmPassword"
              label="Confirm Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleShowCnfPass}
                    >
                      {showCnfPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            ></TextField>
            <FormHelperText error={errors.confirmPassword ? true : false}>
              {errors.confirmPassword?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              {...register("role")}
              defaultValue=""
              error={errors.role ? true : false}
              id="role"
              select
              label="Select Account Type"
            >
              <MenuItem value="HEI">Higher Education Institue</MenuItem>
              <MenuItem value="User">Faculty Member</MenuItem>
            </TextField>
            <FormHelperText error={errors.role ? true : false}>
              {errors.role?.message}
            </FormHelperText>
          </FormControl>
        </FormGroup>
        <Button
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

export default Signup;
