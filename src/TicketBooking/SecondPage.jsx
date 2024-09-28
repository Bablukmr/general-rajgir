import React, { useEffect, useState } from "react";
import {
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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ArrowLeft, Save } from "@mui/icons-material";
import CheckMobileHook480 from "../components/checkMobile";

const SecondPage = ({
  admin,
  setAdmin,
  setPersons,
  handleNextPage,
  handlePreviousPage,
  configurations,
  holidays,
  persons,
  timeSlots,
  selectedPackage,
  visitingDate,
  selectedTimeSlot,
  setSelectedPackage,
  setVisitingDate,
  setSelectedTimeSlot,
  adultDetails,
  childDetails,
  communicationDetails,
  identityProof,
  setAdultDetails,
  setChildDetails,
  setCommunicationDetails,
  setIdentityProof,
  packages,
  adultsPrice,
  childPrice,
  showAlert,
  visitorDetails,
  setVisitorDetails,
}) => {
  const adults = persons?.adults || 0;
  const children = persons?.children || 0;
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [expanded, setExpanded] = useState(0); // Controls which accordion is open
  const mobile = CheckMobileHook480();

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  // Ensure visitorDetails is initialized with the correct number of adults
  useEffect(() => {
    if (!visitorDetails || visitorDetails.length === 0) {
      setVisitorDetails(
        Array.from({ length: adults }, () => ({ name: "", gender: "", error: false }))
      );
    }
  }, [adults, setVisitorDetails]);

  const handleCommunicationChange = (field, value) => {
    setCommunicationDetails({ ...communicationDetails, [field]: value });
  };

  const handleIdentityChange = (field, value) => {
    setIdentityProof({ ...identityProof, [field]: value });
  };

  const handleVisitorChange = (index, field, value) => {
    const updatedDetails = [...visitorDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };

    if (field === "name" || field === "gender") {
      updatedDetails[index].error =
        !updatedDetails[index].name || !updatedDetails[index].gender;
    }

    setVisitorDetails(updatedDetails);
  };

  const handleValidation = (index) => {
    const updatedDetails = [...visitorDetails];
    if (!updatedDetails[index].name || !updatedDetails[index].gender) {
      updatedDetails[index].error = true;
    } else {
      updatedDetails[index].error = false;
    }
    setVisitorDetails(updatedDetails);
  };

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(communicationDetails.email);
    const isValidMobile = communicationDetails.mobile.length === 10;

    const allVisitorDetailsFilled = visitorDetails.every(
      (details) => details.name && details.gender
    );
    const allIdentityDetailsFilled =
      identityProof.person && identityProof.proofType;

    setIsAllFilled(
      allVisitorDetailsFilled &&
        isValidEmail &&
        isValidMobile &&
        allIdentityDetailsFilled
    );
  }, [visitorDetails, communicationDetails, identityProof]);

  const handleSubmit = () => {
    if (identityProof.proofType === "bank") {
      showAlert({
        title: "Failed!",
        text: `Bank proof is not allowed.`,
        icon: "error",
        timer: 3000,
      });
      return;
    } else {
      handleNextPage();
    }
  };

  function handleBack() {
    setAdultDetails([]);
    setChildDetails([]);
    handlePreviousPage();
  }

  const handleAccordionChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <>
      {!isPaymentSuccessful ? (
        <div className="min-h-screen mt-[64px] md:px-[20px] xl:px-[200px] p-4 bg-gray-100">
          <div className="flex flex-col gap-4">
            <div className="w-full flex items-start flex-col gap-4">
              <p className="text-[#4691F2] text-lg">Visitor Details</p>
              {Array.from({ length: persons.adults }).map((_, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === index}
                  onChange={handleAccordionChange(index)}
                  className="w-full"
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="flex flex-col gap-0">
                      <p className="text-[#4691F2] text-lg">Adult {index + 1}</p>
                      <p className="text-[#a3a4a6] text-xs">
                        Visitor {index + 1} |{" "}
                        {visitorDetails?.[index]?.name || "Name not entered"} |{" "}
                        {visitorDetails?.[index]?.gender || "Gender not selected"}
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl style={{ paddingLeft: "10px" }}>
                      <RadioGroup
                        row
                        name={`gender-${index}`}
                        value={visitorDetails?.[index]?.gender || ""}
                        onChange={(e) =>
                          handleVisitorChange(index, "gender", e.target.value)
                        }
                      >
                        {genderOptions.map((option) => (
                          <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                          />
                        ))}
                      </RadioGroup>
                      {visitorDetails?.[index]?.error &&
                        !visitorDetails?.[index]?.gender && (
                          <Typography color="error">
                            Please select a gender
                          </Typography>
                        )}
                      <TextField
                        size="small"
                        margin="normal"
                        label="Full Name"
                        type="text"
                        fullWidth
                        value={visitorDetails?.[index]?.name || ""}
                        onChange={(e) =>
                          handleVisitorChange(index, "name", e.target.value)
                        }
                        onBlur={() => handleValidation(index)}
                      />
                      {visitorDetails?.[index]?.error &&
                        !visitorDetails?.[index]?.name && (
                          <Typography color="error">
                            Please enter a valid name
                          </Typography>
                        )}
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>

            <div className="flex flex-col items-start p-4 bg-white shadow-sm rounded-lg">
              <p className="text-[#4691F2] mb-2 text-lg">
                Primary Communication Details
              </p>
              <div className="flex items-center flex-col md:flex-row gap-5">
                <TextField
                  size="small"
                  label="Email"
                  value={communicationDetails.email}
                  fullWidth
                  onChange={(e) =>
                    handleCommunicationChange("email", e.target.value)
                  }
                />
                <TextField
                  size="small"
                  label="Mobile"
                  value={communicationDetails.mobile}
                  fullWidth
                  onChange={(e) =>
                    handleCommunicationChange("mobile", e.target.value)
                  }
                />
              </div>

              <p className="text-[#4691F2] my-2 text-lg mt-2">Identity Proof</p>
              <div className="flex w-full items-center flex-col md:flex-row gap-5">
                <FormControl fullWidth>
                  <InputLabel>Person</InputLabel>
                  <Select
                  fullWidth
                    className="md:w-[200px]"
                    label="Person"
                    size="small"
                    value={identityProof.person}
                    onChange={(e) =>
                      handleIdentityChange("person", e.target.value)
                    }
                  >
                    {visitorDetails.map((adult, index) => (
                      <MenuItem key={index} value={adult.name}>
                        {adult.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Proof Type</InputLabel>
                  <Select
                  fullWidth
                    className="md:w-[200px]"
                    size="small"
                    label="Proof Type"
                    value={identityProof.proofType}
                    onChange={(e) =>
                      handleIdentityChange("proofType", e.target.value)
                    }
                  >
                    <MenuItem value="aadhar">Aadhar Card</MenuItem>
                    <MenuItem value="pan">Pan Card</MenuItem>
                    <MenuItem value="voter">Voter ID</MenuItem>
                    <MenuItem value="bank">Bank Passbook</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {/* <div className="flex w-full items-center justify-center gap-2 p-4 bg-white shadow-sm rounded-lg">
                <Button
                  sx={{ textTransform: "none" }}
                  variant="contained"
                  color="error"
                  onClick={handleBack}
                  startIcon={<ArrowLeft />}
                >
                  Back
                </Button>
                <Button
                  sx={{ textTransform: "none" }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  startIcon={<Save />}
                >
                  Save & Continue
                </Button>
              </div> */}
            <div className="flex w-full items-center justify-center gap-2 p-4 bg-white shadow-sm rounded-lg">
              <Button
                 sx={{ textTransform: "none" }}
                 variant="contained"
                 color="error"
                 onClick={handleBack}
                 startIcon={<ArrowLeft />}
              >
                Back
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                startIcon={<Save />}
                disabled={!isAllFilled}
              >
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <p>Payment is successful!</p>
        </div>
      )}
    </>
  );
};

export default SecondPage;
