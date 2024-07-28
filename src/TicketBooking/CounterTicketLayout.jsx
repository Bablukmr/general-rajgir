import React, { useEffect, useState } from "react";
import CounterTicket from "./CounterTicket";
import Sidebar from "./Sidebar";
import TicketSummary from "./TicketSummary ";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "../components/ChangePassword";
import TicketSearch from "../components/TicketSearch";

function CounterTicketLayout({
  handlePreviousPage,
  persons,
  setPersons,
  holidays,
  configurations,
  timeSlots,
  packages,
  setVisitingDate,
  visitingDate,
  setTimeSlot,
}) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [adultsPrice, setAdultsPrice] = useState(null);
  const [childPrice, setClildprice] = useState(null);
  const [selectedPackageName, setSelectedPAckageName] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTimeSlotString, setSelectedTimeSlotString] = useState(null);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  // console.log(childPrice,"childPricechildPrice");
  return (
    <div className="bg-[#ECECEC] min-h-screen flex">
      <div className="flex items-start w-full">
        <div className="relative">
          <IconButton onClick={toggleSidebar} className="">
            <div className="fixed top-[45%] left-0 flex items-center justify-center text-white h-[100px] rounded-r-lg w-[20px] bg-green-600">
              <KeyboardDoubleArrowRightIcon />
            </div>
          </IconButton>
          {sidebarVisible && (
            <div className="fixed z-10 flex left-0 top-[60px] ">
              <Sidebar />
              <div
                onClick={toggleSidebar}
                className="mt-[6px] cursor-pointer flex items-center justify-center text-white h-[100px] rounded-r-lg w-[20px] bg-green-600"
              >
                <KeyboardDoubleArrowLeftIcon />
              </div>
            </div>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className={`mx-auto ${
                    sidebarVisible
                      ? "lg:mr-[300px] w-[100%] lg:w-[65%]"
                      : "w-[100%] lg:mr-[270px]"
                  } transition-all duration-300`}
                >
                  <CounterTicket
                    configurations={configurations}
                    handlePreviousPage={handlePreviousPage}
                    persons={persons}
                    setPersons={setPersons}
                    holidays={holidays}
                    timeSlots={timeSlots}
                    packages={packages}
                    setVisitingDate={setVisitingDate}
                    visitingDate={visitingDate}
                    selectedPackageName={selectedPackageName}
                    setSelectedPAckageName={setSelectedPAckageName}
                    adultsPrice={adultsPrice}
                    setAdultsPrice={setAdultsPrice}
                    childPrice={childPrice}
                    setClildprice={setClildprice}
                    selectedTimeSlot={selectedTimeSlot}
                    setSelectedTimeSlot={setSelectedTimeSlot}
                    selectedTimeSlotString={selectedTimeSlotString}
                    setTimeSlot={setTimeSlot}
                    setSelectedTimeSlotString={setSelectedTimeSlotString}
                  />
                </div>
                <div className="fixed hidden lg:block right-0 top-[100px]">
                  <TicketSummary
                    persons={persons}
                    selectedPackageName={selectedPackageName}
                    setAdultsPrice={setAdultsPrice}
                    setClildprice={setClildprice}
                    adultsPrice={adultsPrice}
                    childPrice={childPrice}
                    visitingDate={visitingDate}
                    selectedTimeSlot={selectedTimeSlotString}
                    // selectedTimeSlotString={selectedTimeSlotString}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/change-password"
            element={
              <div className="flex items-center justify-center w-full h-full">
                <ChangePassword />
              </div>
            }
          />
          {/* <Route path="/booking-history" element={<BookingHistory />} /> */}
          <Route path="/downloadticket" element={<TicketSearch />} />
        </Routes>
      </div>
    </div>
  );
}

export default CounterTicketLayout;
