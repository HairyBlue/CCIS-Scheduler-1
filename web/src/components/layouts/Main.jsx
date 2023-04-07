import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Main = () => {
  const login = useSelector((state) => state.user.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Main;
