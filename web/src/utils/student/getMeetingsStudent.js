import axios from "axios";

export default async function getMeetingsForStudentCreator({ token }, url) {
  const { data } = await axios({
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/${url}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    signal: AbortSignal.timeout(5000)
  });

  return data;
}
