import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticateApi from "../../api/AuthenticateApi";
import { AuthContext } from "../../contexts/auth/AuthContext";

enum EnumErrors {
  empty = "should not be empty",
  invalidPseudo = "invalid pseudo",
}

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [passError, setPassError] = useState("");

  const handlePseudoError = (type: EnumErrors) => {
    setPseudoError(type);
    setTimeout(() => {
      setPseudoError("");
    }, 600);
  };

  const handlePassError = (type: EnumErrors) => {
    setPassError(type);
    setTimeout(() => {
      setPassError("");
    }, 600);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!pseudo.length) {
      handlePseudoError(EnumErrors.empty);
      return;
    }
    if (!password.length) {
      handlePassError(EnumErrors.empty);
      return;
    }

    const [result, error] = await AuthenticateApi.Instance.authenticate({
      pseudo,
      password,
    });
    if (error) {
      if (error.message.includes("no user")) {
        handlePseudoError(EnumErrors.invalidPseudo);
      }
      return;
    }
    AuthenticateApi.Instance.setUser(result);
    setUser(result);
    navigate("/");
  };

  return (
    <div className="max-w-2xl m-auto mt-36 grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-2/4 m-auto"
      >
        <h2 className="text-xl font-medium">Welcome</h2>
        <div className="flex flex-col relative h-20">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="h-12 rounded-sm p-1"
            type="text"
            placeholder="pseudo"
          />
          {pseudoError.length > 0 && (
            <span className="absolute bottom-0 animate-wiggle text-red-600">
              {pseudoError}
            </span>
          )}
        </div>
        <div className="flex flex-col relative h-20">
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
