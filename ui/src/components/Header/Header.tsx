import Button from "../Button/Button";
import "./Header.css";
import defaultUserIcon from "../../assets/defaultUserIcon.png";
import { logout } from "../../service/logout";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";

function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async function () {
      const data = localStorage.getItem("USER") ?? "";
      const user = await JSON.parse(data);

      setUsername(user.username);
    })();
  });

  return (
    <div className="header-cont">
      <div className="user-cont">
        <img src={defaultUserIcon} className="user-img" />
        <div className="user-username">{username}</div>
      </div>
      <img src={logo} className="logo" />
      <Button text="logout" size="small" onClick={logout} />
    </div>
  );
}

export default Header;
