import { useState, useEffect } from "react";

const usePasswordValidation = (password: string) => {
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // check if password is valid
    if (password.length < 6) {
      setValid(false);
      setErrorMessage("Your password must be at least 6 characters long");
      return;
    }

    // check if password contains a special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      setValid(false);
      setErrorMessage("Your password must contain a special character");
      return;
    }

    // check if password contains a number
    if (!/\d/.test(password)) {
      setValid(false);
      setErrorMessage("Your password must contain a number");
      return;
    }

    // check if password contains an uppercase letter
    if (!/[A-Z]/.test(password)) {
      setValid(false);
      setErrorMessage("Your password must contain an uppercase letter");
      return;
    }

    // check if password contains a lowercase letter
    if (!/[a-z]/.test(password)) {
      setValid(false);
      setErrorMessage("Your password must contain a lowercase letter");
      return;
    }

    // if all checks pass, set valid to true
    setValid(true);
    setErrorMessage("");
  }, [password]);

  return { valid, errorMessage };
};

export default usePasswordValidation;
