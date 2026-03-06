import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../service/logout";

interface AuthWrapperParams {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperParams) {
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const token = sessionStorage.getItem("TOKEN");

      if (token) {
        try {
          const res = await fetch(import.meta.env.VITE_API_URL + "/auth/verify", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) {
            logout();
          }
          const data = await res.json();
          if (data.message) {
            logout();
          }
        } catch (e) {
          console.log(e);
          logout();
        }
      } else {
        logout();
      }
    })();
  }, [navigate]);

  return <>{children}</>;
}

export default AuthWrapper;
