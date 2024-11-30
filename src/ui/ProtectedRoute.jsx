import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  // 2. while loading show spinner

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading)
        navigate("/login", {
          replace: true,
        });
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 3. if no authenticated user redirect to login page

  console.log(isLoading, isAuthenticated);

  // 4. if there is a user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
