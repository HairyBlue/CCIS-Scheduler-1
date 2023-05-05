import axios from "axios";

export default async function getAllStudents({ token }) {
  const { data } = await axios({
    url: `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/v1/admin/all-students`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}
