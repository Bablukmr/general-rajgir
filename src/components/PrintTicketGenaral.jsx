import React from "react";

const BookingInfo = React.forwardRef(({ data }, ref) => {
  const { booking_info, total_person, transaction, qr } = data;
  // console.log(booking_info);
  return (
    <div ref={ref} className="p-6 bg-white  rounded-lg">
      <div className="flex justify-between mb-2">
        <img src="/logo.png" alt="QR" width={100} />
        <img src="/naturelogo.png" alt="QR" width={100} />
      </div>
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-bold">Ticket Booking Confirmation</h1> */}
        <div className="mt-4 text-green-600 font-semibold">
          Booking {transaction.payment_status}.
        </div>
        <img src={qr} alt="QR" width={70} />
       
      </div>
      <section>
        <h2 className="text-base font-semibold mb-4 border-b pb-2">
          Transaction Details
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-medium">Booking ID:</span>{" "}
            {transaction.booking_id}
          </div>
          <div>
            <span className="font-medium">Order ID:</span>{" "}
            {transaction.order_id}
          </div>
          <div>
            <span className="font-medium">Transaction ID:</span>{" "}
            {transaction.transaction_id}
          </div>
          <div>
            <span className="font-medium">Payment Status:</span>{" "}
            {transaction.payment_status}
          </div>
          <div>
            <span className="font-medium">Payment Method:</span>{" "}
            {transaction.payment_by}
          </div>
          <div>
            <span className="font-medium">Timeslot:</span>{" "}
            {booking_info.timeslot}
          </div>
          <div>
            <span className="font-medium">Visiting Date:</span>{" "}
            {booking_info.visting_date}
          </div>
          <div>
            <span className="font-medium">Amount:</span>{" "}
            {transaction.total_amount}
          </div>
        
        </div>
       
      </section>
      <section className="mb-6">
        <h2 className="text-base font-semibold my-3">
        Total Person
        </h2>
        <table className="min-w-full bg-white border rounded-lg overflow-hidden ">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left">Full Name</th>
              {/* <th className="py-2 px-4 text-left">Age</th> */}
              <th className="py-2 px-4 text-left">Gender</th>
            </tr>
          </thead>
          <tbody>
            {total_person.map((person, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{person.full_name}</td>
                {/* <td className="py-2 px-4">{person.age}</td> */}
                <td className="py-2 px-4">{person.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mb-6">
        <h2 className="text-base font-semibold mb-4 border-b pb-2">
          Booking Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-medium">Email:</span> {booking_info.email_id}
          </div>
          <div>
            <span className="font-medium">Contact Number:</span>{" "}
            {booking_info.contact_number}
          </div>
          {/* <div>
            <span className="font-medium">Nationality:</span>{" "}
            {booking_info.nationality}
          </div> */}
          <div>
            <span className="font-medium">ID Proof:</span>{" "}
            {booking_info.id_proof_type} - {booking_info.id_proof_number}
          </div>
          <div>
            <span className="font-medium">Package:</span>{" "}
            {booking_info.package_name}
          </div>
          {/* <div>
            <span className="font-medium">Timeslot:</span>{" "}
            {booking_info.timeslot}
          </div>
          <div>
            <span className="font-medium">Visiting Date:</span>{" "}
            {booking_info.visting_date}
          </div> */}
          {/* <div>
            <span className="font-medium">Visiting Time:</span>{" "}
            {booking_info.visting_time}
          </div> */}
          <div>
            <span className="font-medium">Number of Adults:</span>{" "}
            {booking_info.no_of_adults}
          </div>
          <div>
            <span className="font-medium">Number of Children:</span>{" "}
            {booking_info.no_of_childs}
          </div>
          <div>
            <span className="font-medium">Number of Infants:</span>{" "}
            {booking_info.no_of_infants}
          </div>
        </div>
      </section>

     

      {/* <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Transaction Details
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-medium">Booking ID:</span>{" "}
            {transaction.booking_id}
          </div>
          <div>
            <span className="font-medium">Order ID:</span>{" "}
            {transaction.order_id}
          </div>
          <div>
            <span className="font-medium">Transaction ID:</span>{" "}
            {transaction.transaction_id}
          </div>
          <div>
            <span className="font-medium">Payment Status:</span>{" "}
            {transaction.payment_status}
          </div>
          <div>
            <span className="font-medium">Payment Method:</span>{" "}
            {transaction.payment_by}
          </div>
          <div>
            <span className="font-medium">Amount:</span>{" "}
            {transaction.total_amount}
          </div>
        </div>
       
      </section> */}
    </div>
  );
});

export default BookingInfo;
