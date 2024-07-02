import { useState, useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const nickname = localStorage.getItem('nickname');

      if (!token) {
        setLoading(false);
        return;
      }

      if (token === 'kakao') {
        setUser({ name: nickname });
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useUser;
