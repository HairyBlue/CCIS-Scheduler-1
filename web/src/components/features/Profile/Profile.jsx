import { useSelector } from "@reduxjs/toolkit";

export default function Profile() {
  const username = useSelector((state) => state.user.name);

  return <div>{username}</div>;
}
