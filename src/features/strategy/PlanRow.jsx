/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  padding: 0.4rem 1rem;
  padding: 1rem;
  align-items: center;
  padding: 1.6rem 2.4rem;
`;

function StrategyRow({ plan }) {
  return (
    <StyledBody>
      <div>{plan.day}</div>
      <div>{plan.balance}</div>
      <div>{plan.risk_percent}</div>
      <div>{plan.min_risk_reward_ratio}</div>
      <div>{plan.min_trades_per_day}</div>
      <div>{plan.max_trades_per_day}</div>
      <div>{plan.min_strategy_score}</div>
      <div>{plan.min_daily_pips_target}</div>
      <div>{plan.avg_daily_profit}</div>
    </StyledBody>
  );
}

export default StrategyRow;
