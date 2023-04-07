import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function VerifyAcc() {
  const [message, setMessage] = useState(null);

  const { id, verify_token } = useParams();

  const getVerificationMessage = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/api/student/${id}/${verify_token}`
    );

    const data = await response.json();
    setMessage(data.success_message);
  };

  useEffect(() => {
    getVerificationMessage();
  }, []);

  return (
    <div>{message !== undefined ? message : "Verification Unsuccessful"}</div>
  );
}
