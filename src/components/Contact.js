import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };
  
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formDetails.email)) {
      setStatus({ success: false, message: "Please enter a valid email address." });
      setShowAlert(true);
      setAutoHideAlert();
      return;
    }
    if (!/^\d{10}$/.test(formDetails.phone)) {
      setStatus({ success: false, message: "Phone number must be 10 digits." });
      setShowAlert(true);
      setAutoHideAlert();
      return;
    }
    if (formDetails.message.length < 20) {
      setStatus({ success: false, message: "Message must be at least 20 characters." });
      setShowAlert(true);
      setAutoHideAlert();
      return;
    }

    setButtonText("Sending...");

    const templateParams = {
      firstName: formDetails.firstName,
      lastName: formDetails.lastName,
      email: formDetails.email,
      phone: formDetails.phone,
      message: formDetails.message,
    };

    emailjs.send("service_4nl2oxw", "template_t3lc182", templateParams, "h_xrCeH_KxeUID5Hh")
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
        setButtonText("Send");
        setFormDetails(formInitialDetails);
        setStatus({ success: true, message: "Message sent successfully" });
        setShowAlert(true);
        setAutoHideAlert();
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        setButtonText("Send");
        setStatus({ success: false, message: "Something went wrong, please try again later." });
        setShowAlert(true);
        setAutoHideAlert();
      });
  };

  const setAutoHideAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 10000); // 10 seconds
  };

  return (
    <section className="contact" id="connect">
      <Container>
        {showAlert && (
          <Alert 
            variant={status.success ? "success" : "danger"} 
            onClose={() => setShowAlert(false)} 
            dismissible
            className="mt-4"
          >
            {status.message}
          </Alert>
        )}
        
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                    </Row>
                  </form>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
