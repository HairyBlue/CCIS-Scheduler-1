import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setLogin, setUser } from "../features/Profile/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      navigate("/login");
    } else {
      dispatch(setUser(user));
      dispatch(setLogin(true));

      navigate("/dashboard/meetings-list");
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Main;
