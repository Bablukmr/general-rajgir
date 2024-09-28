import React, { useState } from "react";
import { Button, Card, IconButton, Tooltip, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PersonAddDialog from "../components/PersonAddDialog";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CheckCircle, Person } from "@mui/icons-material";
import CheckMobileHook480 from "../components/checkMobile";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

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
  adult_price,
  tooltipDetails,
}) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const mobile = CheckMobileHook480();
  const [more, setMore] = useState("hidden");
  const Navigate = useNavigate();
  // console.log(more);
  return (
    <Card
      className={`w-full shadow-xl border-4 ${colorClass} relative cursor-pointer`}
      // onClick={onClick}
    >
      <div
        className={`w-full h-full mb-2 ${
          isSelected ? "bg-[#e2dbdb] " : "bg-white"
        }`}
      >
        {isPopular ? (
          <div className="absolute top-[-4px] z-10 right-[10px] bg-[#D83F3F] text-white py-[4px] px-3 rounded-bl-md">
            Most Popular
          </div>
        ) : (
          ""
        )}
        <div className="relative ">
          <Slider>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Slide ${index}`} className="w-full" />
              </div>
            ))}
          </Slider>

          <Card
            className="w-full p-2"
            style={{ backgroundColor: isSelected ? "#e2dbdb" : "white" }}
          >
            <div className="flex justify-center gap-2 mb-2 ">
              <div className="w-[60%]">
                <Typography variant="h6" component="h2" className="font-bold">
                  {title}
                </Typography>
                <Typography variant="body1" component="p" className="my-1">
                  {subtitle}
                </Typography>
              </div>

              <div className="text-[#2E9325] my-2 w-[40%] ">
                <div className="flex items-center gap-1 justify-center">
                  <div className="text-6xl">₹</div>
                  <div className="flex p-0 m-0 flex-col gap-0">
                    <label className="p-0 m-0 font-bold text-4xl">
                      {adult_price}
                    </label>
                    <label className="p-0 m-[-4px] text-[#7B7A7A]">
                      Per Adults
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <Tooltip title={tooltipDetails}>
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                color="success"
                fullWidth
                className="py-2 mt-4"
                onClick={() => Navigate("/moreinfo")}
              >
                More Info
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                color="primary"
                fullWidth
                className="py-2 mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                Select Plan
              </Button>
            </div>
          </Card>
        </div>
        {mobile && more !== "block" ? (
          <button
            className="pt-3 pl-3 text-[#2E9325]"
            onClick={() => setMore("block")}
          >
            View More..
          </button>
        ) : (
          ""
        )}
        <div className={`divide-y ${mobile ? more : "block"} p-4`}>
          {features.map((section, index) => (
            <div key={index} className="py-2">
              <Typography variant="h6" className="font-bold">
                {section.title}
              </Typography>
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
        {mobile && more !== "hidden" ? (
          <button
            className="pt-3 pl-3 text-[#2E9325]"
            onClick={() => setMore("hidden")}
          >
            View Less
          </button>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
}

function FirstPage({
  admin,
  setAdmin,
  setPersons,
  handleNextPage,
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
  packages,
  selectedTimeSlotString,
  setSelectedTimeSlotString,
  holidaysByDate,
  adultsPrice,
  setAdultsPrice,
  childPrice,
  setClildprice,
  selectedPAckageName,
  setSelectedPAckageName,
  showAlert,
}) {
  // console.log(selectedPAckageName, "selectedPAckageNameselectedPAckageName");
  // console.log(selectedTimeSlot,"selectedTimeSlotselectedTimeSlot");

  const [openPersonDialog, setOpenPersonDialog] = useState(false);

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
    // console.log(packageName, "12222");
    setSelectedPAckageName(packageName);
    setClildprice(child_price);
    setAdultsPrice(adult_price);
    setSelectedTimeSlot(null);
    if (!visitingDate) {
      showAlert({
        title: "Failed!",
        text: "Visiting Date required",
        icon: "error",
        timer: 3000,
      });
      // alert("Visiting Date Required");
      return;
    }

    if (child_allowed === 0 && persons.children > 0) {
      alert("Children are not Allowed on This Package");
      return;
    } else {
      setSelectedPackage(packageId);
    }
  };

  const handleDateChange = (date) => {
    setVisitingDate(date);
  };

  const handleProceed = () => {
    if (!visitingDate) {
      showAlert({
        title: "Failed!",
        text: "Visiting Date required",
        icon: "error",
        timer: 3000,
      });
      // alert("Visiting Date required");
      return;
    }
    if (!selectedTimeSlot) {
      showAlert({
        title: "Failed!",
        text: "TimeSlots Are Require",
        icon: "error",
        timer: 3000,
      });
      // alert("TimeSlots Are Require")
      return;
    }
    const selectedPackageData = {
      title: selectedPackage,
      visitingDate: visitingDate ? visitingDate.format("DD/MM/YYYY") : null,
      timeSlot: selectedTimeSlot,
      persons,
    };
    // console.log("Selected Package Data:", selectedPackageData);
    handleNextPage();
  };

  const disableDates = (date) => {
    const holidaysFormatted = holidays.map((holiday) => ({
      from: dayjs(holiday.from_date, "YYYY-MM-DD"),
      to: dayjs(holiday.to_date, "YYYY-MM-DD"),
    }));

    const isHoliday = holidaysFormatted.some((holiday) =>
      date.isBetween(holiday.from, holiday.to, null, "[]")
    );
    const isHolidayByDate = holidaysByDate.some(
      (holiday) => holiday.is_disabled === 1 && date.isSame(dayjs(holiday.date))
    );
    const isMonday = date.day() === 1;
    const isWithinRange = date.isBetween(
      dayjs().subtract(1, "day"), // Include today
      dayjs().add(configurations?.advance_booking_days, "day"),
      null,
      "[]"
    );
    return !isWithinRange || isHoliday || isHolidayByDate || isMonday;
  };

  const integratedSafariImages = ["/1.png", "/2.png", "/3.png"];
  const zooSafariImages = ["/3.png", "/2.png", "/1.png"];
  const natureSafariImages = ["/2.png", "/1.png", "/3.png"];

  const [more, setMore] = useState("hidden");
  // console.log(timeSlots, "timeSlots");

  const filteredTimeSlots = timeSlots.filter((slot) => {
    if (selectedPackage === 1) return slot.timeslot_for === 1;
    if (selectedPackage === 2) return slot.timeslot_for === 2;
    if (selectedPackage === 3) return slot.timeslot_for === 3;
    return false;
  });

  const getPackageFeatures = (pkg) => {
    return pkg.package_types.map((type) => ({
      title: type.name,
      items: type.package_types_details.map((detail) => detail.name),
    }));
  };

  return (
    <>
      <div className="mt-[58px] bg-[#ECECEC]">
        <div className="md:flex pt-[25px] md:px-[20px] xl:px-[200px] items-center justify-between">
          <div className=" md:w-[60%] flex px-4 md:px-0 flex-col gap-1">
            <h1 className="text-[#1C1C1C] text-start text-[25px] md:text-[35px] font-semibold leading-tight md:leading-tight">
              Your Safari Awaits:
            </h1>
            <h1 className="text-[#A56822]  text-start text-3xl md:text-6xl font-semibold leading-tight md:leading-tight">
              Book Your Tickets
            </h1>
            <h1 className="text-[#A56822] text-3xl text-start ">
              for a Safari Adventure at Rajgir !
            </h1>
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
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                  <div className="flex items-center justify-center gap-0">
                    <div className="relative ">
                      <Person />
                      <div className="absolute flex items-center justify-center top-[-14px] right-[-10px] p-[2px] h-[20px] w-[20px] rounded-[50%] bg-[#A56822] text-white text-sm">
                        {persons?.adults + persons?.children}
                      </div>
                    </div>
                    Add Visitors
                  </div>
                </button>
                <PersonAddDialog
                  persons={persons}
                  setPersons={setPersons}
                  openPersonDialog={openPersonDialog}
                  onClose={handleClosePersonDialog}
                  configurations={configurations}
                />
              </div>
            </div>
          </div>
          <div className="w-[40%] hidden md:block">
            <img src="/heroimg.png" alt="Hero_Image" />
          </div>
        </div>
      </div>

      <div className="min-h-screen md:px-[20px] xl:px-[200px] bg-[#ECECEC] flex flex-col items-center justify-center p-4">
        <div
          className={`w-full mt-[40px] grid grid-cols-1 md:grid-cols-3 gap-5`}
        >
          {packages.map((pkg) => (
            <SafariOption
              key={pkg.id}
              title={pkg.package_name}
              subtitle={pkg.description}
              price={pkg.price}
              features={getPackageFeatures(pkg)}
              adult_price={pkg.adult_price}
              child_price={pkg.child_price}
              isPopular={pkg.is_popular}
              tooltipDetails={`Price of Per Adults ₹${pkg.adult_price} and for Per Child ₹${pkg.child_price}`}
              colorClass={
                selectedPackage === pkg.id
                  ? "border-blue-500 border-2"
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
              images={natureSafariImages}
              more={more}
              setMore={setMore}
            />
          ))}
        </div>

        <div className="w-full my-4">
          <Card className="p-4">
            <label className="text-[#042D03] text-[18px] font-bold">
              Select Time Slot
            </label>
            <p className="text-black text-[12px] font-medium">
              Visitor are advised to report boarding point 30 minutes prior to
              the reserve slot
            </p>
            <div className="flex flex-wrap md:flex-row flex-col mt-3 w-full gap-2">
              {/* <div className="grid grid-cols-2 mt-3 w-full gap-2"> */}
              <div
                className={`p-2 w-fit border border-[#808080] text-[#808080] rounded-md cursor-pointer text-center`}
              >
                09:00 AM - 10:00 AM
              </div>
              {filteredTimeSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => {
                    setSelectedTimeSlotString(slot.timeslot);
                    setSelectedTimeSlot(slot.id);
                  }}
                  className={`p-2 w-fit border ${
                    selectedTimeSlot === slot.id
                      ? "border-[#008000] text-white bg-[#008000]"
                      : "border-[#008000] text-[#008000]"
                  }  rounded-md cursor-pointer text-center`}
                >
                  {slot.timeslot}
                </div>
              ))}

              <div
                className={`p-2 w-fit border border-[#808080] text-[#808080] rounded-md cursor-pointer text-center`}
              >
                02:00 AM - 03:00 AM
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full flex justify-center">
          <div className="flex w-full flex-col items-center p-4 bg-white shadow-sm rounded-lg">
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              color="primary"
              onClick={handleProceed}
              disabled={!selectedPackage}
              className="py-2 px-8"
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
