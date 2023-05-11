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
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-4">Log In</h2>
        {error && <p className="error">{error}</p>}
        <form className="flex flex-col gap-2" id="add-comment-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className=" text-white" onClick={Login}>
            Log In
          </button>
          <Link to="/create-account">
            Don't have an account? Create one here
          </Link>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
