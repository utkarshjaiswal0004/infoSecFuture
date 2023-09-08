import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './hero_section.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Container>
        <Row className='my-auto'>
          <Col lg={7} md={7} sm={12} className='my-auto'>
            <div className="hero-content text-md-start text-center">
              <h1>DISCOVER TOP TALENT</h1>
              <h3>AI Powered Talent Solution.</h3>
              <p>Unlock top- tier candidates matched to you specific needs effortlessly with our AI driven platform. Streamlined hiring, expectational result. </p>
              <Button className='hire-btn' variant="primary">Hire with AI Precision</Button>
            </div>
          </Col>
          <Col lg={5} md={5} sm={12} className='d-md-flex d-none'>
            <div className="hero-content">
            <img src="./images/home/header_guys.png" alt="infoSecFuture" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
