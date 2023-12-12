import React, { useState } from "react";
import "./styles.css";

import usePasswordValidation from "./hooks/usePasswordValidation";

function PasswordEntryForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const { valid, errorMessage } = usePasswordValidation(password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const checkValidation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valid && password && confirmPassword === "") {
      setFeedback("Please confirm your password");
      return;
    }
    if (valid && password !== confirmPassword) {
      setFeedback("Passwords do not match");
      return;
    }
    if (valid && password === confirmPassword) {
      setFeedback("Password is valid!");
      setPassword("");
      setConfirmPassword("");
    } else {
      setFeedback(errorMessage);
    }
  };

  return (
    <form className="formWrapper" onSubmit={checkValidation}>
      <input
        type="password"
        id="password"
        value={password}
        placeholder="Enter your password"
        onChange={handleInputChange}
        onFocus={() => setFeedback("")}
        className={
          feedback === "Password is valid!" || feedback === ""
            ? "input"
            : "inputError"
        }
      />
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        placeholder="Confirm your password"
        onChange={handleConfirmChange}
        onFocus={() => setFeedback("")}
        className={
          feedback === "Password is valid!" || feedback === ""
            ? "input"
            : "inputError"
        }
      />
      <span
        className="feedback"
        style={{
          color: feedback === "Password is valid!" ? "green" : "red",
        }}
      >
        {feedback}
      </span>
      <button type="submit">Validate</button>
    </form>
  );
}

export default PasswordEntryForm;
