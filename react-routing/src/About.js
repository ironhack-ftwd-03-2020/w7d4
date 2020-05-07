import React from "react";
import Education from "./Education";
import Experience from "./Experience";

const About = () => {
  return (
    <div style={{ display: "flex" }}>
      <Education />
      <Experience />
    </div>
  );
};

export default About;
