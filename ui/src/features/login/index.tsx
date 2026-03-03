import { useState } from "react";
import Input from "../../components/Input/Input";
import CheckBox from "../../components/Checkbox/CheckBox";
import LoginWrapper from "./components/LoginWrapper";
import Button from "../../components/Button/Button";
import Space from "../../components/Space/Space";
import { login } from "./login.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate()

  async function handleLogin() {
    const user = { username, password };
    const res = await login(user);

    if (res && res.message) {
      alert(res.message);
    } else {
      navigate('/');
    }
  }

  return (
    <LoginWrapper>
      <Input
        type="text"
        value={username}
        setValue={setUsername}
        size="medium"
        placeholder="username"
      />
      <Input
        type={checked ? "text" : "password"}
        value={password}
        setValue={setPassword}
        size="medium"
        placeholder="password"
      />
      <CheckBox checked={checked} setChecked={setChecked} size="small" />
      <Space />
      <Button text="Sign in" onClick={handleLogin} size="large" />
      <div>
        Don't have an Account?<a href="/register">Sign up</a>
      </div>
    </LoginWrapper>
  );
}

export default Login;
