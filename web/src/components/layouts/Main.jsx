import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setLogin, setUser } from "../features/Profile/userSlice";
import { useDispatch } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      navigate("/login");
    } else if (user.role !== "admin") {
      dispatch(setUser(user));
      dispatch(setLogin(true));

      navigate(`/dashboard/${user.role}/meetings-list`);
    } else if (user.role === "admin") {
      dispatch(setUser(user));
      dispatch(setLogin(true));

      navigate("/admin");
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Main;
