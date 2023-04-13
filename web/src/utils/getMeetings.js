import { useSelector } from "react-redux";

export default async function getMeetingsForCreator({ token }) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/student/pending-meetings/creator`,
    {
      headers
    }
  );
  const data = await response.json();
  return data;
}
