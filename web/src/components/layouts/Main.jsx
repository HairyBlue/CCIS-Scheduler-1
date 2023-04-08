import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setLogin, setUser } from "../features/Profile/userSlice";
import { useDispatch } from "react-redux";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage.clear();
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null || !user?.login) {
      navigate("/login");
    } else {
      dispatch(setUser(user));
      dispatch(setLogin(user.login));
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
