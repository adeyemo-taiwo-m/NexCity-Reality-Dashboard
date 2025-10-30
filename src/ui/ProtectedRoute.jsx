import { useNavigate } from "react-router-dom";
import useUser from "../features/Authentication/useUser";
import { useEffect } from "react";
import PlainPage from "./PlainPage";
import LoadingState from "./LoadingState";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login");
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <PlainPage>
        <LoadingState />
      </PlainPage>
    );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
