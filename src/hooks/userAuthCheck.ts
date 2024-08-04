import { useState, useEffect } from 'react';

const userAuthCheck = () => {
  const [ifLog, setiflog] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setiflog(!!authToken);
  }, []);

  return ifLog;
};

export default userAuthCheck;