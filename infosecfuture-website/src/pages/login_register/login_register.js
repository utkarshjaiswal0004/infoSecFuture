import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

import { css } from "@emotion/react"; // Import css from react-spinners
import { ClipLoader } from "react-spinners";
import { registerUserWithEmail, loginWithEmail } from "../../service/api";
import "./login_register.css";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function LoginRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    emailLogin: "",
    passwordLogin: "",
  });

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLogin = searchParams.get('isLogin') === 'true' ? true : false;

 

  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };
  const toggleShowLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      toast.error(`Passwords do not match!`, { position: toast.POSITION.BOTTOM_CENTER });
       
    } else if (!isValidEmail(formData.email)) {

      toast.error(`Invalid email format!`, { position: toast.POSITION.BOTTOM_CENTER }); 
    } else if(formData.password.length < 8) {
 
      toast.error(`Password is shorter than 8 letters!`, { position: toast.POSITION.BOTTOM_CENTER }); 
    }else {
      setRegisterLoading(true);
      
          const registrationData = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          };
        
          try {
            const response = await registerUserWithEmail(registrationData);
      
            if (response.success) {
              // Reset the form
              setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "",
                emailLogin: "",
                passwordLogin: "",
              });
      
              // Redirect to the home page
              navigate("/");
      
              toast.success("Registration Successful. Kindly check your mail for email verification.", { position: toast.POSITION.TOP_CENTER });
            } else {
              // Show an error message
              toast.error(`Registration Failed: ${response.message}`, { position: toast.POSITION.BOTTOM_CENTER });
            }
          } catch (error) {
            // Show an error message
            toast.error(`Registration Error: ${error.message}`, { position: toast.POSITION.BOTTOM_CENTER });
          } finally {
            // Hide the loading indicator on the Register button
            setRegisterLoading(false);
          }
        
    
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.emailLogin)) {
      toast.error(`Invalid email format!`, { position: toast.POSITION.BOTTOM_CENTER }); 
    } else if(formData.passwordLogin.length < 8) {
      toast.error(`Password is shorter than 8 letters!`, { position: toast.POSITION.BOTTOM_CENTER }); 
    }else {
      setLoginLoading(true);
      
          const loginData = {
            email: formData.emailLogin,
            password: formData.passwordLogin,
          };

        
          try {
            const response = await loginWithEmail(loginData);
      
            if (response.success) {
              // Reset the form
              setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "",
                emailLogin: "",
                passwordLogin: "",
              });
      
              // Redirect to the home page
              navigate("/");
      
              toast.success(`Login Successful . Welcome back ${response.userData.full_name}.`, { position: toast.POSITION.TOP_CENTER });
            } else {
              // Show an error message
              toast.error(`Registration Failed: ${response.message}`, { position: toast.POSITION.BOTTOM_CENTER });
            }
          } catch (error) {
            // Show an error message
            toast.error(`Registration Error: ${error.message}`, { position: toast.POSITION.BOTTOM_CENTER });
          } finally {
            // Hide the loading indicator on the Register button
            setLoginLoading(false);
          }
        
    
    }
  };

  return (
    <Container>
      <Row className="mx-md-5 mx-1 my-5">
        <Col md={7} xs={12} className={isLogin ? "order-1  d-md-flex align-items-center d-none" : "order-0"}>
          {/* Registration Form */}
          <Form onSubmit={handleRegistrationSubmit}>
            <h5>Register today.</h5>
            <Row className="mt-md-5 mt-3">
              <Col md={6} xs={12} className="mb-md-5 mb-3">
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12} className="mb-md-5 mb-3">
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col> 
              <Col md={6} xs={12} className="mb-md-5 mb-3">
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showRegisterPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text
                      onClick={toggleShowRegisterPassword}
                      className="password-toggle"
                    >
                      {showRegisterPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}  className="mb-md-5 mb-3">
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text
                      onClick={toggleShowConfirmPassword}
                      className="password-toggle"
                    >
                      {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="role" className="mb-md-5 mb-3">
              <div className="d-md-flex">
                <Form.Label>Register As</Form.Label>
                <Form.Check 
                  className="radio-btn"
                  type="radio"
                  label="Job Seeker"
                  name="role"
                  value="jobseeker"
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  className="radio-btn"
                  type="radio"
                  label="Recruiter"
                  name="role"
                  value="recruiter"
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  className="radio-btn"
                  type="radio"
                  label="Employer"
                  name="role"
                  value="employer"
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
           
            <div className= "mb-4 text-center text-md-left  d-md-flex justify-content-md-between"  >
             { !registerLoading ? <Button variant="primary" type="submit" className={`form-btn ${!isLogin ? "col-10 col-md-auto" : ""}`}>
                Register
              </Button> :
              <ClipLoader css={override} size={50} color={"#123abc"} loading={registerLoading} />
           
              } </div>

           </Form>
        </Col>
        <Col md={1} xs={12} className={(isLogin)  ? "d-none" : "d-md-flex align-items-center d-none"}>
          <div className="vertical-divider"></div>
        </Col>

        <Col md={4} xs={12} className={isLogin ? "order-0" : "order-1  d-md-flex align-items-center d-none"}>
          {/* Login Form */}
          <Form onSubmit={handleLoginSubmit}>
            <h5 className="d-flex justify-content-center">Already Registered?</h5>
            <h5 className="d-flex justify-content-center">Login into your Account</h5>
            <Form.Group controlId="emailLogin" className="mt-md-5 my-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="emailLogin"
                value={formData.emailLogin}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="passwordLogin" className="my-md-5 my-3 ">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showLoginPassword ? "text" : "password"}
                  name="passwordLogin"
                  value={formData.passwordLogin}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text
                  onClick={toggleShowLoginPassword}
                  className="password-toggle"
                >
                  {showLoginPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <div className= "mb-4 text-center text-md-left  d-md-flex justify-content-md-between" >
              { !loginLoading ? <Button variant="primary" type="submit" className={ `form-btn ${isLogin ? "col-10 col-md-auto" : ""}`}>
                Login
              </Button> : 
              <ClipLoader css={override} size={50} color={"#123abc"} loading={loginLoading} />
              }
            </div>
          </Form>
        </Col>
        <Col md={1} xs={12} className=  {!isLogin ? "d-none" : "d-md-flex align-items-center d-none"}>
          <div className="vertical-divider"></div>
        </Col>

        <Col md={1} xs={12} className="d-md-none align-items-center d-flex mt-2 text-center">
          {!isLogin ? <p className="col-12">Already have an account? &nbsp;
          <Link
                to="/login-signup?isLogin=true"
              >
                Login
              </Link> 
          </p>
:
          <p className="col-12">Don't have an account?  &nbsp;
          <Link
                to="/login-signup?isLogin=false"
              >
                Sign Up
              </Link> 
          </p>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default LoginRegistrationForm;
