import React, { useState } from "react";
import {
  Card,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Edit, Save } from "@mui/icons-material";
import CheckMobileHook480 from "../components/checkMobile";

const SecondPage = ({ persons, setPersons, handleNextPage }) => {
  const adults = persons?.adults;
  const children = persons?.children;
  const infant = persons?.infants;
  const [visitingDate, setVisitingDate] = useState(dayjs());

  const [timeSlot, setTimeSlot] = useState("09:00 AM");
  const [adultDetails, setAdultDetails] = useState(
    Array.from({ length: adults }, () => ({
      name: "",
      gender: "",
      age: "",
      isEditing: true,
    }))
  );
  const [childDetails, setChildDetails] = useState(
    Array.from({ length: children }, () => ({
      name: "",
      gender: "",
      age: "",
      isEditing: true,
    }))
  );
  const [communicationDetails, setCommunicationDetails] = useState({
    email: "",
    mobile: "",
    isEditing: true,
  });
  const [identityProof, setIdentityProof] = useState({
    person: "",
    proofType: "",
    proofNumber: "",
    isEditing: true,
  });

  const handleDateChange = (date) => {
    setVisitingDate(date);
  };

  const handleInputChange = (index, type, field, value) => {
    const newDetails = type === "adult" ? [...adultDetails] : [...childDetails];
    newDetails[index] = { ...newDetails[index], [field]: value };
    type === "adult"
      ? setAdultDetails(newDetails)
      : setChildDetails(newDetails);
  };

  const saveDetails = (index, type) => {
    const newDetails = type === "adult" ? [...adultDetails] : [...childDetails];
    newDetails[index].isEditing = false;
    type === "adult"
      ? setAdultDetails(newDetails)
      : setChildDetails(newDetails);
  };

  const editDetails = (index, type) => {
    const newDetails = type === "adult" ? [...adultDetails] : [...childDetails];
    newDetails[index].isEditing = true;
    type === "adult"
      ? setAdultDetails(newDetails)
      : setChildDetails(newDetails);
  };

  const handleCommunicationChange = (field, value) => {
    setCommunicationDetails({ ...communicationDetails, [field]: value });
  };

  const handleIdentityChange = (field, value) => {
    setIdentityProof({ ...identityProof, [field]: value });
  };

  const validateDetails = () => {
    let valid = true;
    adultDetails.forEach((adult) => {
      if (
        !adult.name ||
        !adult.gender ||
        !adult.age ||
        isNaN(adult.age) ||
        adult.age <= 0
      ) {
        valid = false;
      }
    });
    childDetails.forEach((child) => {
      if (
        !child.name ||
        !child.gender ||
        !child.age ||
        isNaN(child.age) ||
        child.age <= 0
      ) {
        valid = false;
      }
    });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !communicationDetails.email ||
      !emailPattern.test(communicationDetails.email)
    ) {
      valid = false;
    }
    if (
      !communicationDetails.mobile ||
      communicationDetails.mobile.length !== 10 ||
      isNaN(communicationDetails.mobile)
    ) {
      valid = false;
    }
    if (
      !identityProof.person ||
      !identityProof.proofType ||
      !identityProof.proofNumber
    ) {
      valid = false;
    }
    return valid;
  };

  const handleSubmit = () => {
    if (!validateDetails()) {
      alert("Please fill all the required fields correctly.");
      return;
    }
    if (identityProof.proofType === "bank") {
      alert("Bank proof is not allowed.");
      return;
    } else {
      const allDetails = {
        visitingDate: visitingDate.format("DD MMMM YYYY"),
        timeSlot,
        adults: adultDetails,
        children: childDetails,
        communicationDetails,
        identityProof,
      };
      console.log(allDetails);
      handleNextPage();
    }
  };
  const mobile = CheckMobileHook480();
  return (
    <div className="min-h-screen mt-[64px] md:px-[20px] xl:px-[200px] p-4 bg-gray-100">
      <div className="flex flex-col gap-4">
        <Accordion
          defaultExpanded={!mobile}
          sx={{ bgcolor: "#fafafa", width: "100%" }}
          className=""
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-semibold text-lg md:text-xl lg:text-2xl text-black">
              Preview
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className=" mb-5">
              <div className=" grid gap-5 md:grid-cols-2 ">
                <div className="flex flex-row items-center gap-1 md:gap-3 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-[#f4f4f4] w-full rounded-md shadow-lg">
                  <h3 className="text-xs md:text-sm font-medium">
                    Visiting Date:{" "}
                    <span className="text-xs md:text-xs ">Nature Safari</span>
                  </h3>
                  <h3 className="text-xs md:text-xs font-medium">
                    {visitingDate.format("YYYY-MM-DD")}
                  </h3>
                </div>
              </div>

              <div className="mt-2 grid gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                <div className="flex flex-row items-center gap-1 md:gap-3 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-[#f4f4f4] w-full rounded-md shadow-lg">
                  <h3 className="text-xs md:text-sm font-medium">
                    Nationality:
                  </h3>
                  <h3 className="text-xs md:text-xs font-medium">Indian</h3>
                </div>
                <div className="flex flex-row items-center gap-1 md:gap-3 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-[#f4f4f4] w-full rounded-md shadow-lg">
                  <h3 className="text-xs md:text-sm font-medium">
                    Number of Adult:
                  </h3>
                  <h3 className="text-xs md:text-xs font-medium">{adults}</h3>
                </div>
                <div className="flex flex-row items-center gap-1 md:gap-3 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-[#f4f4f4] w-full rounded-md shadow-lg">
                  <h3 className="text-xs md:text-sm font-medium">
                    Number of Children:
                  </h3>
                  <h3 className="text-xs md:text-xs font-medium">{children}</h3>
                </div>
                <div className="flex flex-row items-center gap-1 md:gap-3 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-[#f4f4f4] w-full rounded-md shadow-lg">
                  <h3 className="text-xs md:text-sm font-medium">
                    Number of Infant:
                  </h3>
                  <h3 className="text-xs md:text-xs font-medium">{infant}</h3>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Grid item xs={12}>
          <Card className="p-4">
            <label className="text-[#74758E] my-2"> Visitor Details : </label>
            <label className="text-[#74758E] my-2">
              {" "}
              {adults} Adults Lefts Out of {adults} And {children} children Left
              out of {children}{" "}
            </label>
            <div className=" w-full">
              {adultDetails.map((adult, index) => (
                <div
                  key={index}
                  className="py-2 flex flex-col md:flex-row gap-4 border-b "
                >
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={adult.name}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "adult",
                          "name",
                          e.target.value
                        )
                      }
                      disabled={!adult.isEditing}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className="md:w-[200px]">
                    <FormControl fullWidth size="small">
                      <InputLabel>Gender</InputLabel>
                      <Select
                        label="Gender"
                        fullWidth
                        value={adult.gender}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "adult",
                            "gender",
                            e.target.value
                          )
                        }
                        disabled={!adult.isEditing}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Age"
                      value={adult.age}
                      onChange={(e) =>
                        handleInputChange(index, "adult", "age", e.target.value)
                      }
                      disabled={!adult.isEditing}
                      size="small"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </Grid>
                  <Grid item xs={12} className="flex justify-start">
                    {adult.isEditing ? (
                      <Button
                        sx={{ textTransform: "none" }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if (!adult.name || !adult.age || !adult.gender) {
                            alert("All field Require");
                            return;
                          } else {
                            saveDetails(index, "adult");
                            // console.log(adult.name);
                          }
                        }}
                      >
                        <Save /> Save
                      </Button>
                    ) : (
                      <Button
                        sx={{ textTransform: "none" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => editDetails(index, "adult")}
                      >
                        <Edit onClick={() => editDetails(index, "adult")} />
                      </Button>
                    )}
                  </Grid>
                </div>
              ))}
            </div>
            {/* <Typography variant="h6" className="text-gray-600 mt-4">
              Child Details
            </Typography> */}

            {children === 0 ? (
              ""
            ) : (
              <>
                <label className="text-[#74758E] my-2">Child Details</label>
                <div className=" w-full">
                  {childDetails.map((child, index) => (
                    <div
                      key={index}
                      className="py-2 flex flex-col md:flex-row gap-4 border-b "
                    >
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Name"
                          value={child.name}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "child",
                              "name",
                              e.target.value
                            )
                          }
                          disabled={!child.isEditing}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} className="md:w-[200px]">
                        <FormControl fullWidth size="small">
                          <InputLabel>Gender</InputLabel>
                          <Select
                            label="Gender"
                            fullWidth
                            value={child.gender}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "child",
                                "gender",
                                e.target.value
                              )
                            }
                            disabled={!child.isEditing}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Age"
                          value={child.age}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "child",
                              "age",
                              e.target.value
                            )
                          }
                          disabled={!child.isEditing}
                          size="small"
                          type="number"
                          InputProps={{ inputProps: { min: 1 } }}
                        />
                      </Grid>
                      <Grid item xs={12} className="flex justify-start">
                        {child.isEditing ? (
                          <Button
                            sx={{ textTransform: "none" }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              //  saveDetails(index, "child")

                              if (!child.name || !child.age || !child.gender) {
                                alert("All field Require");
                                return;
                              } else {
                                saveDetails(index, "child");
                                // console.log(adult.name);
                              }
                            }}
                          >
                            <Save /> Save
                          </Button>
                        ) : (
                          <Button
                            sx={{ textTransform: "none" }}
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => editDetails(index, "child")}
                          >
                            <Edit size="small" />
                          </Button>
                        )}
                      </Grid>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="p-4">
            {/* <Typography variant="h6" className="text-gray-600">
              Communication Details
            </Typography> */}
            <label className="text-[#74758E] ">Communication Details</label>

            <div className="mt-2 flex md:flex-row flex-col gap-4 justify-start items-">
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!communicationDetails.isEditing}
                  fullWidth
                  label="Email id"
                  value={communicationDetails.email}
                  onChange={(e) =>
                    handleCommunicationChange("email", e.target.value)
                  }
                  size="small"
                  //   error={
                  //     !communicationDetails.email ||
                  //     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  //       communicationDetails.email
                  //     )
                  //   }

                  //   helperText={
                  //     !communicationDetails.email ||
                  //     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  //       communicationDetails.email
                  //     )
                  //       ? "Please enter a valid email address"
                  //       : ""
                  //   }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  //   disabled={}
                  disabled={!communicationDetails.isEditing}
                  label="Mobile No."
                  value={communicationDetails.mobile}
                  onChange={(e) =>
                    handleCommunicationChange("mobile", e.target.value)
                  }
                  size="small"
                  //   error={
                  //     !communicationDetails.mobile ||
                  //     !/^\d{10}$/.test(communicationDetails.mobile)
                  //   }

                  //   helperText={
                  //     !communicationDetails.mobile ||
                  //     !/^\d{10}$/.test(communicationDetails.mobile)
                  //       ? "Please enter a valid 10-digit mobile number"
                  //       : ""
                  //   }
                />
              </Grid>
              <Grid item xs={12} className="flex justify-start">
                {communicationDetails.isEditing ? (
                  <Button
                    sx={{ textTransform: "none" }}
                    //   sx={{padding:"4px"}}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (
                        !communicationDetails.email ||
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          communicationDetails.email
                        ) ||
                        !communicationDetails.mobile ||
                        !/^\d{10}$/.test(communicationDetails.mobile)
                      ) {
                        alert("All field Require");
                        return;
                      }
                      //   if (
                      //     !mobile ||
                      //     !communicationDetails.mobile ||
                      //     !/^\d{10}$/.test(communicationDetails.mobile)
                      //   ) {
                      //     alert("All field Require");
                      //     return;
                      //   }
                      else {
                        setCommunicationDetails({
                          ...communicationDetails,
                          isEditing: false,
                        });
                      }
                    }}
                  >
                    <Save /> Save
                  </Button>
                ) : (
                  <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      setCommunicationDetails({
                        ...communicationDetails,
                        isEditing: true,
                      })
                    }
                  >
                    <Edit
                      onClick={() =>
                        setCommunicationDetails({
                          ...communicationDetails,
                          isEditing: true,
                        })
                      }
                    />
                  </Button>
                )}
              </Grid>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="p-4">
            {/* <Typography variant="h6" className="text-gray-600">
              Proof Of Identity
            </Typography> */}
            <label className="text-[#74758E] ">Proof Of Identity</label>
            <div className="mt-2 flex md:flex-row flex-col gap-4">
              <Grid item xs={12} sm={4} className="md:w-[200px]">
                <FormControl fullWidth size="small">
                  <InputLabel>Select Person</InputLabel>
                  <Select
                    label="Select Person"
                    fullWidth
                    disabled={!identityProof.isEditing}
                    value={identityProof.person}
                    onChange={(e) =>
                      handleIdentityChange("person", e.target.value)
                    }
                  >
                    {adultDetails.map((adult, index) => (
                      <MenuItem
                        key={index}
                        value={adult.name || `Person ${index + 1}`}
                      >
                        {adult.name || `Person ${index + 1}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} className="md:w-[200px]">
                <FormControl fullWidth size="small">
                  <InputLabel>Id Proof Type</InputLabel>
                  <Select
                    disabled={!identityProof.isEditing}
                    label="Id Proof Type"
                    fullWidth
                    value={identityProof.proofType}
                    onChange={(e) =>
                      handleIdentityChange("proofType", e.target.value)
                    }
                  >
                    <MenuItem value="aadhar">Aadhar Card</MenuItem>
                    <MenuItem value="pan">Pan Card</MenuItem>
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="voter">Voter Card</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled={!identityProof.isEditing}
                  label="Id Proof No."
                  value={identityProof.proofNumber}
                  onChange={(e) =>
                    handleIdentityChange("proofNumber", e.target.value)
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12} className="flex justify-start">
                {identityProof.isEditing ? (
                  <Button
                    sx={{ textTransform: "none" }}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setIdentityProof({
                        ...identityProof,
                        isEditing: false,
                      })
                    }
                  >
                    <Save /> Save
                  </Button>
                ) : (
                  <Button
                    sx={{ textTransform: "none" }}
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      setIdentityProof({
                        ...identityProof,
                        isEditing: true,
                      })
                    }
                  >
                    <Edit
                      onClick={() =>
                        setIdentityProof({
                          ...identityProof,
                          isEditing: true,
                        })
                      }
                    />
                  </Button>
                )}
              </Grid>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} className="flex justify-center mt-4">
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Next
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default SecondPage;
