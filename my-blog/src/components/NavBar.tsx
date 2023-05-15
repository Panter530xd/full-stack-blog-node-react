import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-4 w-full mx-auto">
      <div className="w-11/12 md:w-full flex justify-center items-center mx-auto">
        <ul className="flex items-center justify-center space-x-2 ml-auto text-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
        </ul>
        <div className=" flex items-center ml-auto">
          {user ? (
            <button className="text-white" onClick={() => signOut(getAuth())}>
              Log Out
            </button>
          ) : (
            <button className="text-white" onClick={() => navigate("/login")}>
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
