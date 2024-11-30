/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledBody = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: end;
  align-self: flex-end;
  gap: 1.4rem;
  margin: 1rem auto;
  font-size: 1.8rem;
  line-height: 1.5;
  padding: 0.4rem 1rem;
  max-width: 80rem;
  background-color: var(--color-gray-200);
  padding: 1rem;
  &:nth-child(even) {
    background: var(--color-gray-200);
  }
`;

const Value = styled.div`
  background: #029be34c;
  color: #019be3;
  min-width: 100px;
  padding: 0.4rem 1rem;
  text-align: center;
  font-size: 1.4rem;
  border-radius: 8px;
  font-weight: bold;
`;

function StrategyRow({ strategy }) {
  return (
    <StyledBody>
      <div>{strategy.name}</div>
      <Value>{strategy.value}</Value>
    </StyledBody>
  );
}

export default StrategyRow;
