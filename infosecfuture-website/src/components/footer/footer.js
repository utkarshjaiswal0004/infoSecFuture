import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="d-flex mx-5 my-3">
          <Col md={7} sm={12} className="text-md-start text-center">
            <h3>
              Lorem ipsum dolor sit amet consectetur. Porttitor pharetra at
              pharetra id i
            </h3>
          </Col>

          <Col md={5} sm={12} className="text-md-end text-center my-2">
            <Button className="px-3 py-2 getInTouch">Get In Touch</Button>
          </Col>
        </Row>

        <Row className="d-flex centerData py-5 px-5">
          <Col lg={3} sm={12} className="text-center">
            <img
              src="./logo_white.svg"
              alt="infoSecFuture"
              className="img-fluid mb-3"
            />
            <p>Follow Us</p>
            <div className="social-links mb-5 mb-lg-auto">
              <Link href="#">
                <FaFacebook className="social-icon" />
              </Link>
              <Link href="#">
                <FaTwitter className="social-icon mx-3" />
              </Link>
              <Link className="social-icon" href="#">
                <FaInstagram />
              </Link>
            </div>
          </Col>

          <Col lg={4} md={12} sm={12} className="text-lg-start text-center mb-5 mb-lg-auto ">
            <Row>
              <Col md={4}  sm={12} className="mb-5 mb-md-auto">
                <h5 className="mb-3">Company</h5>
                <p className="info-link">About Us</p>
                <p className="info-link">Jobs</p>
                <p className="info-link">Careers</p>
              </Col>
              <Col  md={4}  sm={12} className="mb-5 mb-md-auto">
                <h5 className="mb-3">Product</h5>
                <p className="info-link">Candidates</p>
                <p className="info-link">Employer</p>
                <p className="info-link">Recruiter</p>
              </Col>
              <Col  md={4}  sm={12}  className="">
                <h5 className="mb-3">More</h5>
                <p className="info-link">Account</p>
                <p className="info-link">User guides</p>
                <p className="info-link">Webinars</p>
              </Col>
            </Row>
          </Col>

          <Col
            lg={5}
            sm={12}
            className="text-lg-start text-center mx-auto px-lg-3"
          >
            <h3>Subscribe Our Newsletter</h3>
            <p>
              Be the first one to know about discounts, offers and events
              Unsubscribe whenever you like.
            </p>
            <div className="search-container d-flex flex-sm-row flex-column">
              <input
                type="text"
                className="search-box"
                placeholder="Enter your email"
              />
              <button type="button" className="search-button">
                Subscribe now
              </button>
            </div>
          </Col>
        </Row>
        <Row className="d-flex mx-5 mt-3 mb-0">
          <Col md={6} sm={12} className="text-md-start text-center ">
            <p className="small-text">
              &copy; {new Date().getFullYear()} All Copyright received
            </p>
          </Col>

          <Col md={6} sm={12} className="text-md-end text-center ">
            <Row>
              <p>Privacy | Term & Condition</p> 
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
