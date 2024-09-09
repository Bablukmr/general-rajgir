import React, { useState, useRef, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BookingInfo from "../components/PrintTicketGenaral";
import ReactToPrint from "react-to-print";
import axios from "axios";
import dayjs from "dayjs";
import AttractionCard from "../components/Attractioncard";
function AttractionCards({
  title,
  price,
  description,
  safariExperience,
  selectedExperienceCounts,
  setSelectedExperienceCounts,
  persons,
  type,
}) {
  const handleIncrease = (sectionIndex, itemIndex) => {
    const currentCount =
      selectedExperienceCounts[type][`${sectionIndex}-${itemIndex}`] || 0;
    const limit = type === "adults" ? persons.adults : persons.children;

    if (currentCount < limit) {
      setSelectedExperienceCounts((prevCounts) => ({
        ...prevCounts,
        [type]: {
          ...prevCounts[type],
          [`${sectionIndex}-${itemIndex}`]: currentCount + 1,
        },
      }));
    }
  };

  const handleDecrease = (sectionIndex, itemIndex) => {
    setSelectedExperienceCounts((prevCounts) => {
      const currentCount =
        prevCounts[type][`${sectionIndex}-${itemIndex}`] || 0;
      if (currentCount > 0) {
        return {
          ...prevCounts,
          [type]: {
            ...prevCounts[type],
            [`${sectionIndex}-${itemIndex}`]: currentCount - 1,
          },
        };
      }
      return prevCounts;
    });
  };

  return (
    <Card className="flex-1 m-4">
      <div className="">
        <div className="bg-[#287D74] w-full h-[120px] relative">
          <Typography
            variant="h5"
            className="font-bold text-center text-white pt-3"
          >
            {title}
          </Typography>
          <div className="flex justify-center items-center my-4 absolute w-[140px] h-[140px] bg-[#287D74] p-5 rounded-[50%] left-[26%] border-4 border-white shadow-lg">
            <div className="text-center">
              <Typography variant="h4" className="font-bold text-white">
                {price}
              </Typography>
              <Typography className="text-white">{description}</Typography>
            </div>
          </div>
        </div>
        <div className="divide-y mt-[60px] p-4">
          {safariExperience?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="py-2">
              <Typography variant="h6" className="font-bold">
                {section.name}
              </Typography>
              <ul>
                {section.package_types_details?.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-center py-1 border-b last:border-b-0"
                  >
                    <CheckCircle className="text-green-500 mr-2" />
                    <div className="flex-grow text-end w-full flex items-center justify-between">
                      <Typography
                        variant="body1"
                        className="font-medium flex items-center justify-center text-start"
                      >
                        {item.name}
                      </Typography>
                      <div className="flex items-center gap-[2px]">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          className="min-w-0 p-[1px]"
                          onClick={() =>
                            handleDecrease(sectionIndex, itemIndex)
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>
                        <Typography
                          variant="body1"
                          className="border-2 w-7 h-7 flex items-center justify-center rounded-md"
                        >
                          {selectedExperienceCounts[type][
                            `${sectionIndex}-${itemIndex}`
                          ] || 0}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          className="min-w-0 p-1"
                          onClick={() =>
                            handleIncrease(sectionIndex, itemIndex)
                          }
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                      </div>
                    </div>
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

const TicketSummary = ({
  totalPrice,
  handlePayment,
  selectedPackageName,
  selectedTimeSlot,
  selectedTimeSlotString,
  visitingDate,
  adults,
  children,totalExperiancePrice
}) => (
  <Card className="flex-1 m-4 p-4">
    <CardContent className="flex flex-col gap-1">
      <Typography variant="h6" className="font-bold">
        Your Ticket Summary
      </Typography>
      <Typography variant="body1">
        Package Name: {selectedPackageName}
      </Typography>
      <Typography variant="body2">Number of Adults: {adults}</Typography>
      <Typography variant="body2">Number of Children: {children}</Typography>
      <Typography variant="body2">
        Date of Visiting: {visitingDate.format("D MMMM YYYY")}
      </Typography>
      <Typography variant="body2">
        Visiting Time: {selectedTimeSlotString}
      </Typography>
      <Typography
        variant="h6"
        className="text-start text-2xl font-bold text-green-600"
      >
        Total Price: ₹{totalExperiancePrice}
      </Typography>
      <Button
        sx={{ textTransform: "none" }}
        onClick={handlePayment}
        variant="contained"
        color="success"
        fullWidth
        className="mt-4"
      >
        Pay Now
      </Button>
    </CardContent>
  </Card>
);

function ThirdPage({
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
  adultDetails,
  childDetails,
  communicationDetails,
  identityProof,
  setAdultDetails,
  setChildDetails,
  setCommunicationDetails,
  setIdentityProof,
  adultsPrice,
  setAdultsPrice,
  childPrice,
  setChildPrice,
  selectedPAckageName,
  selectedTimeSlotString,
  packages,
  totalExperiancePrice, 
  setTotalExperiancePrice
}) {
  // console.log(selectedPAckageName,"selectedPackageName");
  const [selectedExperienceCounts, setSelectedExperienceCounts] = useState({
    adults: {},
    children: {},
  });
  const [safariExperience, setSafariExperience] = useState([]);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const printRef = useRef();
  // const [totalExperiancePrice, setTotalExperiancePrice] = useState(0);
  useEffect(() => {
    if (packages && packages.length > 0) {
      const selectedPackage = packages.find((pkg) => pkg.id === 1);
      const experience = selectedPackage?.package_types || [];
      setSafariExperience(experience);
    }
  }, [packages]);

  const handlePayment = async () => {
    const totalPersons = [...adultDetails, ...childDetails];

    // if (communicationDetails.mobile.length < 10) {
    //   setError("The contact number must be at least 10 digits long.");
    //   return;
    // }

    // if (
    //   totalPersons.length !==
    //   persons.adults + persons.children + persons.infants
    // ) {
    //   setError("Total person not equal to selected person.");
    //   return;
    // }
    //   total_amount: calculateTotalPrice(),

    setError(null);
    // console.log(
    //   visitingDate.format("YYYY-MM-DD"),
    //   selectedTimeSlotString,
    //   "selectedTimeSlotString"
    // );
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
        total_amount: totalExperiancePrice,
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
  };

  const calculateTotalPrice = () => {
    const experiencePrice = (type) =>
      Object.values(selectedExperienceCounts[type]).reduce(
        (acc, count) => acc + (type === "adults" ? count * 150 : 0),
        0
      );
    return (
      adultsPrice * persons.adults +
      childPrice * persons.children +
      experiencePrice("adults") +
      experiencePrice("children")
    );
  };

  const totalPrice = calculateTotalPrice();
  const [selectedExperiences, setSelectedExperiences] = useState({
    adults: [],
    children: [],
  });
  // const [totalExperiancePrice, setTotalExperiancePrice] = useState(0);
  return (
    <div className="flex w-full flex-col md:px-[20px] lg:flex-row justify-center items-start p-4 bg-gray-100 mt-16">
      {!isPaymentSuccessful ? (
        <>
          {safariExperience.length > 0 && (
             <div
             className={`${
               selectedPackage === null ? "hidden" : "block"
             } p-2 mt-2 w-full md:w-[100%] lg:w-[70%] flex items-start justify-between gap-2 flex-col md:flex-row`}
           >
             <AttractionCard
               totalExperiancePrice={totalExperiancePrice}
               setTotalExperiancePrice={setTotalExperiancePrice}
               title="Attraction For Adults"
               price="₹ 150"
               no_adult={persons.adults}
               no_children={persons.children}
               description="Per Person"
               type="adults"
               selectedPackage={selectedPackage}
               selectedExperiences={selectedExperiences}
               setSelectedExperiences={setSelectedExperiences}
             />
             <AttractionCard
               totalExperiancePrice={totalExperiancePrice}
               setTotalExperiancePrice={setTotalExperiancePrice}
               title="Attraction For Children"
               price="Free"
               no_adult={persons.adults}
               no_children={persons.children}
               description="Children under 6yr"
               type="children"
               selectedPackage={selectedPackage}
               selectedExperiences={selectedExperiences}
               setSelectedExperiences={setSelectedExperiences}
             />
           </div>
          )}
          <TicketSummary
            totalPrice={totalPrice}
            handlePayment={handlePayment}
            selectedPackageName={selectedPAckageName}
            selectedTimeSlot={selectedTimeSlot}
            selectedTimeSlotString={selectedTimeSlotString}
            visitingDate={visitingDate}
            adults={persons.adults}
            children={persons.children}
            totalExperiancePrice={totalExperiancePrice}
            setTotalExperiancePrice={setTotalExperiancePrice}
          />
          {/* {error && <div className="text-red-500 mt-4">{error}</div>} */}
        </>
      ) : (
        <div className="flex flex-col">
          <div className="w-full p-4 bg-white shadow-lg rounded-lg mb-4">
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
          />
        </div>
      )}
    </div>
  );
}

export default ThirdPage;
