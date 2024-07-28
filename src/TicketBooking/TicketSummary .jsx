import React from "react";
import {
  AttachMoney,
  People,
  CalendarToday,
  AccessTime,
  Person,
  Phone,
  AccountBalanceWallet,
  CreditCard,
  Payment,
  LocalAtm,
} from "@mui/icons-material";

const TicketSummary = ({
  persons,
  selectedPackageName,
  adultsPrice,
  childPrice,
  visitingDate,
  selectedTimeSlot
}) => {
  const totalPrice =
    adultsPrice * persons.adults + childPrice * persons.children;
  // console.log(visitingDate, "visitingDatevisitingDate");
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-[290px] mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Your Ticket Summary</h2>
        {/* <p className="text-sm text-gray-500">Zoo Safari</p> */}
      </div>
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Selected Package:</span>
        <span className="text-blue-600  px-4">{selectedPackageName}</span>
      </div>
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Entry Ticket:</span>
        <span className="text-blue-600  px-4">₹ 150</span>
      </div>
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Number of Visitors:</span>
        <span className="text-blue-600  px-4">
          {persons.adults + persons.children}
        </span>
      </div>
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Date of Visiting:</span>
        <span className="text-blue-600 px-4">
          {visitingDate ? visitingDate.format("YYYY-MM-DD") : ""}
        </span>
      </div>
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Visiting Time:</span>
        <span className="text-blue-600 px-4">{selectedTimeSlot}</span>
      </div>
      <div className="my-4 border-t border-gray-200"></div>
      <div className="mb-4 flex justify-between text-sm text-gray-600">
        <span>Sub Total:</span>
        <span className="text-blue-600 text-xl px-4">₹ {totalPrice}</span>
      </div>
      <div className="my-4 border-t border-gray-200"></div>
      <div className="text-sm font-semibold text-gray-600 mb-2">
        Payment Mode
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col items-center">
          <LocalAtm className="text-gray-600" />
          <span className="text-xs text-gray-600">Cash</span>
        </div>
        <div className="flex flex-col items-center">
          <CreditCard className="text-gray-600" />
          <span className="text-xs text-gray-600">Debit</span>
        </div>
        <div className="flex flex-col items-center">
          <Payment className="text-gray-600" />
          <span className="text-xs text-gray-600">UPI</span>
        </div>
        <div className="flex flex-col items-center">
          <AccountBalanceWallet className="text-gray-600" />
          <span className="text-xs text-gray-600">Wallet</span>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
