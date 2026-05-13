import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;