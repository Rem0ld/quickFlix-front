import React, { useState } from "react";

const errors = {
  empty: "should not be empty",
};

export default function Login() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [passError, setPassError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pseudo.length) {
      setPseudoError(errors.empty);
      setTimeout(() => {
        setPseudoError("");
      }, 600);
    }
    if (!password.length) {
      setPassError(errors.empty);
      setTimeout(() => {
        setPassError("");
      }, 600);
    }
  };

  return (
    <div className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-2/4 m-auto"
      >
        <h2 className="text-xl font-medium">Login</h2>
        <div className="flex flex-col ">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="h-12 rounded-sm p-1"
            type="text"
            placeholder="pseudo"
          />
          {pseudoError.length > 0 && (
            <span className="animate-wiggle text-red-600">{pseudoError}</span>
          )}
        </div>
        <div className="flex flex-col relative pb-10">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-sm p-1"
            type="password"
            placeholder="password"
          />
          {passError.length > 0 && (
            <span className="absolute bottom-0 animate-wiggle text-red-600">
              {passError}
            </span>
          )}
        </div>
        <button className="bg-red-600 w-auto rounded-sm h-12" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
