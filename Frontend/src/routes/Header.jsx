import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Input,
} from "@material-tailwind/react";

import "../index.css";

export default function Header({ onLogout, setSearchTerm }) {
  const navigate = useNavigate();
  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const user = useSelector(selectUser);

  useEffect(() => {
    // Update local state when Redux state changes
  }, [user]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex items-center justify-center lg:self-auto">
        <Input
          label="Search"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          }
          className="mx-auto" // Add this class to center the input
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>
    </ul>
  );

  return (
    <div className="max-h-[768px]  overflow-hidden ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className=" cursor-pointer py-1.5 font-medium"
            onClick={() => navigate("/")}
          >
            Hostea
          </Typography>
          <div className="hidden ml-[8rem] lg:block">{navList}</div>
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-x-1">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={() => navigate("/Login")}
                >
                  <span>Log In</span>
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={() => navigate("/Form")}
                >
                  <span>Sign in</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={() => navigate("/Profile")}
                >
                  <span>Profile</span>
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={() => {
                    navigate("/Login");
                    onLogout();
                  }}
                >
                  <span>Logout</span>
                </Button>
              </div>
            )}

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
