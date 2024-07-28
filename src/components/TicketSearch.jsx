import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import ReactToPrint from "react-to-print";
import BookingInfo from "./PrintTicketGenaral";
import Loadings from "./Loading";

const Container = styled(Box)({
  padding: "2rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "0.5rem",
  boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
});

const SearchBox = styled(Box)({
  backgroundColor: "#343a40",
  padding: "1.5rem",
  borderRadius: "0.5rem",
  marginBottom: "2rem",
  boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
});

const SearchInput = styled(TextField)({
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  marginRight: "1rem",
});

const StyledTable = styled(Table)({
  minWidth: 650,
  "& .MuiTableCell-head": {
    backgroundColor: "#343a40",
    color: "#fff",
  },
  "& .MuiTableCell-body": {
    fontSize: "0.875rem",
  },
  "& .MuiTableRow-root:hover": {
    backgroundColor: "#f1f1f1",
  },
});

const ActionButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

function TicketSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const printRef = useRef();
  const [particularTicketData, setParticularTicketData] = useState(null);
  const [blankData, setBlankData] = useState(false);
  const ticketSectionRef = useRef(null); // Ref for ticket section

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setParticularTicketData(null);
    setBlankData(false); // Reset blankData state on new search

    try {
      const response = await axios.post(
        `https://zoo-api.nextindiainitiative.com/public/api/v1/search-ticket?api_key=CHANlBUoAGBjMyLch1GIh3MXW5Ga8e9pji0dPFO2dkDODAN&search_key=${searchKey}`
      );
      if (response.data.data.length === 0) {
        setBlankData(true);
      } else {
        setTickets(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (ticket) => {
    setParticularTicketData(ticket?.booking_json_data);
  };

  // Use effect to scroll into view when particularTicketData is updated
  useEffect(() => {
    if (particularTicketData && ticketSectionRef.current) {
      ticketSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [particularTicketData]);

  return (
    <Container className="mx-auto w-full md:w-[80%] min-h-screen">
      <h1 className="text-xl font-bold text-center w-full mt-10 mb-4 leading-tight">
        Download Your Ticket

        {/* <span className="inline-block text-blue-500">D</span>
        <span className="inline-block text-green-500">o</span>
        <span className="inline-block text-red-500">w</span>
        <span className="inline-block text-yellow-500">n</span>
        <span className="inline-block text-purple-500">l</span>
        <span className="inline-block text-pink-500">o</span>
        <span className="inline-block text-indigo-500">a</span>
        <span className="inline-block text-teal-500 mr-1">d</span>
        <span className="inline-block text-orange-500 ">Y</span>
        <span className="inline-block text-cyan-500">o</span>
        <span className="inline-block text-lime-500">u</span>
        <span className="inline-block text-fuchsia-500 mr-1">r</span>
        <span className="inline-block text-amber-500 ">T</span>
        <span className="inline-block text-emerald-500">i</span>
        <span className="inline-block text-rose-500">c</span>
        <span className="inline-block text-sky-500">k</span>
        <span className="inline-block text-violet-500">e</span>
        <span className="inline-block text-indigo-500">t</span> */}
      </h1>

      <SearchBox className="w-full md:ml-[15%] md:w-[70%]">
        <p className=" text-white text-lg font-medium pt-1 rounded-md shadow-lg mb-3">
          Enter Booking ID, Mobile No, Email
        </p>

        <form className="flex items-center" onSubmit={handleSearch}>
          <SearchInput
            size="small"
            variant="outlined"
            placeholder="Enter Booking Id, Mobile No., Email"
            fullWidth
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="ml-4"
          >
            Search
          </Button>
        </form>
      </SearchBox>

      {loading ? (
        <Loadings />
      ) : blankData ? (
        <Typography
          variant="h6"
          component="p"
          className="text-center text-red-500 mt-4"
        >
          Sorry !! There is no any booking.
        </Typography>
      ) : (
        tickets.length > 0 && (
          <TableContainer component={Paper} className="mt-4 w-full">
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.No.</TableCell>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Booking Info</TableCell>
                  <TableCell>Contact Info</TableCell>
                  <TableCell>Visiting Info</TableCell>
                  <TableCell>Total Person</TableCell>
                  <TableCell>Total Amount(INR)</TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket, index) => {
                  const bookingInfo =
                    ticket?.booking_json_data?.booking_info || {};
                  const transaction =
                    ticket?.booking_json_data?.transaction || {};
                  const totalPersons =
                    ticket?.booking_json_data?.total_person || [];

                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {bookingInfo.order_id}
                        <br />
                        Txn Id -{" "}
                        <span className="text-red-500">
                          {bookingInfo.email_id}
                        </span>
                        <br />
                        UTR Id - {transaction.utr_id}
                        <br />
                        Status -{" "}
                        <span className="text-red-500">
                          {transaction.payment_status}
                        </span>
                        <br />
                        <ActionButton
                          variant="contained"
                          onClick={() => handleDownload(ticket)}
                        >
                          Download
                        </ActionButton>
                      </TableCell>
                      <TableCell>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Sl.No.</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Gender</TableCell>
                            </TableRow>
                            {totalPersons.map((person, personIndex) => (
                              <TableRow key={personIndex}>
                                <TableCell>{personIndex + 1}</TableCell>
                                <TableCell>{person.full_name}</TableCell>
                                <TableCell>{person.gender}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        {bookingInfo.email_id}
                        <br />
                        {bookingInfo.contact_number}
                      </TableCell>
                      <TableCell>
                        Date - {bookingInfo.visting_date}
                        <br />
                        Timing - {bookingInfo.visting_time}
                      </TableCell>
                      <TableCell>
                        Adults - {bookingInfo.no_of_adults}
                        <br />
                        Childs - {bookingInfo.no_of_childs}
                      </TableCell>
                      <TableCell>{transaction.total_amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </TableContainer>
        )
      )}

      {particularTicketData && (
        <Box id="ticket" ref={ticketSectionRef} className="flex flex-col mt-4">
          <Box className="w-full p-4 bg-white shadow-lg rounded-lg mb-4">
            <BookingInfo ref={printRef} data={particularTicketData} />
          </Box>
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
        </Box>
      )}
    </Container>
  );
}

export default TicketSearch;
