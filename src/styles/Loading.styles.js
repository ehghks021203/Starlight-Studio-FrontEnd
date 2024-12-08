import styled from "styled-components";
import palette from "./styles";

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #2d2a4a;
  color: #ecf0f1;
`;

export const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #ecf0f1;
`;
