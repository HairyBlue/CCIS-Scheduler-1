import axios from "axios";

export default async function getAllVenues({ token }) {
  const { data } = await axios({
    url: `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/v1/admin/all-venues`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}
