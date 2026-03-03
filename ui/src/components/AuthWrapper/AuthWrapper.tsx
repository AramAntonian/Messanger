import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthWrapperParams {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperParams) {
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const token = sessionStorage.getItem("TOKEN");

      if (token) {
        const res = await fetch(import.meta.env.VITE_API_URL + "/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.message) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    })();
  }, []);
  return <>{children}</>;
}

export default AuthWrapper;
