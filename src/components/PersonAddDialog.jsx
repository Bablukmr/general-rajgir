import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const PersonAddDialog = ({
  persons,
  setPersons,
  openPersonDialog,
  onClose,
  configurations,
}) => {
  const handleTravellerChange = (type, value) => {
    setPersons((prev) => ({ ...prev, [type]: value }));
  };

  // Provide default values if configurations are undefined
  const noOfAdults = configurations?.no_of_adults ?? 0;
  const noOfChildren = configurations?.no_of_child ?? 0;
  const noOfInfants = configurations?.no_of_infants ?? 0;
  const minAgeChild = configurations?.min_age_child ?? 2;
  const maxAgeChild = configurations?.max_age_child ?? 12;

  return (
    <Dialog open={openPersonDialog} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Person</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <div>
            <div className="font-bold">ADULTS (12y+)</div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3  mt-2">
              {[...Array(noOfAdults).keys()].map((n) => (
                <Button
                  sx={{ textTransform: "none" }}
                  key={n + 1}
                  variant={persons.adults === n + 1 ? "contained" : "outlined"}
                  onClick={() => handleTravellerChange("adults", n + 1)}
                >
                  {n + 1}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold">
              CHILDREN ({minAgeChild}-{maxAgeChild}y)
            </div>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3  mt-2">
              {[...Array(noOfChildren + 1).keys()].map((n) => (
                <Button
                  sx={{ textTransform: "none" }}
                  key={n}
                  variant={persons.children === n ? "contained" : "outlined"}
                  onClick={() => handleTravellerChange("children", n)}
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold">INFANTS (below 2y)</div>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3 mt-2">
              {[...Array(noOfInfants + 1).keys()].map((n) => (
                <Button
                  sx={{ textTransform: "none" }}
                  key={n}
                  variant={persons.infants === n ? "contained" : "outlined"}
                  onClick={() => handleTravellerChange("infants", n)}
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: "none" }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          onClick={onClose}
          color="primary"
          variant="contained"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonAddDialog;
