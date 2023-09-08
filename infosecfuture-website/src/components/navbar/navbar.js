import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./navbar.css";

let navLinks = [
  {
    text: "For Employer",
    url: "/",
  },
  {
    text: "For Recruiter",
    url: "/",
  },
  {
    text: "For JobSeeker",
    url: "/",
  },
  {
    text: "About Us",
    url: "/",
  },
  {
    text: "FAQ's",
    url: "/",
  },
];

function CustomNavbar() {
  const [navActive, setNavActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); 


  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeMenu = () => {
    setNavActive(false);
  };

  
  useEffect(() => {
    // Check if there is a token in localStorage whenever the route changes
    const token = localStorage.getItem("token");
    if (token && token !== "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); 

  useEffect(() => {
    const handleResize = () => {

        if (window.innerWidth >= 500) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }

      if (window.innerWidth <= 500) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu();
    }
  }, []);

   // Function to handle logout
   const handleLogout = () => {
    localStorage.removeItem("token");
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={`navbar my-2 ${isMobile ? "active-mobile" : ""}`}
      >
        <Container>
          <Navbar.Brand>
            <img src="./logo.png" alt="infoSecFuture" className="img-fluid" />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${isMobile}`} 
            onClick={toggleNav}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${isMobile}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${isMobile}`}
            placement="end"
            className= {`${isMobile? "my-4" :""}`}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${isMobile}`}>
                <img src="./logo.png" alt="infoSecFuture" className="img-fluid center" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            {isMobile &&
            <hr className="divider-line d-md-none" />}
            <Offcanvas.Body>
              <Nav className="d-flex justify-content-center w-100">
                {navLinks.map((link, index) => (
                  <Link
                    className="mx-3  gray-link"
                    key={index}
                    to={link.url}
                    onClick={closeMenu}
                  >
                    {link.text}
                  </Link>
                ))}
              </Nav>
              {isLoggedIn ? (
                // Show Logout button if user is logged in
                <button 
                    className="btn register" onClick={handleLogout}>
                  Logout
                </button>
                
              ) : (
                // Show Login and Register buttons if user is not logged in
                <>
                  <Link
                    to="/login-signup?isLogin=true"
                    className="btn login mx-1"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/login-signup?isLogin=false"
                    className="btn register"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>)
                }
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
