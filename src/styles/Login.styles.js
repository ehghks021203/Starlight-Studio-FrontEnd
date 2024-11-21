import styled from "styled-components";
import palette from "./styles";

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #2d2a4a, #1b1a33);
  position: relative;
  overflow: hidden;
`;

export const LoginBox = styled.div`
  background: rgba(40, 40, 70, 0.9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.7);
  text-align: center;
  max-width: 400px;
  height: 400px;
  width: 100%;
  z-index: 10;
`;

export const Title = styled.h1`
  font-family: "Sejong Geulggot";
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: ${palette.yellow};
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
`;

export const SubTitle = styled.h1`
  font-family: "Sejong Geulggot";
  font-size: 1.0rem;
  margin-bottom: 40px;
  color: ${palette.white};
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
`;

export const InputField = styled.input`
  width: 320px;
  padding: 10px 10px;
  margin-top: 20px;
  border: none;
  border-bottom: 2px solid ${palette.yellow};
  outline: none;
  font-size: 1rem;
  background-color: transparent;
  color: ${palette.white};
  text-align: center; /* 텍스트 중앙 정렬 */
  transition: border-color 0.3s ease;

  &:focus {
    border-bottom: 2px solid #e8c72a;
  }

  &::placeholder {
    color: #a9a9a9;
    text-align: center; /* placeholder도 중앙 정렬 */
  }
`;

export const LoginButton = styled.button`
  margin-top: 50px;
  width: 340px;
  padding: 10px 10px;
  background: ${palette.yellow};
  color: #1b1a33;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e8c72a;
    transform: translateY(-3px);
    box-shadow: 0px 5px 15px rgba(244, 208, 63, 0.5);
  }
`;