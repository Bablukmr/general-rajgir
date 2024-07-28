import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub"; // Assuming you have this icon
import { useSelector } from "react-redux";

function Footer() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <footer
      className={`${
        isAuthenticated ? "hidden" : "block"
      } w-full bg-gradient-to-r from-green-900 to-blue-900 text-white py-4 md:px-[20px] xl:px-[200px]`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <img src="/logo.png" alt="Logo" width={150} className="mb-4 md:mb-0" />
        <div className="text-center">
          <p className="text-[12px] md:text-[15px]">
            Copyright © 2024 All Rights Reserved | Rajgir Zoo Safari & Nature
            Safari
          </p>
          <p className="text-[12px] md:text-[15px]">
            Designed, Developed & Maintained By Fillip Technologies
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <IconButton aria-label="Facebook">
            <FacebookIcon className="text-[#C5C5C7] hover:text-white" />
          </IconButton>
          <IconButton aria-label="Twitter">
            <TwitterIcon className="text-[#C5C5C7] hover:text-white" />
          </IconButton>
          <IconButton aria-label="Instagram">
            <InstagramIcon className="text-[#C5C5C7] hover:text-white" />
          </IconButton>
          <IconButton aria-label="LinkedIn">
            <LinkedInIcon className="text-[#C5C5C7] hover:text-white" />
          </IconButton>
          <IconButton aria-label="GitHub">
            <GitHubIcon className="text-[#C5C5C7] hover:text-white" />
          </IconButton>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
