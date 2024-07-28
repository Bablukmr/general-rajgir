import React, { useEffect, useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const reduxToken = Cookies.get("authToken");
  const reduxUserId = Cookies.get("userId");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setToken(reduxToken);
    setUserId(reduxUserId);
  }, [reduxToken, reduxUserId]);

  const handleTogglePasswordVisibility = (field) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (oldPassword.length < 4 || newPassword.length < 4) {
      setError("Passwords must be at least 4 characters long");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password cannot be the same as the old password");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://zoo-api.nextindiainitiative.com/public/api/v1/change-password",
        {
          api_key: "CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN",
          user_id: userId,
          token: token,
          old_password: oldPassword,
          password: newPassword,
          confirm_password: confirmPassword,
        }
      );

      if (response.data.status) {
        setSuccess(response.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <TextField
              type={showOldPassword ? "text" : "password"}
              label="Old Password"
              variant="outlined"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility("oldPassword")
                      }
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              type={showNewPassword ? "text" : "password"}
              label="New Password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility("newPassword")
                      }
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility("confirmPassword")
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
