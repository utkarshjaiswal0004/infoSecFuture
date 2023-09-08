import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './explore_section.css';

const ExploreSection = () => {
  return (
    <section className="explore-section my-5">
      <Container className="explore-container">
        <h2 className="text-center">Explore Your Path</h2>
        <h4 className="text-center">Find your path</h4>
        <Row className="text-center my-5">
          <Col md={4} className="px-3 px-lg-1">
            <Card className="py-3 shadow explore-card">
              <Card.Img
                variant="top"
                src="/images/explore/1.png"
                alt="Card 1"
                className="icon-img mx-auto mt-3"
                style={{ height: '80px', width: '80px' }}
              />
              <Card.Body>
                <Card.Title className="mb-3">Empower Growth</Card.Title>
                <Card.Subtitle className="mb-3">Boost your team</Card.Subtitle>
                <Card.Text className="text-muted mb-3">
                  Discover top talent for your organization & accelerate your
                  business growth. Find the perfect match for your job opening
                  with our AI-driven candidate screening.
                </Card.Text>
                <Button className="explore-btn px-3 py-2 shadow-sm mt-3">
                  For Employer
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="px-3 px-lg-1">
            <Card className="py-3 shadow explore-card">
              <Card.Img
                variant="top"
                src="/images/explore/2.png"
                alt="Card 2"
                className="icon-img mx-auto mt-3"
                style={{ height: '80px', width: '80px' }}
              />
              <Card.Body>
                <Card.Title className="mb-3">Unlock Opportunities</Card.Title>
                <Card.Subtitle className="mb-3">Maximize earnings</Card.Subtitle>
                <Card.Text className="text-muted mb-3">
                  Take your recruitment career to new heights. Gain access to a
                  pool of verified job openings and multiply your earnings with
                  our attractive commission structure.
                </Card.Text>
                <Button className="explore-btn px-3 py-2 shadow-sm mt-3">
                  For Recruiters
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="px-3 px-lg-1">
            <Card className="py-3 shadow explore-card">
              <Card.Img
                variant="top"
                src="/images/explore/3.png"
                alt="Card 3"
                className="icon-img mx-auto mt-3"
                style={{ height: '80px', width: '80px' }}
              />
              <Card.Body>
                <Card.Title className="mb-3">Your Dream Job</Card.Title>
                <Card.Subtitle className="mb-3">Within Reach</Card.Subtitle>
                <Card.Text className="text-muted mb-3">
                  Find your dream job with ease. Access validated job
                  opportunities and receive personalized job alerts that match
                  your skills and preferences.
                </Card.Text>
                <Button className="explore-btn px-3 py-2 shadow-sm mt-3">
                  For Jobseeker
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ExploreSection;
