import axios from "axios";

export default async function getMeetingsForCreator({ token }, url) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const { data } = await axios({
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/${url}`,
    headers
  });


  return data;
}
