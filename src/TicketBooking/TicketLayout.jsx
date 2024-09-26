import React, { useState, useEffect, useRef } from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import CounterTicketLayout from "./CounterTicketLayout";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import { Close, More, RampRight } from "@mui/icons-material";

function TicketLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const bookingfor = isAuthenticated ? 2 : 1;
  const [totalExperiancePrice, setTotalExperiancePrice] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState("first");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [visitingDate, setVisitingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTimeSlotString, setSelectedTimeSlotString] = useState(null);

  const [adultsPrice, setAdultsPrice] = useState(null);
  const [childPrice, setClildprice] = useState(null);

  const [persons, setPersons] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [adultDetails, setAdultDetails] = useState([]);
  const [childDetails, setChildDetails] = useState([]);
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
  const [timeLeft, setTimeLeft] = useState(540); // 9 minutes = 540 seconds
  const timerRef = useRef();

  const [configurations, setConfigrations] = useState({});
  const [holidays, setHolydays] = useState([]);
  const [holidaysByDate, setHolydaysByDate] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedPAckageName, setSelectedPAckageName] = useState(null);
  console.log(selectedPAckageName, "selectedPAckageName");
  const [finalSelectedAndAddData, setFinalSelectedAndAddData] = useState({
    persons,
  });
  const [visitorDetails, setVisitorDetails] = useState(
    Array(persons?.adults || 0).fill({ name: "", gender: "", error: false })
  );

  useEffect(() => {
    axios
      .get(
        `https://zoo-api.nextindiainitiative.com/public/api/v1/common-data?api_key=${"CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN"}`
      )
      .then((response) => {
        const data = response.data;
        if (data.status) {
          setHolydays(data?.event);
          setConfigrations(data?.configuration);
          setPackages(data?.packages);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    axios
      .post(
        `https://zoo-api.nextindiainitiative.com/public/api/v1/booking-calender?api_key=${"CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN"}&booking_from=${bookingfor}`
      )
      .then((response) => {
        const data = response.data;
        if (data.status) {
          setHolydaysByDate(data?.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    axios
      .get(
        `https://zoo-api.nextindiainitiative.com/public/api/v1/timeslots?api_key=${"CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN"}&package_id=1&booking_from=${bookingfor}`
      )
      .then((response) => {
        const data = response.data;
        if (data.status) {
          setTimeSlot(data?.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (currentPage !== "first") {
      startTimer();
    } else {
      clearInterval(timerRef.current);
      setTimeLeft(540);
    }

    return () => clearInterval(timerRef.current);
  }, [currentPage]);

  function startTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setCurrentPage("first");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  function handleNextPage() {
    switch (currentPage) {
      case "first":
        setCurrentPage("second");
        break;
      case "second":
        setCurrentPage("third");
        break;
      default:
        break;
    }
  }

  function handlePreviousPage() {
    switch (currentPage) {
      case "second":
        setCurrentPage("first");
        break;
      case "third":
        setCurrentPage("second");
        break;
      default:
        break;
    }
  }

  const percentage = (timeLeft / 540) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const showAlert = ({ title, text, icon, timer }) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: timer,
      timerProgressBar: !!timer,
    });
  };
  const [sidebar, setsidebar] = useState(false);
  return (
    <>
      {/* {isAuthenticated ? (
        <CounterTicketLayout
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          persons={persons}
          setPersons={setPersons}
          holidays={holidays}
          configurations={configurations}
          timeSlots={timeSlot}
          packages={packages}
          setVisitingDate={setVisitingDate}
          visitingDate={visitingDate}
          setTimeSlot={setTimeSlot}
          holidaysByDate={holidaysByDate}
        />
      ) : ( */}

      <div className="min-h-screen relative">
        <div className="fixed top-[80px] right-0 z-10">
          {currentPage !== "first" && (
            <div className="flex flex-col items-center bg-red-700 text-white p-2 rounded-lg">
              <div className="w-10 h-10">
                <CircularProgressbar
                  value={percentage}
                  text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#4caf50",
                    trailColor: "#d6d6d6",
                    textSize: "30px",
                  })}
                />
              </div>
              <div className="text-center">
                <span className="text-sm">Time left</span>
              </div>
            </div>
          )}
        </div>
        {currentPage === "first" && (
          <FirstPage
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            persons={persons}
            setPersons={setPersons}
            admin={admin}
            setAdmin={setAdmin}
            configurations={configurations}
            holidays={holidays}
            timeSlots={timeSlot}
            selectedPackage={selectedPackage}
            visitingDate={visitingDate}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedPackage={setSelectedPackage}
            setVisitingDate={setVisitingDate}
            setSelectedTimeSlot={setSelectedTimeSlot}
            packages={packages}
            selectedTimeSlotString={selectedTimeSlotString}
            setSelectedTimeSlotString={setSelectedTimeSlotString}
            holidaysByDate={holidaysByDate}
            adultsPrice={adultsPrice}
            setAdultsPrice={setAdultsPrice}
            childPrice={childPrice}
            setClildprice={setClildprice}
            selectedPAckageName={selectedPAckageName}
            setSelectedPAckageName={setSelectedPAckageName}
            showAlert={showAlert}
          />
        )}
        {currentPage === "second" && (
          <SecondPage
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            persons={persons}
            setPersons={setPersons}
            admin={admin}
            setAdmin={setAdmin}
            configurations={configurations}
            holidays={holidays}
            timeSlots={timeSlot}
            selectedPackage={selectedPackage}
            visitingDate={visitingDate}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedPackage={setSelectedPackage}
            setVisitingDate={setVisitingDate}
            setSelectedTimeSlot={setSelectedTimeSlot}
            adultDetails={adultDetails}
            childDetails={childDetails}
            communicationDetails={communicationDetails}
            identityProof={identityProof}
            setAdultDetails={setAdultDetails}
            setChildDetails={setChildDetails}
            setCommunicationDetails={setCommunicationDetails}
            setIdentityProof={setIdentityProof}
            packages={packages}
            selectedTimeSlotString={selectedTimeSlotString}
            setSelectedTimeSlotString={setSelectedTimeSlotString}
            adultsPrice={adultsPrice}
            setAdultsPrice={setAdultsPrice}
            childPrice={childPrice}
            setClildprice={setClildprice}
            selectedPAckageName={selectedPAckageName}
            setSelectedPAckageName={setSelectedPAckageName}
            showAlert={showAlert}
            visitorDetails={visitorDetails}
            setVisitorDetails={setVisitorDetails}
          />
        )}
        {currentPage === "third" && (
          <ThirdPage
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            persons={persons}
            setPersons={setPersons}
            admin={admin}
            setAdmin={setAdmin}
            configurations={configurations}
            holidays={holidays}
            timeSlots={timeSlot}
            selectedPackage={selectedPackage}
            visitingDate={visitingDate}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedPackage={setSelectedPackage}
            setVisitingDate={setVisitingDate}
            setSelectedTimeSlot={setSelectedTimeSlot}
            adultDetails={adultDetails}
            childDetails={childDetails}
            communicationDetails={communicationDetails}
            identityProof={identityProof}
            setAdultDetails={setAdultDetails}
            setChildDetails={setChildDetails}
            setCommunicationDetails={setCommunicationDetails}
            setIdentityProof={setIdentityProof}
            packages={packages}
            selectedTimeSlotString={selectedTimeSlotString}
            setSelectedTimeSlotString={setSelectedTimeSlotString}
            adultsPrice={adultsPrice}
            setAdultsPrice={setAdultsPrice}
            childPrice={childPrice}
            setClildprice={setClildprice}
            selectedPAckageName={selectedPAckageName}
            setSelectedPAckageName={setSelectedPAckageName}
            totalExperiancePrice={totalExperiancePrice}
            setTotalExperiancePrice={setTotalExperiancePrice}
            showAlert={showAlert}
            visitorDetails={visitorDetails}
            setVisitorDetails={setVisitorDetails}
          />
        )}
        <div className="bg-white shadow-md z-10 fixed right-0 md:right-10 rounded-md bottom-2 px-2 py-2 flex flex-col gap-[1px] items-center justify-center w-fit">
          <h1 className="text-base font-medium text-[#2E9325]">
            Total: {totalExperiancePrice}
          </h1>
          <p
            onClick={() => setsidebar(true)}
            className="underline cursor-pointer text-blue-800 text-sm font-thin"
          >
            View Details <RampRight />
          </p>
        </div>
        <div
          className={`bg-blue-700 ${
            sidebar ? "block" : "hidden"
          } shadow-md h-screen w-[100%]  md:w-[25%] fixed right-0 rounded-md bottom-2 z-20`}
        >
          <div className="bg-white relative w-full h-full mt-3 flex flex-col gap-[1px] ">
            <div
              onClick={() => setsidebar(false)}
              className="absolute top-[50px] m-2 p-1 cursor-pointer left-0 text-black"
            >
              <Close />
            </div>
            <div className="flex flex-col gap-[6px] mt-[80px] p-4 w-full justify-start items-start">
              <h1 className="text-lg font-semibold">Your Ticket Summary</h1>
              <p className="border-b text-base font-normal">
                Selected Package: {selectedPAckageName}
              </p>
              <p className="border-b text-base font-normal">
                Number of Adults: {persons.adults}
              </p>
              <p className="border-b text-base font-normal">
                Number of Children: {persons.children}
              </p>
              <p className="border-b text-base font-normal">
                Selected Time Slot: {selectedTimeSlotString}
              </p>
              <p className="border-b text-base font-normal">
                Selected Time Slot:{" "}
                {visitingDate && visitingDate.format("YYYY-MM-DD")}
              </p>
              <div className="bg-white shadow-md z-10 absolute right-0 md:right-10 rounded-md bottom-2 px-2 py-2 flex flex-col gap-[1px] items-center justify-center w-fit">
                <h1 className="text-base font-medium text-[#2E9325]">
                  Total: {totalExperiancePrice}
                </h1>
                <p
                  onClick={() => setsidebar(true)}
                  className="underline cursor-pointer text-blue-800 text-sm font-thin"
                >
                  View Details <RampRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}

      {/* )} */}
    </>
  );
}

export default TicketLayout;
