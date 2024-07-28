import React from "react";

const Ticket = React.forwardRef((props, ref) => {
  const {
    selectedPackage,
    nationality,
    visitingDate,
    selectedTimeSlot,
    name,
    gender,
    age,
    email,
    mobile,
    message,
    payment_status,
    qr,
    booking_id,
    order_id,
    utr_id,total_amount
  } = props;

  return (
    <div ref={ref} className="w-[250px] p-4 text-xs font-mono border-[1px] border-gray-600">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-lg">{selectedPackage}</p>
          <p className="m-0 text-[10px]">Rs- {total_amount}</p>
          <p className="m-0 text-[10px]">CASH PAID</p>
        </div>
        <div className="text-[10px]">
          <p>{visitingDate}</p>
          <p>{order_id}</p>
          {/* <p>Mailed from 30146</p> */}
        </div>
      </div>
      <hr className="my-2" />
      <div className="text-[10px]">
        <p className="m-0">Booking Id:{booking_id}</p>
        <p className="m-0">{selectedPackage}</p>
        <p className="m-0">Nationality:{nationality}</p>
        <p className="m-0">Visiting Date: {visitingDate}</p>
        <p className="m-0">Time Slot: {selectedTimeSlot}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        <div className="text-[10px]">
          <p className="m-0">Booking Id: {booking_id}</p>
          <p className="m-0">Name: {name}</p>
          <p className="m-0">Gender: {gender}</p>
          <p className="m-0">Age: {age}</p>
          <p className="m-0">Email: {email}</p>
          <p className="m-0">Mobile: {mobile}</p>
        </div>
       
        <img src={qr} alt="QR" className="h-[38px] w-[38px]"/>
      </div>
      <hr className="my-2" />
      <div className="text-center text-[10px]">
        <p className="m-0">{message}</p>
        {/* <p className="m-0">USPS DELIVERY CONFIRMATION</p> */}
        <p className="m-0 text-sm font-bold">{payment_status}</p>
        <p className="m-0">{utr_id}</p>
        <p className="m-0">Electronic Rates Approved #{order_id}</p>
      </div>
    </div>
  );
});

export default Ticket;
