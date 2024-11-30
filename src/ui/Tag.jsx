import styled, { css } from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.8rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  font-weight: bold;
  border-radius: 50px;
  /* margin: 5px auto 5px 0; */
  text-align: center;
  min-width: 120px;
  ${(props) =>
    props.status === "unconfirmed" &&
    css`
      background: #e3ce074c;
      color: #e5ce07;
    `}
  ${(props) =>
    props.status === "lose" &&
    css`
      background: #e301014c;
      color: #e30101;
    `}
    ${(props) =>
    props.status === "profit" &&
    css`
      background: #029be34c;
      color: #019be3;
    `}
`;

Tag.defaultProps = {
  status: "profit",
};

export default Tag;
