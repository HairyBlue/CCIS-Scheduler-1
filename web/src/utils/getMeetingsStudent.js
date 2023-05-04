import axios from "axios";

export default async function getMeetingsForCreator({ token }, url) {
  const { data } = await axios({
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/${url}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    signal: AbortSignal.timeout(5000)
  });

  return data;
}
