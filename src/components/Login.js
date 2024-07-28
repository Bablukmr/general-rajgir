import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { loginAsync } from "../redux/authSlice";

function Login({ setMobileOpen, appBarTextColor }) {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setMobileOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    if (!username || !password) {
      alert("All Field Are Require");
      return;
    } else
      dispatch(loginAsync({ username, password })).then((result) => {
        if (result.type === "auth/loginAsync/fulfilled") {
          setOpen(false);
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <Button
        sx={{
          color: appBarTextColor,
          borderColor: appBarTextColor,
          textTransform: "none",
        }}
        variant="outlined"
        onClick={handleOpen}
        startIcon={<LoginIcon />}
      >
        Counter Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">Counter Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {authError && <p style={{ color: "red" }}>{authError}</p>}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: "none" }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={authStatus === "loading"}
          >
            {authStatus === "loading" ? (
              <CircularProgress size={24} />
            ) : (
              "Login"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;
