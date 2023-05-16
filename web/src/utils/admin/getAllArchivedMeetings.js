import axios from "axios";

export default async function getAllArchivedMeetings({ token }) {
  const { data } = await axios({
    url: `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/v1/admin/list-of-archive-meetings`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}
