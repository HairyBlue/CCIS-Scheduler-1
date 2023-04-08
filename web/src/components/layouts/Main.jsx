import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null || !user?.login) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Main;
