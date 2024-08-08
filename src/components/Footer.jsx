// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-left">
          <img
            src="../imgs/LOGO-FINAL.png"
            alt="Logo Sur360"
            className="footer-logo"
          />
        </div>
        <div className="footer-center">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaXTwitter />
          </a>
        </div>
        <div className="footer-right">
          <p>
            Email: <a href="mailto:sur360@gmail.com">sur360@gmail.com</a>
          </p>
          <p>Teléfono: +542942885463</p>
          <p>Ubicación: Villa Pehuenia, Neuquén</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
