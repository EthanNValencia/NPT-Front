import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="text-center">
      <h2 className="text-lg">404 - Page Not Found</h2>
      <p>Redirecting to the home page...</p>
    </div>
  );
};

export default NotFound;
