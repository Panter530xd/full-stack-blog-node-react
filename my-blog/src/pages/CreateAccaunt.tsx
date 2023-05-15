import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <h2 className="text-3xl font-bold mb-4">Create Account</h2>
        {error && <p className="error">{error}</p>}
        <form className="flex flex-col gap-2">
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
          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" py-2"
          />
        </form>
        <button
          className=" text-white md:w-[400px] w-[300px] mt-3"
          onClick={createAccount}
        >
          Create Account
        </button>
        <Link to="/login">Already have an account? Log in here</Link>
        <hr className="border-2 border-black cursor-pointer hover:border-red-500 duration-500 md:w-[400px] w-[300px] mt-3" />
      </div>
    </>
  );
};
export default CreateAccount;
