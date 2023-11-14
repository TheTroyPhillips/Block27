import { useState } from "react";
import React from "react";

export default function Authenticate({token}) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  async function handleClick() {
    if(!token) {
        setError(alert("Please sign up before you authenticate"));
        return;
      }
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const result = await response.json();
      console.log(result)
      const username = result.data.username;
      setSuccessMessage(`${result.message} - Welcome, ${username}`);
      return(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
  <>
  <h1>Authentication Here</h1>
  {error && <p>{error}</p>}
  {successMessage && <p>{successMessage}</p>}
  <button onClick={handleClick}>Authenticate</button>
  </>)
}