import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Form data submitted:", formData);
      const fetchData = async () => {
        try {
          const data = await fetch("http://localhost:5000/info", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          });
          const res = await data.json()
          alert(res.message)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  };

  return (
    <div>
      <h1>Dynamic</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <br />
        <div>
          <label>Enter Full Name: </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
        </div>
        <br />
        <div>
          <label>Enter Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
