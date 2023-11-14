import { useState, useEffect } from "react";
import React from "react";

export default function SignUpForm({setToken}) {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const apiurl = "https://fsa-jwt-practice.herokuapp.com/signup";
  console.log(userName);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: userName, password: password}),
      });
      const result = await response.json();
      console.log(result.token);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
  <h1>Sign up Now!</h1>
  {error && <p>{error}</p>}
  <form onSubmit={handleSubmit}>
    <label>Username:{""} <input value={userName} onChange={(e) => setUserName(e.target.value)} />
    {userName.length < 5 ? (
      <p>Your username needs to be longer</p>
    ) : (
      <p>Great Username!</p>
    )}
    </label><br />
    <label>Password:{""} <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label><br />
    <button>Submit</button>
  </form>
  </>
  )
}