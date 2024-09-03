import React, { useEffect, useState } from "react";
import { json, Link, Route, Routes } from "react-router-dom";
import HomePage from "./Components/homePage";
import AboutPage from "./Components/aboutPage";
import "./App.css";
import EducationDetails from "./Components/educatioDetails";
import ExperiencePage from "./Components/experiencePage";
import ProjectDetails from "./Components/projectsPage";
import Skills from "./Components/skillsPage";

import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = "umamahesh.b@snapperit.com";
        const data = await fetch(
          `http://localhost:5000/getInfo?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
            query: JSON.stringify(email),
          }
        );
        const res = await data.json();
        setUserInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // console.log(userInfo.projects)
  {console.log(userInfo.projects && userInfo.projects)}

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            margin: "0",
            display: "flex",
            gap: "10px",
          }}
        >
          <li style={{ display: "inline" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontSize: "16px",
              }}
            >
              Home
            </Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link
              to="/about"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontSize: "16px",
              }}
            >
              About
            </Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link
              to="/education"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontSize: "16px",
              }}
            >
              Education
            </Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link
              to="/experience"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontSize: "16px",
              }}
            >
              Experience
            </Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link
              to="/projects"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontSize: "16px",
              }}
            >
              Projects
            </Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link
              to="/skills"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontSize: "16px",
              }}
            >
              Skills
            </Link>
          </li>
        </ul>
      </nav>

      {userInfo.projects &&
        userInfo.projects.map((item,i) => {
          return <div key={i}>{item.projectImage && <img src={item.projectImage} alt="image"/>}</div>;
        })}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/education" element={<EducationDetails />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectDetails />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </div>
  );
}

export default App;
