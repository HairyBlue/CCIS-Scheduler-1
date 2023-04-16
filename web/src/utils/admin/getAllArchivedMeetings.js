export default async function getAllArchiveMeetings() {
  const response = await fetch(
    `${import.meta.url}/api/v1/admin/list-of-archived-meetings`
  );
  return await response.json();
}
