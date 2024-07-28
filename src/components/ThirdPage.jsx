import React from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

function AttractionCard({ title, price, description, attractions }) {
  return (
    <Card className="flex-1 m-4 ">
      <div className="">
        <div className="bg-[#287D74] w-full h-[120px] relative">
          <Typography
            variant="h5"
            className="font-bold text-center text-white pt-3"
          >
            {title}
          </Typography>
          <div className="flex justify-center items-center my-4 absolute w-[140px] h-[140px] bg-[#287D74] p-5 rounded-[50%] left-[26%] border-4 border-white shadow-lg">
            <div className="text-center ">
              <Typography variant="h4" className="font-bold text-white">
                {price}
              </Typography>
              <Typography className="text-white">{description}</Typography>
            </div>
          </div>
        </div>
        <div className="divide-y mt-[60px] p-4">
          {attractions.map((section, index) => (
            <div key={index} className="py-2">
              <Typography variant="h6" className="font-bold">
                {section.title}
              </Typography>
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" />
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

function TicketSummary() {
  return (
    <Card className="flex-1 m-4 p-4">
      <CardContent>
        <Typography variant="h6" className="font-bold">
          Your Ticket Summary
        </Typography>
        <Typography variant="body1">Zoo Safari</Typography>
        <Typography variant="body2" className="mt-2">
          Zoo Safari Entry Ticket ₹150 x 1 Adults = ₹150
        </Typography>
        <Typography variant="body2">Number of Visitors: 2 Person</Typography>
        <Typography variant="body2">Date of Visiting: 8 June 2024</Typography>
        <Typography variant="body2">Visiting Time: 09:00 AM</Typography>
        <Typography variant="h6" className="font-bold mt-4">
          Total Price: ₹150
        </Typography>
        <Button
          sx={{ textTransform: "none" }}
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
}

function ThirdPage() {
  const adultAttractions = [
    {
      title: "Safari Experience",
      items: [
        "Herbivore Safari",
        "Bear Safari",
        "Leopard Safari",
        "Tiger Safari",
        "Lion Safari",
      ],
    },
    {
      title: "Wildlife Observation",
      items: ["Aviary", "Butterfly Park"],
    },
    {
      title: "Educational and Interpretive",
      items: ["Interpretation Centre"],
    },
    {
      title: "Recreational and Entertainment",
      items: ["180-Degree Theatre"],
    },
  ];

  const childrenAttractions = [
    {
      title: "Recreational and Entertainment",
      items: ["180-Degree Theatre"],
    },
    {
      title: "Wildlife Observation",
      items: ["Aviary", "Butterfly Park"],
    },
    {
      title: "Educational and Interpretive",
      items: ["Interpretation Centre"],
    },
  ];

  return (
    <div className="flex flex-col md:px-[20px] xl:px-[200px] md:flex-row justify-center items-start p-4 bg-gray-100 mt-16">
      <AttractionCard
        title="Attraction For Adults"
        price="₹ 150"
        description="Per Person"
        attractions={adultAttractions}
      />
      <AttractionCard
        title="Attraction For Children"
        price="Free"
        description="children under 6yr"
        attractions={childrenAttractions}
      />
      <TicketSummary />
    </div>
  );
}
export default ThirdPage;
