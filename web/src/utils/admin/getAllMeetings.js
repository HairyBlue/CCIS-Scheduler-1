export default async function getAllMeetings() {
  const response = await fetch(
    `${import.meta.url}/api/v1/admin/list-of-meetings`
  );
  return await response.json();
}
