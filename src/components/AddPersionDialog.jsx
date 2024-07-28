import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddPersionDialog = ({
  isOpen,
  onClose,
  selectedAdults,
  setSelectedAdults,
  selectedChildren,
  setSelectedChildren,
  selectedInfants,
  setSelectedInfants,
  configurations,
  setNotificationTitle,
  setNotificationBody,
  setNotificationType,
  shownotiftion,
}) => {
  if (!isOpen) return null;

  const handleSelectNumber = (type, number) => {
    switch (type) {
      case "adults":
        setSelectedAdults(number);
        break;
      case "children":
        setSelectedChildren(number);
        break;
      case "infants":
        setSelectedInfants(number);
        break;
      default:
        break;
    }
  };
  // console.log({ selectedChildren, selectedAdults, selectedInfants });
  const handleApply = () => {
    if (selectedAdults === null || selectedAdults < 1) {
      return;
    } else {
      setNotificationTitle("Success!");
      setNotificationBody(
        `Selected numbers: Adults - ${selectedAdults}, Children - ${
          selectedChildren || 0
        }, Infants - ${selectedInfants || 0}`
      );
      setNotificationType("success");
      shownotiftion();
      onClose();

      // alert(
      //   `Selected numbers: Adults - ${selectedAdults}, Children - ${
      //     selectedChildren || 0
      //   }, Infants - ${selectedInfants || 0}`
      // );
    }
  };
  // console.log(configurations);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <div className="absolute top-2 right-2">
          <IconButton
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="ticket-info space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              ADULTS ({configurations.max_age_child}y+)
            </h3>
            <div className="mt-2">
              <div className="font-medium">On the day of Visit</div>
              <div className="flex space-x-2 mt-1">
                {Array.from({ length: configurations.no_of_adults }, (_, i) => (
                  <span
                    key={i + 1}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      selectedAdults === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleSelectNumber("adults", i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              CHILDREN ({configurations.min_age_child}y -{" "}
              {configurations.max_age_child}y)
            </h3>
            <div className="mt-2">
              <div className="font-medium">On the day of Visit</div>
              <div className="flex space-x-2 mt-1">
                {Array.from(
                  { length: configurations.no_of_child + 1 },
                  (_, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded cursor-pointer ${
                        selectedChildren === i
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleSelectNumber("children", i)}
                    >
                      {i}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">INFANTS (below 2y)</h3>
            <div className="mt-2">
              <div className="font-medium">On the day of Visit</div>
              <div className="flex space-x-2 mt-1">
                {Array.from(
                  { length: configurations.no_of_infants + 1 },
                  (_, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded cursor-pointer ${
                        selectedInfants === i
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleSelectNumber("infants", i)}
                    >
                      {i}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="note mt-4">
            <p className="text-sm text-gray-600">
              Below 2 years of age, no separate entry ticket is necessary.
            </p>
            <p className="text-sm text-gray-600">
              No child below six years, will be allowed in Glass Skywalk. Hence,
              No separate ticket will be issued for Package 1.
            </p>
          </div>
          <p
            className={`mt-4 w-fit ${
              selectedAdults ? "bg-blue-500 text-white" : "bg-gray-300"
            } px-4 py-2 rounded hover:bg-blue-600 cursor-pointer`}
            onClick={handleApply}
          >
            Apply
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddPersionDialog;
