import React, {useState} from 'react'
import NssButton from '../nss/NssButton';
import NssInputText from '../nss/NssInputText';

function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const onClick = () => {
        console.log("Click")
    }

    const onChangePassword = (val) => {
        setPassword(val);
    }

    const onChangeUsername = (val) => {
        setUsername(val);
    }

  return (
    <div className="bg-nss">
        <div>
        Login Page
        </div>
        <div>
        <NssInputText value={username} onChange={onChangeUsername} id="username" placeholder="Enter username" type="text" />
        <NssInputText value={password} onChange={onChangePassword} id="password" placeholder="Enter password" type="password" />
        </div>
        <NssButton onClick={onClick} label="Login" />
    </div>
  )
}

export default Login;