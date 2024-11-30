import styled from "styled-components";
import { useDarkMode } from "../context/DarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        src={`/img/logo-${isDarkMode ? "dark.png" : "light.png"}`}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;