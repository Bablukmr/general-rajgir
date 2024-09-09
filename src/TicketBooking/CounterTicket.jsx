import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CheckCircle, Person } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import PersonAddDialog from "../components/PersonAddDialog";
import Ticket from "../components/counterPrintTicket";
import CheckMobileHook480 from "../components/checkMobile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfoIcon from "@mui/icons-material/Info";
import Cookies from "js-cookie";

function SafariOption({
  title,
  subtitle,
  price,
  features,
  isPopular,
  colorClass,
  isSelected,
  onClick,
  images,
  tooltipDetails,
}) {
  const mobile = CheckMobileHook480();
  const [more, setMore] = useState("hidden");

  return (
    <Card
      className={`w-full border ${colorClass} relative cursor-pointer`}
      onClick={onClick}
    >
      <div
        className={`w-full h-full mb-2 ${
          isSelected ? "bg-[#f4f1f1]" : "bg-white"
        }`}
      >
        {isPopular && (
          <div className="absolute text-sm top-[-6px] right-[10px] bg-[#D83F3F] text-white pt-[4px] px-3 rounded-b-md">
            Most Popular
          </div>
        )}
        <div className="relative ">
          <div className="w-full  p-2 ">
            <div className="flex justify-between items-center w-full gap-2 mb-2">
              <div className="w-[60%]">
                <p className=" text-lg font-medium">{title}</p>
                <p className="my-1 text-sm font-normal">{subtitle}</p>
              </div>

              <div className="text-[#2E9325] my-2 w-[40%]">
                <div className="flex items-center gap-1 justify-center">
                  <div className="text-4xl">₹</div>
                  <div className="flex p-0 m-0 flex-col gap-0">
                    <label className="p-0 m-0 font-bold text-2xl">
                      {price}
                    </label>
                    <label className="p-0 text-sm m-[-4px] text-[#7B7A7A]">
                      Per Person
                    </label>
                  </div>
                  <Tooltip title={tooltipDetails}>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="">
                {more === "hidden" && (
                  <Button
                    sx={{ textTransform: "none", fontSize: "12px" }}
                    variant="contained"
                    color="success"
                    fullWidth
                    className="py-[2px] px-4 mt-4 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMore("block");
                    }}
                  >
                    View More
                  </Button>
                )}
                {more === "block" && (
                  <Button
                    sx={{ textTransform: "none", fontSize: "12px" }}
                    variant="contained"
                    color="success"
                    fullWidth
                    className="py-[2px] px-4 mt-4 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMore("hidden");
                    }}
                  >
                    View Less
                  </Button>
                )}
              </div>
              <div className="">
                <Button
                  sx={{ textTransform: "none", fontSize: "12px" }}
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="py-[2px] px-4 mt-4 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  Select Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={`divide-y ${more} p-4`}>
          {features.map((section, index) => (
            <div key={index} className="py-2">
              <p variant="h6" className="text-lg font-medium">
                {section.title}
              </p>
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle className="text-[#2E9325] mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function CounterTicket({
  persons,
  setPersons,
  handleNextPage,
  configurations,
  holidays,
  timeSlots,
  packages,
  setVisitingDate,
  visitingDate,
  selectedPackageName,
  setSelectedPAckageName,
  setAdultsPrice,
  setClildprice,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedTimeSlotString,
  setSelectedTimeSlotString,
  setTimeSlot,
  adultsPrice,
  childPrice,
}) {
  const [openPersonDialog, setOpenPersonDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [nationality, setNationality] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [bookingResponse, setBookingResponse] = useState(null);
  const ticketRef = useRef();

  const totalPrice =
    adultsPrice * persons.adults + childPrice * persons.children;
  // console.log(totalPrice, "totalPricetotalPrice");
  const handleOpenPersonDialog = () => {
    setOpenPersonDialog(true);
    setSelectedPackage(null);
  };
  const handleClosePersonDialog = () => setOpenPersonDialog(false);
  const handleSelectPackage = (
    packageId,
    child_allowed,
    packageName,
    adult_price,
    child_price
  ) => {
    setSelectedPAckageName(packageName);
    setClildprice(child_price);
    setAdultsPrice(adult_price);
    setSelectedTimeSlot(null);
    if (!visitingDate) {
      
      alert("Visiting Date Required");
      return;
    }
    if (child_allowed === 0 && persons.children > 0) {
      alert("Children are not Allowed");
      return;
    } else {
      setSelectedPackage(packageId);
    }
  };

  const handleDateChange = (date) => {
    setVisitingDate(date);
  };

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
  });
  useEffect(() => {
    if (bookingResponse) {
      handlePrint();
    }
  }, [bookingResponse]);

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const reduxToken = Cookies.get("authToken");
  const reduxUserId = Cookies.get("userId");

  useEffect(() => {
    setToken(reduxToken);
    setUserId(reduxUserId);
  }, [reduxToken, reduxUserId]);

  // console.log(reduxToken);
  // console.log(reduxUserId);

  // console.log(selectedTimeSlotString, "selectedTimeSlotString");
  const handleProceed = () => {
    if (
      !selectedPackage ||
      !visitingDate ||
      !name ||
      !gender ||
      !age ||
      !email ||
      !mobile
    ) {
      alert("All fields are required");
      return;
    }

    const payload = {
      api_key: "CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN",
      email_id: email,
      contact_number: mobile,
      visting_date: visitingDate.format("YYYY-MM-DD"),
      visting_time: selectedTimeSlotString,
      no_of_adults: persons.adults,
      no_of_childs: persons.children,
      no_of_infants: persons.infants,
      package_id: selectedPackage,
      timeslot_id: selectedTimeSlot,
      booking_from: 2,
      booking_type: 1,
      nationality: nationality,
      term_condition: 1,
      total_person: [{ name, gender, age }],
      total_amount: totalPrice,
      user_id: userId,
      token: token,
    };

    fetch("https://zoo-api.nextindiainitiative.com/public/api/v1/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setBookingResponse(data);
          console.log("Booking successful:", data.data);
          // handlePrint();
        } else {
          alert("Booking failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error during booking:", error);
        alert("Booking failed: " + error.message);
      });
  };

  const disableDates = (date) => {
    const holidaysFormatted = holidays.map((holiday) => ({
      from: dayjs(holiday.from_date, "YYYY-MM-DD"),
      to: dayjs(holiday.to_date, "YYYY-MM-DD"),
    }));

    const isHoliday = holidaysFormatted.some((holiday) =>
      date.isBetween(holiday.from, holiday.to, null, "[]")
    );
    const isMonday = date.day() === 1;
    const isWithinRange = date.isBetween(
      dayjs().subtract(1, "day"), // Include today
      dayjs().add(configurations?.advance_booking_days, "day"),
      null,
      "[]"
    );
    return !isWithinRange || isHoliday || isMonday;
  };

  const packageFeatures = (pkg) => {
    return pkg.package_types.map((type) => ({
      title: type.name,
      items: type.package_types_details.map((detail) => detail.name),
    }));
  };

  const filteredTimeSlots = timeSlots.filter((slot) => {
    if (selectedPackage === 1) return slot.timeslot_for === 1;
    if (selectedPackage === 2) return slot.timeslot_for === 2;
    if (selectedPackage === 3) return slot.timeslot_for === 3;
    return false;
  });

  return (
    <div className="bg-[#ECECEC] px-[3%]">
      <div className="flex md:flex-row flex-col gap-2">
        <div className="w-full">
          <div className="mt-[58px]">
            <div className="md:flex pt-[25px] items-center justify-between">
              <div className="flex px-4 md:px-0 flex-col gap-1">
                <div className="w-full mt-9 flex gap-4 items-center justify-start">
                  <div className="bg-white w-[440px] md:w-[220px] p-2 rounded-full shadow-xl flex flex-col items-start justify-center outline-none">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Choose Visiting Date"
                        format="DD/MM/YYYY"
                        value={visitingDate}
                        onChange={handleDateChange}
                        shouldDisableDate={disableDates}
                        slotProps={{
                          textField: {
                            sx: {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "transparent",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "transparent",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "transparent",
                                },
                            },
                            size: "small",
                            inputProps: {
                              readOnly: true, // Make the input read-only
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="w-full md:w-fit">
                    <button
                      className="text-black text-sm md:text-base md:w-fit flex md:gap-1 items-center justify-center px-4 md:px-8 py-4 shadow-lg rounded-full bg-white"
                      onClick={handleOpenPersonDialog}
                    >
                      <Person /> Add Visitors
                    </button>
                  </div>
                  <PersonAddDialog
                    persons={persons}
                    setPersons={setPersons}
                    openPersonDialog={openPersonDialog}
                    onClose={handleClosePersonDialog}
                    holidays={holidays}
                    configurations={configurations}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-10 w-full ">
            {packages.map((pkg, index) => (
              <div key={index} className="w-full md:w-[33%]">
                <SafariOption
                  title={pkg.package_name}
                  subtitle={pkg.description}
                  tooltipDetails={`Price of Per Adults ₹${pkg.adult_price} and for Per Child ₹${pkg.child_price}`}
                  price={pkg.adult_price}
                  features={packageFeatures(pkg)}
                  isPopular={pkg.is_popular === 1}
                  colorClass={
                    selectedPackage === pkg.id
                      ? "border-blue-500"
                      : "border-white"
                  }
                  isSelected={selectedPackage === pkg.id}
                  onClick={() =>
                    handleSelectPackage(
                      pkg.id,
                      pkg.child_allowed,
                      pkg.package_name,
                      pkg.adult_price,
                      pkg.child_price
                    )
                  }
                  images={pkg.images}
                />
              </div>
            ))}
          </div>
          <div className="bg-white p-3 mt-4 rounded-xl shadow-lg w-full">
            <div className="text-start py-1  text-[#2E8F2E] border-b border-gray-200">
              Choose Slot
            </div>
            <div className="flex flex-wrap md:flex-row flex-col mt-3 w-full gap-2">
              {filteredTimeSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => {
                    setSelectedTimeSlotString(slot.timeslot);
                    setSelectedTimeSlot(slot.id);
                  }}
                  className={`p-2 w-fit border ${
                    selectedTimeSlot === slot.id
                      ? "border-blue-700 text-white bg-blue-700"
                      : "border-blue-700 text-blue-700"
                  } rounded-md cursor-pointer text-center`}
                >
                  {slot.timeslot}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-3 mt-4 rounded-xl shadow-lg w-full">
            <div className="text-start py-1 text-[#2E8F2E] border-b border-gray-200">
              Visitor Details
            </div>
            <div className="w-full mt-3">
              <div className="flex md:flex-row flex-col items-center gap-2">
                <div className="w-full md:w-[24%]">
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[24%]">
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      size="small"
                      fullWidth
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full md:w-[24%]">
                  <TextField
                    fullWidth
                    label="Age"
                    variant="outlined"
                    size="small"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col items-center gap-2 mt-2">
                <div className="w-full md:w-[24%]">
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[24%]">
                  <TextField
                    fullWidth
                    label="Mobile"
                    variant="outlined"
                    size="small"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[24%]">
                  <FormControl fullWidth size="small">
                    <InputLabel id="nationality-label">Nationality</InputLabel>
                    <Select
                      labelId="nationality-label"
                      id="nationality-select"
                      value={nationality}
                      label="Nationality"
                      onChange={(e) => setNationality(e.target.value)}
                    >
                      <MenuItem value={"indian"}>Indian</MenuItem>
                      <MenuItem value={"foreign"}>Foreign</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 my-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleProceed}
              className="py-3 px-8"
            >
              Proceed
            </Button>
            {/* <Button
              variant="outlined"
              onClick={() => console.log("Cancel button clicked")}
              className="py-3 px-8"
            >
              Cancel
            </Button> */}
          </div>
          <div style={{ display: "none" }}>
            <Ticket
              ref={ticketRef}
              selectedPackage={
                bookingResponse?.data?.booking_info?.package_name
              }
              nationality={nationality}
              visitingDate={bookingResponse?.data?.booking_info?.visting_date}
              selectedTimeSlot={
                bookingResponse?.data?.booking_info?.visting_time
              }
              gender={bookingResponse?.data?.total_person[0]?.gender}
              name={bookingResponse?.data?.total_person[0]?.full_name}
              age={bookingResponse?.data?.total_person[0]?.age}
              email={bookingResponse?.data?.booking_info?.email_id}
              mobile={bookingResponse?.data?.booking_info?.contact_number}
              payment_status={
                bookingResponse?.data?.transaction?.payment_status
              }
              payment_by={bookingResponse?.data?.transaction?.payment_by}
              booking_id={bookingResponse?.data?.transaction?.booking_id}
              order_id={bookingResponse?.data?.transaction?.order_id}
              utr_id={bookingResponse?.data?.transaction?.utr_id}
              qr={bookingResponse?.data?.qr}
              message={bookingResponse?.message}
              total_amount={bookingResponse?.data?.booking_info?.total_amount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterTicket;
