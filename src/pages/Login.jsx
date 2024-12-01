import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
// import Logo from "../ui/Logo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  background-image: url("/img/bg-login.png");
  background-size: cover;
`;

function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/dashboard");
    },
    [isAuthenticated, navigate],
  );

  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
