import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/codechef.png";
import navIcon3 from "../assets/img/leetcode.webp";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/varshini-manchikalapudi/"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://www.codechef.com/users/klu2100030322"><img src={navIcon2} alt="Icon" /></a>
              <a href="https://leetcode.com/u/klu_2100030322/"><img src={navIcon3} alt="Icon" /></a>
            </div>
            <p>Copyright 2022. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
