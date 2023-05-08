import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setisLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    isLoading,
  };
};

export default useUser;
