import type { UserCreate } from "../../types/user.type";

export async function login(user: UserCreate) {
  const body = JSON.stringify(user);

  const res = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: body,
  });
  const data = await res.json();

  if (data.token) {
    sessionStorage.setItem("TOKEN", data.token);
    return { token: data.token };
  } else {
    return { message: data.message };
  }
}
