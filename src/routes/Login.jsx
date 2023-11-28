import React, { useState, useContext } from "react";
import NssButton from "../nss/NssButton";
import NssInputText from "../nss/NssInputText";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import NssButtonSave from "../nss/NssButtonSave";
import NssButtonEnter from "../nss/NssButtonEnter";
import NssButtonSignUp from "../nss/NssButtonSignUp";
import NssButtonBack from "../nss/NssButtonBack";
import NssCheckbox from "../nss/NssCheckBox";

function Login() {
  const [password, setPassword] = useState("password");
  const [username, setUsername] = useState("ejnephew@yahoo.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [hasApiError, setHasApiError] = useState(false);

  const handleUserChange = () => {
    setUser(!user);
  };

  const handleAdminChange = () => {
    setAdmin(!admin);
  };

  const onLogin = async () => {
    try {
      const userCred = { email: username, password: password };
      const authenticated = await authContext.authenticateCredentials(userCred);
      setAuth(authenticated);
      setHasApiError(false);
      if (authenticated) {
        navigate("/options");
      }
    } catch (error) {
      setHasApiError(true);
    }
  };

  const onSignUp = () => {
    setCreateAccount(!createAccount);
  };

  const handleRegistration = async () => {
    try {
      const newUser = {
        email: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        serviceName: serviceName,
      };
      await authContext.registerNewAccount(newUser, "admin");
      setHasApiError(false);
    } catch (error) {
      setHasApiError(true);
    }
  };

  const onChangePassword = (val) => {
    setPassword(val);
  };

  const onChangeUsername = (val) => {
    setUsername(val);
  };

  const onChangeFirstName = (val) => {
    setFirstName(val);
  };

  const onChangeLastName = (val) => {
    setLastName(val);
  };

  const onChangeServiceName = (val) => {
    setServiceName(val);
  };

  return (
    <div className="">
      {!createAccount ? (
        <div>
          <div className="flex justify-center">Login</div>
          <div>
            <div className="px-4 py-1">
              <div className="text-xs font-extrabold">Username/Email</div>
              <NssInputText
                value={username}
                onChange={onChangeUsername}
                id="username"
                placeholder="Enter username"
                type="text"
              />
            </div>
            <div className="px-4 py-1">
              <div className="text-xs font-extrabold">Password</div>
              <NssInputText
                value={password}
                onChange={onChangePassword}
                id="password"
                placeholder="Enter password"
                type="password"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 pt-2">
            <NssButtonEnter onClick={onLogin} label="Login" />
          </div>
          <div className="flex py-2 justify-center">
            <div className="flex justify-center gap-4 pt-2 pr-2">
              No account? Sign up here:
            </div>
            <NssButtonSignUp onClick={onSignUp} label="Sign Up" />
          </div>
          {auth ? <div>Authenticated!</div> : <></>}
        </div>
      ) : (
        <div>
          <div className="flex justify-center">Create Account</div>
          <div>
            <div className="px-4 py-1">
              <div className="text-xs font-extrabold">Username/Email</div>
              <NssInputText
                value={username}
                onChange={onChangeUsername}
                id="username"
                placeholder="Enter username"
                type="text"
              />
            </div>
            <div className="px-4 py-1">
              <div className="text-xs font-extrabold">Password</div>
              <NssInputText
                value={password}
                onChange={onChangePassword}
                id="password"
                placeholder="Enter password"
                type="password"
              />
            </div>
            <div className="px-4 py-1">
              <div className="text-xs font-extrabold">First name</div>
              <NssInputText
                value={firstName}
                onChange={onChangeFirstName}
                id="firstname"
                placeholder="Enter first name"
                type="text"
              />
            </div>
            <div className="px-4 py-1">
              <div className="text-xs font-extrabold">Last name</div>
              <NssInputText
                value={lastName}
                onChange={onChangeLastName}
                id="lastname"
                placeholder="Enter last name"
                type="text"
              />
            </div>
            <div className="px-4 py-1">
              <div className="text-xs font-extrabold">Company name</div>
              <NssInputText
                value={serviceName}
                onChange={onChangeServiceName}
                id="service"
                placeholder="Enter company name"
                type="text"
              />
            </div>
            <div className="flex justify-center py-2 gap-2 accent-nss-300">
              <NssCheckbox
                label="User"
                value={user}
                onChange={handleUserChange}
              />
              <NssCheckbox
                label="Admin"
                value={admin}
                onChange={handleAdminChange}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <NssButtonSave onClick={handleRegistration} label="Submit" />
            <NssButtonBack onClick={onSignUp} label="Login Page" />
          </div>
        </div>
      )}
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default Login;
