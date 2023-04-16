export default async function getAllMeetings({ token }) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/admin/list-of-meetings`,
    {
      headers
    }
  );

  const data = await response.json();
  return data;
}
