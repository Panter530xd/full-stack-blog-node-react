import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const Login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError((e as Error).message);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="md:w-10/12 w-11/12 mx-auto flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Log In</h2>
          {error && <p className="error">{error}</p>}
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" py-2"
            />
          </form>
          <button
            className="text-white md:w-[400px] w-[300px] mt-3"
            onClick={Login}
          >
            Log In
          </button>
          <Link to="/create-account">
            <p> Don't have an account? Create one here</p>
          </Link>
          <hr className="border-2 border-black cursor-pointer hover:border-red-500 duration-500 md:w-[400px] w-[300px] mt-3" />
        </div>
      </div>
    </>
  );
};
export default LoginPage;
