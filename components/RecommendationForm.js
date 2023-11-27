import React, { useState } from "react";

const RecommendationForm = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleRecommendation = () => {
    // Basic logic for recommendation
    // You can replace this with your own logic based on input values
    const combinedInputs = `${input1}-${input2}-${input3}`;

    // Example logic: Check if the combined inputs match a specific condition
    if (
        (input1 >= 35 && input2 === "female" && input3 >= 4) ||
        (input1 >= 40 && input2 === "male" && input3 >= 5)
      ) {
        setRecommendation(
          "Premium Plan with No Ads and Full Platform Capabilities for $10/Month"
        );
      } else if (
        (input1 >= 25 && input1 <= 34 && input2 === "female" && input3 >= 3) ||
        (input1 >= 30 && input1 <= 39 && input2 === "male" && input3 >= 4)
      ) {
        setRecommendation("Upgraded Plan with No Ads for $3/Month");
      } else {
        setRecommendation("Free Limited Plan");
      }
    };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", paddingTop: "10%"}}>Which Pricing Plan Works Best For You?</h1>
      <div style={{ fontSize: "1.5rem", paddingTop: "2%"}}>
        <label style={{  marginRight: '20px'}}>Please enter your age:</label>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div style={{ fontSize: "1.5rem", paddingTop: "2%"}}>
        <label style={{  marginRight: '20px'}}>Please enter your gender:</label>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div style={{ fontSize: "1.5rem", paddingTop: "2%"}}>
        <label style={{  marginRight: '20px'}}>Please enter your household size:</label>
        <input
          type="text"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <button style={{fontSize: "1.5rem", paddingTop: "2%"}} onClick={handleRecommendation}>Get Recommendation!</button>
      {recommendation && (
        <div>
          <h2 style={{fontSize: "1.5rem", paddingTop: "2%"}}>Recommendation:</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;