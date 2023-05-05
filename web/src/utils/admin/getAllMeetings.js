import axios from "axios";

export default async function getAllMeetings({ token }) {
  const { data } = await axios({
    url: `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/v1/admin/list-of-meetings`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}
