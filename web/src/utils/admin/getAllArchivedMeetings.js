export default async function getAllArchiveMeetings({ token }) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/v1/admin/list-of-archive-meetings`,
    {
      headers
    }
  );

  const data = response.json();
  return data;
}
