import React, { useRef, useState } from "react";
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
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ArrowLeft, Edit, Save } from "@mui/icons-material";
import CheckMobileHook480 from "../components/checkMobile";
import BookingInfo from "../components/PrintTicketGenaral";
import ReactToPrint from "react-to-print";
import axios from "axios";

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
  showAlert
}) => {
  const adults = persons?.adults || 0;
  const children = persons?.children || 0;
  const infant = persons?.infants || 0;
  // const totalPrice =
  // adultsPrice * persons.adults + childPrice * persons.children;

  const [openAddPerson, setOpenAddPerson] = useState(false);
  const [currentVisitorIndex, setCurrentVisitorIndex] = useState(null);
  const [visitorDetails, setVisitorDetails] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const printRef = useRef();
  const [bookingData, setBookingData] = useState(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [error, setError] = useState(null);

  const [addPersonType, setAddPersonType] = useState("adult");
  console.log(selectedPackage, "selectedPackage");
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleOpenAddPerson = (type, index = null) => {
    if (index !== null) {
      const details =
        type === "adult" ? adultDetails[index] : childDetails[index];
      setVisitorDetails(details);
      setCurrentVisitorIndex(index);
    } else {
      setVisitorDetails({ name: "", gender: "", age: "" });
      setCurrentVisitorIndex(null);
    }
    setAddPersonType(type);
    setOpenAddPerson(true);
  };

  const handleCloseAddPerson = () => {
    setOpenAddPerson(false);
    setCurrentVisitorIndex(null);
  };

  const handleVisitorChange = (field, value) => {
    setVisitorDetails({ ...visitorDetails, [field]: value });
  };

  const handleVisitorSubmit = () => {
    const { name, gender, age } = visitorDetails;

    if (!name || !gender || !age || isNaN(age) || age <= 0) {
      showAlert({
        title: "Failed!",
        text: "Please fill in all fields correctly for the visitor.",
        icon: "error",
        timer: 3000,
      });
      // alert("Please fill in all fields correctly for the visitor.");
      return;
    }

    if (addPersonType === "adult") {
      const updatedAdults = [...adultDetails];
      if (age < 18) {
        
        alert("Please enter age more than 18");
        return;
      }
      if (currentVisitorIndex !== null) {
        updatedAdults[currentVisitorIndex] = {
          ...visitorDetails,
          isEditing: false,
        };
      } else {
        updatedAdults.push({ ...visitorDetails, isEditing: false });
      }
      setAdultDetails(updatedAdults);
    } else if (addPersonType === "child") {
      const updatedChildren = [...childDetails];
      if (age >= 18) {
       
        alert("Please enter age Less than 18");
        return;
      }
      if (currentVisitorIndex !== null) {
        updatedChildren[currentVisitorIndex] = {
          ...visitorDetails,
          isEditing: false,
        };
      } else {
        updatedChildren.push({ ...visitorDetails, isEditing: false });
      }
      setChildDetails(updatedChildren);
    }

    handleCloseAddPerson();
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

    if (remainingAdults !== 0) {
      showAlert({
        title: "Failed!",
        text:`Please Add More ${remainingAdults} Adults`,
        icon: "error",
        timer: 3000,
      });
      // alert(`Please Add More ${remainingAdults} Adults`);
      return;
    }
    if (remainingChildren !== 0) {
      showAlert({
        title: "Failed!",
        text:`Please Add More ${remainingChildren} Adults`,
        icon: "error",
        timer: 3000,
      });
      // alert(`Please Add More ${remainingChildren} Adults`);
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(communicationDetails.email)) {
      showAlert({
        title: "Failed!",
        text:`Please Fill correct Email`,
        icon: "error",
        timer: 3000,
      });
      // alert("Please Fill correct Email");
      return;
    }
    if (communicationDetails.mobile.length !== 10) {
      showAlert({
        title: "Failed!",
        text:`Please Fill correct Mobile Number`,
        icon: "error",
        timer: 3000,
      });
      // alert("Please Fill correct Mobile Number");
      return;
    }
    if (!identityProof.person) {
      showAlert({
        title: "Failed!",
        text:`Please Fill correct identityProof`,
        icon: "error",
        timer: 3000,
      });
      // alert("Please Fill correct identityProof");
      return;
    }
    if (!identityProof.proofType) {
      showAlert({
        title: "Failed!",
        text:`Please Fill correct proofType`,
        icon: "error",
        timer: 3000,
      });
      // alert("Please Fill correct proofType");
      return;
    }
    if (!identityProof.proofNumber) {
      showAlert({
        title: "Failed!",
        text:`Please Fill correct proof Number`,
        icon: "error",
        timer: 3000,
      });
      // alert("Please Fill correct proof Number");
      return;
    }

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
      // alert("Please fill all the required fields correctly.");
      return;
    }
    if (identityProof.proofType === "bank") {
      showAlert({
        title: "Failed!",
        text:`Bank proof is not allowed.`,
        icon: "error",
        timer: 3000,
      });
      // alert("Bank proof is not allowed.");
      return;
    } else {
      // const allDetails = {
      //   visitingDate: visitingDate.format("DD MMMM YYYY"),
      //   timeSlots,
      //   adults: adultDetails,
      //   children: childDetails,
      //   communicationDetails,
      //   identityProof,
      // };
      // console.log(allDetails);
      handleNextPage();
    }
  };

  // const handlePayment = () => {
  //   if (!validateDetails()) {
  //     alert("Please fill all the required fields correctly.");
  //     return;
  //   }
  //   if (identityProof.proofType === "bank") {
  //     alert("Bank proof is not allowed.");
  //     return;
  //   } else {
  //     // const allDetails = {
  //     //   visitingDate: visitingDate.format("DD MMMM YYYY"),
  //     //   timeSlots,
  //     //   adults: adultDetails,
  //     //   children: childDetails,
  //     //   communicationDetails,
  //     //   identityProof,
  //     // };
  //     // console.log(allDetails);
  //     // handleNextPage();
  //     alert("sucess");
  //   }
  // };
  const totalPrice =
    adultsPrice * persons.adults + childPrice * persons.children;

  const handlePayment = async () => {
    if (!validateDetails()) {
      alert("Please fill all the required fields correctly.");
      return;
    }
    if (identityProof.proofType === "bank") {
      alert("Bank proof is not allowed.");
      return;
    } else {
      const totalPersons = [...adultDetails, ...childDetails];

      if (communicationDetails.mobile.length < 10) {
        setError("The contact number must be at least 10 digits long.");
        return;
      }

      if (
        totalPersons.length !==
        persons.adults + persons.children + persons.infants
      ) {
        setError("Total person not equal to selected person.");
        return;
      }

      setError(null);

      try {
        const queryParams = new URLSearchParams({
          api_key: "CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN",
          email_id: communicationDetails.email,
          contact_number: communicationDetails.mobile,
          id_proof_type: identityProof.proofType,
          id_proof_number: identityProof.proofNumber,
          visting_date: visitingDate.format("YYYY-MM-DD"),
          visting_time: selectedTimeSlot,
          no_of_adults: persons.adults,
          no_of_childs: persons.children,
          no_of_infants: persons.infants,
          package_id: selectedPackage,
          timeslot_id: selectedTimeSlot,
          booking_from: 1,
          booking_type: 1,
          // nationality: "ind",
          term_condition: 1,
          total_amount: totalPrice,
        }).toString();

        const response = await axios.post(
          `https://zoo-api.nextindiainitiative.com/public/api/v1/booking?${queryParams}`,
          {
            total_person: totalPersons,
          }
        );

        if (response.data.status) {
          setBookingData(response.data.data);
          setIsPaymentSuccessful(true);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error during booking:", error);
        setError("Payment failed, please try again.");
        alert("Booking failed: " + error.message);
      }
    }
  };

  const mobile = CheckMobileHook480();

  const remainingAdults = adults - adultDetails.length;
  const remainingChildren = children - childDetails.length;

  const filteredTimeSlots = timeSlots.filter((slot) => {
    if (selectedPackage === 1) return slot.timeslot_for === 1;
    if (selectedPackage === 2) return slot.timeslot_for === 2;
    if (selectedPackage === 3) return slot.timeslot_for === 3;
    return false;
  });
  function handleBack() {
    setAdultDetails([]);
    setChildDetails([]);
    handlePreviousPage();
  }
  return (
    <>
      {!isPaymentSuccessful ? (
        <div className="min-h-screen mt-[64px] md:px-[20px] xl:px-[200px] p-4 bg-gray-100">
          <div className="flex flex-col gap-4">
            <Accordion
              defaultExpanded={!mobile}
              sx={{
                bgcolor: "#fafafa",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <p className="text-[#4691F2] my-2 text-lg mt-2">Preview</p>
              </AccordionSummary>

              <AccordionDetails>
                <div className="mb-5">
                  <div className="mt-2 grid gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                    <div className="flex flex-row items-center gap-2 md:gap-4 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] w-full rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-[#cfdef3] hover:to-[#e0eafc]">
                      <h3 className="text-xs md:text-sm font-medium">
                        Visiting Date:
                      </h3>
                      <h3 className="text-xs md:text-sm font-medium">
                        {visitingDate.format("YYYY-MM-DD")}
                      </h3>
                    </div>
                    <div className="flex flex-row items-center gap-2 md:gap-4 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] w-full rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-[#cfdef3] hover:to-[#e0eafc]">
                      <h3 className="text-xs md:text-sm font-medium">
                        Number of Adults:
                      </h3>
                      <h3 className="text-xs md:text-sm font-medium">
                        {adults}
                      </h3>
                    </div>
                    <div className="flex flex-row items-center gap-2 md:gap-4 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] w-full rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-[#cfdef3] hover:to-[#e0eafc]">
                      <h3 className="text-xs md:text-sm font-medium">
                        Number of Children:
                      </h3>
                      <h3 className="text-xs md:text-sm font-medium">
                        {children}
                      </h3>
                    </div>
                    <div className="flex flex-row items-center gap-2 md:gap-4 py-2 md:py-4 px-4 md:px-6 text-[#6C757D] bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] w-full rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-[#cfdef3] hover:to-[#e0eafc]">
                      <h3 className="text-xs md:text-sm font-medium">
                        Number of Infants:
                      </h3>
                      <h3 className="text-xs md:text-sm font-medium">
                        {infant}
                      </h3>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
           

            <div className="flex flex-col items-start p-4 bg-white  rounded-lg">
              <p className="text-[#4691F2] text-lg">Visitor Details</p>
              <div className="flex gap-2 mt-2">
                <span className="inline-block px-3 py-1 bg-[#e0eafc] text-[#4691F2] rounded-full text-sm font-semibold">
                  Adults: {remainingAdults}/{adults}
                </span>
                <span className="inline-block px-3 py-1 bg-[#e0eafc] text-[#4691F2] rounded-full text-sm font-semibold">
                  Children: {remainingChildren}/{children}
                </span>
              </div>

              <div className="">
                <div className="grid grid-cols-1 gap-1 mt-2">
                  {adultDetails.length > 0 && (
                    <span className="w-full border-b border-dashed border-[#b2aeae]">
                      Adults
                    </span>
                  )}
                  {adultDetails.map((adult, index) => (
                    <div
                      key={index}
                      className="flex bg-white border rounded-lg"
                    >
                      <div className="px-2 py-[2px] ">
                        <div className=" gap-2 flex justify-between items-center">
                          <p className="flex">Name: {adult.name}</p>
                          <p>Gender: {adult.gender}</p>
                          <p>Age: {adult.age}</p>
                          <div
                            onClick={() => handleOpenAddPerson("adult", index)}
                            className="text-blue-700 p-2 cursor-pointer"
                          >
                            <Edit />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-1 mt-2">
                  {childDetails.length > 0 && (
                    <span className="w-full border-b border-dashed border-[#b2aeae]">
                      Childs
                    </span>
                  )}
                  {childDetails.map((child, index) => (
                    <div
                      key={index}
                      className="flex bg-white shadow-sm border rounded-lg"
                    >
                      <div className="px-2 py-[2px]">
                        <div className="flex justify-between items-center gap-2">
                          <p className="flex">Name: {child.name}</p>
                          <p>Gender: {child.gender}</p>
                          <p>Age: {child.age}</p>
                          <div
                            onClick={() => handleOpenAddPerson("child", index)}
                            className="text-blue-700 p-2 cursor-pointer"
                          >
                            <Edit />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {adultDetails.length < adults && (
                  <button
                    className="px-4 mt-3 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-500 hover:to-blue-700 border border-transparent rounded-md transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleOpenAddPerson("adult")}
                  >
                    + Add Adult
                  </button>
                )}
                {childDetails.length < children && (
                  <button
                    className="px-4 mt-3 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-500 hover:to-blue-700 border border-transparent rounded-md transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleOpenAddPerson("child")}
                  >
                    + Add Child
                  </button>
                )}
              </div>
              <Dialog open={openAddPerson} onClose={handleCloseAddPerson}>
                <DialogTitle>
                  {addPersonType === "adult" ? "Add Adult" : "Add Child"}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    label="Name"
                    fullWidth
                    value={visitorDetails.name}
                    onChange={(e) =>
                      handleVisitorChange("name", e.target.value)
                    }
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      value={visitorDetails.gender}
                      onChange={(e) =>
                        handleVisitorChange("gender", e.target.value)
                      }
                    >
                      {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    margin="dense"
                    label="Age"
                    type="number"
                    fullWidth
                    value={visitorDetails.age}
                    onChange={(e) => handleVisitorChange("age", e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={handleCloseAddPerson}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={handleVisitorSubmit}
                    color="primary"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="flex flex-col items-start p-4 bg-white shadow-sm   rounded-lg">
              <p className="text-[#4691F2] mb-2 text-lg">
                Communication Details
              </p>
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center flex-col md:flex-row  justify-between gap-5 ">
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
              </div>

              <p className="text-[#4691F2] my-2 text-lg mt-2">
                {" "}
                Identity Proof
              </p>
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center flex-col md:flex-row justify-between gap-5 ">
                  <FormControl fullWidth>
                    <InputLabel>Person</InputLabel>
                    <Select
                      className="md:w-[200px]"
                      label="Proof Type"
                      size="small"
                      value={identityProof.person}
                      onChange={(e) => {
                        //  alert("hi")
                        handleIdentityChange("person", e.target.value);
                      }}
                    >
                      {adultDetails.map((adult, index) => (
                        <MenuItem key={index} value={adult.name}>
                          {adult.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Proof Type</InputLabel>
                    <Select
                      className="md:w-[200px]"
                      label="Proof Type"
                      size="small"
                      value={identityProof.proofType}
                      onChange={(e) =>
                        handleIdentityChange("proofType", e.target.value)
                      }
                    >
                      <MenuItem value="aadhar">Aadhar</MenuItem>
                      <MenuItem value="passport">Passport</MenuItem>
                      <MenuItem value="driving">Driving License</MenuItem>
                      <MenuItem value="bank">Bank Passbook</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className="md:w-[200px]"
                    size="small"
                    label="Proof Number"
                    value={identityProof.proofNumber}
                    fullWidth
                    onChange={(e) =>
                      handleIdentityChange("proofNumber", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              {/* {selectedPackage === 1 ? ( */}
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
                >
                  Save & Continue
                </Button>
              </div>
              {/* ) : (
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
                    onClick={handlePayment}
                    variant="contained"
                    color="success"
                    
                    // className="my-4 px-3"
                  >
                    Pay Now
                  </Button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:px-[20px] xl:px-[200px] w-full justify-center items-start p-4 bg-gray-100 mt-16">
          {/* <div className="w-full p-4 bg-white shadow-lg rounded-lg mb-4">
            <BookingInfo ref={printRef} data={bookingData} />
          </div>
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" color="primary">
                Print Ticket
              </Button>
            )}
            content={() => printRef.current}
            documentTitle="Ticket Booking Confirmation"
            pageStyle="@media print { body { margin: 0; } }"
          /> */}
        </div>
      )}
    </>
  );
};

export default SecondPage;
