import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TicketLayout from "./TicketBooking/TicketLayout";
import Header from "./components/Header";
import Footer from "./components/footer";
import { checkAuth } from "./redux/authSlice";
import TicketSearch from "./components/TicketSearch";
import Zooinfo from "./components/page/About";
import Howtoreach from "./components/page/Howtoreach";
import MoreinfoPackage from "./components/page/moreinfoPackage";
import TermAndCondition from "./components/page/TermAndCondition";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      {/* <SafariBanner />*/}
      <Routes>
        <Route path="/*" element={<TicketLayout />} />
        <Route path="/aboutus/zooinfo" element={<Zooinfo />} />
        <Route path="/aboutus/natureinfo" element={<Zooinfo />} />
        <Route path="/howtoreach" element={<Howtoreach />} />
        <Route path="/moreinfo" element={<MoreinfoPackage />} />
        <Route path="/t&c" element={<TermAndCondition />} />
        {!isAuthenticated && (
          <Route path="/downloadticket" element={
            <div className="w-screen">
              <TicketSearch />
            </div>
          } />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
