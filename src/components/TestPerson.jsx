import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TestPerson() {
  const adults = 3;
  const [visitorDetails, setVisitorDetails] = useState(
    Array(adults).fill({ name: "", gender: "", error: false })
  );
  const [expanded, setExpanded] = useState(0); // Controls which accordion is open
  const [isAllFilled, setIsAllFilled] = useState(false);

  // Function to handle changes in visitor details
  const handleVisitorChange = (index, field, value) => {
    const updatedDetails = [...visitorDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };

    // Remove the error state if the user starts filling the form
    if (field === "name" || field === "gender") {
      updatedDetails[index].error = !updatedDetails[index].name || !updatedDetails[index].gender;
    }

    setVisitorDetails(updatedDetails);

    // Check if all fields are filled
    const allFilled = updatedDetails.every(
      (details) => details.name !== "" && details.gender !== ""
    );
    setIsAllFilled(allFilled);

    // Open next accordion automatically if current is filled, but only if it's not already the last one
    if (
      updatedDetails[index].name && 
      updatedDetails[index].gender && 
      expanded === index && 
      index < adults - 1 &&
      field !== "name"
    ) {
      setExpanded(index + 1);
    }
  };

  // Handle accordion expansion
  const handleAccordionChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  // Check if fields are properly filled and show error if not
  const handleValidation = (index) => {
    const updatedDetails = [...visitorDetails];
    if (!updatedDetails[index].name || !updatedDetails[index].gender) {
      updatedDetails[index].error = true;
    } else {
      updatedDetails[index].error = false;
    }
    setVisitorDetails(updatedDetails);
  };

  return (
    <div className="px-[200px] flex items-center flex-col gap-4">
      <p className="text-[#4691F2] text-lg">Visitor Details</p>
      {Array.from({ length: adults }).map((_, index) => (
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
                {visitorDetails[index].name || "Name not entered"} |{" "}
                {visitorDetails[index].gender || "Gender not selected"}
              </p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl style={{ paddingLeft: "10px" }}>
              <RadioGroup
                row
                name={`gender-${index}`}
                value={visitorDetails[index].gender}
                onChange={(e) =>
                  handleVisitorChange(index, "gender", e.target.value)
                }
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {visitorDetails[index].error && !visitorDetails[index].gender && (
                <Typography color="error">Please select a gender</Typography>
              )}
              <TextField
                size="small"
                margin="normal"
                label="Full Name"
                type="text"
                fullWidth
                value={visitorDetails[index].name}
                onChange={(e) =>
                  handleVisitorChange(index, "name", e.target.value)
                }
                onBlur={() => handleValidation(index)} // Validate on blur
              />
              {visitorDetails[index].error && !visitorDetails[index].name && (
                <Typography color="error">Please enter a valid name</Typography>
              )}
            </FormControl>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant="contained"
        color="primary"
        disabled={!isAllFilled}
        onClick={() => console.log("Form submitted!", visitorDetails)}
      >
        Save and Continue
      </Button>
    </div>
  );
}

export default TestPerson;
