import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <nav>
      <ul className="">
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
      <div className="nav-right">
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
    </nav>
  );
};

export default NavBar;
