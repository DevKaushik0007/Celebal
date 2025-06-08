import React from "react";
import { useLocation } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const location = useLocation();
  const data = location.state?.formData || {};

  return (
    <div className="success-container">
      <h2>Form Submitted Successfully</h2>
      <div className="result-card">
        {Object.entries(data).map(([key, value]) => {
          if (key === "showPassword" || key === "countryCode") return null;
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          let displayValue = value;
          if (key === "phone" && data.countryCode) {
            displayValue = `${data.countryCode} ${value}`;
          }
          return (
            <div key={key} className="result-field">
              <span className="result-label">{label}</span>
              <span className="result-value">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuccessPage;
