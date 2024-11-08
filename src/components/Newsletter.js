import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');
  const [localStatus, setLocalStatus] = useState('');

  useEffect(() => {
    if (status === 'success') {
      clearFields();
      setLocalStatus("success");
    }
  }, [status]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalStatus('sending');
    
    if (email && isValidEmail(email)) {
      onValidated({ EMAIL: email });
      sendWelcomeEmail(email);
    } else {
      setLocalStatus("error");
    }
  };

  const clearFields = () => {
    setEmail('');
  };

  const sendWelcomeEmail = (subscriberEmail) => {
    const templateParams = {
      to_email: subscriberEmail,
      message: "Thank you for subscribing to our newsletter! Stay tuned for the latest updates."
    };

    emailjs.send("service_yourServiceId", "template_yourTemplateId", templateParams, "user_yourUserId")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setLocalStatus('success');
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        setLocalStatus('error');
      });
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Subscribe to our Newsletter<br /> & Never miss latest updates</h3>
            {localStatus === 'sending' && <Alert>Sending...</Alert>}
            {localStatus === 'error' && <Alert variant="danger">Please enter a valid email address.</Alert>}
            {localStatus === 'success' && <Alert variant="success">Subscribed successfully!</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <label htmlFor="emailInput">Email Address</label>
                <input
                  id="emailInput"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <button type="submit">Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
