import { useState } from "react";
import Input from "../../components/Input/Input";
import CheckBox from "../../components/Checkbox/CheckBox";
import Button from "../../components/Button/Button";
import Space from "../../components/Space/Space";
import LoginWrapper from "../login/components/LoginWrapper";
import { register } from "./register.service";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reapetPassword, setReapetPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    if (password === reapetPassword && password !== "") {
      const user = { username, password };
      const res = await register(user);

      if (res && res.message) {
        if (res.message === "registerd") {
          navigate("/login");
        } else {
          alert(res.message);
        }
      }
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
      <Input
        type={checked ? "text" : "password"}
        value={reapetPassword}
        setValue={setReapetPassword}
        size="medium"
        placeholder="reapet password"
      />
      <CheckBox checked={checked} setChecked={setChecked} size="small" />
      <Space />
      <Button text="Sign up" onClick={handleRegister} size="large" />
      <div>
        Already have an account?<a href="/login">Sign in</a>
      </div>
    </LoginWrapper>
  );
}

export default Register;
