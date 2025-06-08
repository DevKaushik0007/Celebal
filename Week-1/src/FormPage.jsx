import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";

const countries = {
  India: ["Delhi", "Mumbai", "Jaipur"],
  USA: ["New York", "Los Angeles", "Chicago"],
  UK: ["London", "Manchester", "Birmingham"]
};

const countryCodes = {
  India: "+91",
  USA: "+1",
  UK: "+44"
};

const FormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
    showPassword: false,
    countryCode: "+91"
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6) newErrors.password = "Minimum 6 characters required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.city) newErrors.city = "Please select a city";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) newErrors.pan = "Invalid PAN format";
    if (!/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = "Aadhar must be 12 digits";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "country") {
      const selectedCode = countryCodes[value] || "";
      setFormData(prev => ({
        ...prev,
        country: value,
        city: "",
        countryCode: selectedCode
      }));
    } else {
      const inputVal = type === "checkbox" ? checked : value;
      setFormData(prev => ({ ...prev, [name]: inputVal }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/success", { state: { formData } });
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Username", name: "username" },
            { label: "Email", name: "email", type: "email" }
          ].map(({ label, name, type = "text" }) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
              {errors[name] && <span className="error">{errors[name]}</span>}
            </div>
          ))}

          <div className="form-group">
            <label>Phone</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                {Object.values(countryCodes).map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Enter 10-digit number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {["pan", "aadhar"].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.toUpperCase()} No</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
              {errors[field] && <span className="error">{errors[field]}</span>}
            </div>
          ))}

          <div className="form-group password-wrapper">
            <label>Password</label>
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label className="show-password">
              <input
                type="checkbox"
                name="showPassword"
                checked={formData.showPassword}
                onChange={handleChange}
              />
              Show Password
            </label>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="">-- Select Country --</option>
              {Object.keys(countries).map(c => <option key={c}>{c}</option>)}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div className="form-group">
            <label>City</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">-- Select City --</option>
              {(countries[formData.country] || []).map(city => (
                <option key={city}>{city}</option>
              ))}
            </select>
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
