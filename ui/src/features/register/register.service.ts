import type { UserCreate } from "../../types/user.type";

export async function register(user: UserCreate) {
  const body = JSON.stringify(user);
  console.log(body);

  const res = await fetch(import.meta.env.VITE_API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: body,
  });
  const data = await res.json();

  return { message: data.message };
}
