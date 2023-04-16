export default async function getMeetingsForCreator({ token }, url) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/student/${url}`,
    {
      headers
    }
  );
  const data = await response.json();
  return data;
}
