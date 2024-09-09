import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";

function AttractionCard({
  selectedPackage,
  type, // "adults" or "children"
  title,
  no_adult,
  no_children,
  totalExperiancePrice,
  setTotalExperiancePrice,
  selectedExperiences,
  setSelectedExperiences,
}) {
  // console.log(selectedExperiences,"@selectedExperiences");
  
  const [counters, setCounters] = useState({});
  const [dynamicPriceAdults, setDynamicPriceAdults] = useState(0);
  const [dynamicPriceChildren, setDynamicPriceChildren] = useState(0);
  const [fixedPriceAdults, setFixedPriceAdults] = useState(0);
  const [fixedPriceChildren, setFixedPriceChildren] = useState(0);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (selectedPackage) {
      resetState();
      fetchData();
    }
  }, [selectedPackage]);

  const resetState = () => {
    setDynamicPriceAdults(0);
    setDynamicPriceChildren(0);
    setFixedPriceAdults(0);
    setFixedPriceChildren(0);
    setCounters({});
    setSelectedExperiences({
      adults: [],
      children: [],
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://zoo-api.nextindiainitiative.com/public/api/v1/activities-list?api_key=CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN&package_id=${selectedPackage}`
      );
      const data = response.data;
      if (data.status) {
        setData(data.data);
        calculateFixedPrices(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateFixedPrices = (activities) => {
    let totalFixedPriceAdults = 0;
    let totalFixedPriceChildren = 0;
    let fixedExperiencesAdults = [];
    let fixedExperiencesChildren = [];

    activities.forEach((activity) => {
      if (activity.price_fixed) {
        totalFixedPriceAdults += no_adult * activity.adult_price;
        totalFixedPriceChildren += no_children * activity.child_price;

        if (no_adult > 0) {
          fixedExperiencesAdults.push({
            experience: activity.activities_name,
            price: activity.adult_price,
            count: no_adult,
          });
        }
        if (no_children > 0) {
          fixedExperiencesChildren.push({
            experience: activity.activities_name,
            price: activity.child_price,
            count: no_children,
          });
        }
      }
    });

    setFixedPriceAdults(totalFixedPriceAdults);
    setFixedPriceChildren(totalFixedPriceChildren);

    setSelectedExperiences((prev) => ({
      adults: [...prev.adults, ...fixedExperiencesAdults],
      children: [...prev.children, ...fixedExperiencesChildren],
    }));

    setTotalExperiancePrice(totalFixedPriceAdults + totalFixedPriceChildren);
  };

  const handleAdd = (activity, isAdult) => {
    const key = `${activity.id}-${isAdult ? "adult" : "child"}`;
    const currentCount = counters[key] || 0;
    const maxLimit = isAdult ? no_adult : no_children;
    const price = isAdult ? activity.adult_price : activity.child_price;

    if (currentCount < maxLimit) {
      updateCounter(key, currentCount + 1);
      updatePriceAndExperiences(activity, price, isAdult, "add");
    }
  };

  const handleRemove = (activity, isAdult) => {
    const key = `${activity.id}-${isAdult ? "adult" : "child"}`;
    const currentCount = counters[key] || 0;
    const price = isAdult ? activity.adult_price : activity.child_price;

    if (currentCount > 0) {
      updateCounter(key, currentCount - 1);
      updatePriceAndExperiences(activity, price, isAdult, "remove");
    }
  };

  const updateCounter = (key, value) => {
    setCounters({ ...counters, [key]: value });
  };

  const updatePriceAndExperiences = (activity, price, isAdult, action) => {
    const setDynamicPrice = isAdult
      ? setDynamicPriceAdults
      : setDynamicPriceChildren;
    const dynamicPrice = isAdult ? dynamicPriceAdults : dynamicPriceChildren;
    const experienceType = isAdult ? "adults" : "children";

    if (action === "add") {
      setDynamicPrice(dynamicPrice + price);
    } else if (action === "remove") {
      setDynamicPrice(dynamicPrice - price);
    }

    setSelectedExperiences((prev) => {
      const updatedList = updateExperienceList(
        prev[experienceType],
        activity.activities_name,
        price,
        action
      );
      return { ...prev, [experienceType]: updatedList };
    });
  };

  const updateExperienceList = (list, experienceName, price, action) => {
    const existingExperience = list.find(
      (exp) => exp.experience === experienceName
    );

    if (action === "add") {
      if (existingExperience) {
        existingExperience.count += 1;
      } else {
        list.push({ experience: experienceName, price, count: 1 });
      }
    } else if (action === "remove" && existingExperience) {
      existingExperience.count -= 1;
      if (existingExperience.count <= 0) {
        return list.filter((exp) => exp.experience !== experienceName);
      }
    }
    return [...list];
  };

  useEffect(() => {
    const totalDynamicPrice = dynamicPriceAdults + dynamicPriceChildren;
    setTotalExperiancePrice(
      fixedPriceAdults + fixedPriceChildren + totalDynamicPrice
    );
  }, [
    dynamicPriceAdults,
    dynamicPriceChildren,
    fixedPriceAdults,
    fixedPriceChildren,
  ]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex w-full md:w-[50%]  flex-col rounded-md gap-1 bg-white shadow-md">
      <Accordion expanded={expanded} onChange={handleChange("panel")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Typography className="text-lg font-medium">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data
            .filter((activity) =>
              type === "children" ? activity.child_allowed : true
            )
            .map((activity, index) => {
              const adultKey = `${activity.id}-adult`;
              const childKey = `${activity.id}-child`;
              const adultCount = counters[adultKey] || 0;
              const childCount = counters[childKey] || 0;

              // Calculate total price for this activity
              const totalPriceFixed = activity.price_fixed
                ? no_adult * activity.adult_price +
                  no_children * activity.child_price
                : 0;
              const totalPriceDynamic = activity.price_fixed
                ? 0
                : type === "adults"
                ? adultCount * activity.adult_price
                : childCount * activity.child_price;
              const totalPrice = totalPriceFixed + totalPriceDynamic;

              return (
                <div
                  key={index}
                  className={clsx(
                    "flex w-full flex-col lg:flex-row  gap-2 py-2 border-b border-gray-300 items-center",
                    index % 2 === 0 ? "bg-gray-200" : "bg-white"
                  )}
                >
                  {/* Activity Name and Info */}
                  <div className="w-full lg:w-[45%] flex items-center">
                    <Tooltip title={activity.description}>
                      <IconButton size="small">
                        <InfoIcon style={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body1">
                      {activity.activities_name}
                    </Typography>
                  </div>

                  {/* Price and Counter */}
                  <div className="w-[55%] flex items-center justify-end pr-2">
                    {activity.price_fixed ? (
                      <>
                        <Typography className="text-[#2E9325] text-lg font-semibold">
                          ₹
                          {type === "children"
                            ? activity.child_price
                            : activity.adult_price}
                        </Typography>
                        {/* <Typography className="text-lg font-semibold">
                          Total: ₹{totalPriceFixed}
                        </Typography> */}
                        {/* tool */}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <Typography className="text-[#2E9325] text-lg font-semibold">
                            ₹
                            {type === "children"
                              ? activity.child_price
                              : activity.adult_price}
                          </Typography>
                          {type === "adults" && (
                            <div className="flex items-center gap-[5px]">
                              <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                className="min-w-0 p-[1px]"
                                onClick={() => handleRemove(activity, true)}
                              >
                                <RemoveIcon fontSize="small" />
                              </Button>
                              <Typography
                                variant="body1"
                                className="border-2 w-12 px-[1px] h-7 flex items-center justify-center rounded-md"
                              >
                                {adultCount}
                              </Typography>
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                className="min-w-0 p-[1px]"
                                onClick={() => handleAdd(activity, true)}
                              >
                                <AddIcon fontSize="small" />
                              </Button>
                            </div>
                          )}

                          {type === "children" &&
                            activity.child_allowed === 1 && (
                              <div className="flex items-center gap-[5px]">
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  className="min-w-0 p-[1px]"
                                  onClick={() => handleRemove(activity, false)}
                                >
                                  <RemoveIcon fontSize="small" />
                                </Button>
                                <Typography
                                  variant="body1"
                                  className="border-2 w-12 px-[1px] h-7 flex items-center justify-center rounded-md"
                                >
                                  {childCount}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  className="min-w-0 p-[1px]"
                                  onClick={() => handleAdd(activity, false)}
                                >
                                  <AddIcon fontSize="small" />
                                </Button>
                              </div>
                            )}
                        </div>
                        {/* <Typography className="text-lg font-semibold">
                          Total: ₹{totalPriceDynamic}
                        </Typography> */}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AttractionCard;
