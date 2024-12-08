import styled, { keyframes, css } from "styled-components";
import palette from "./styles";

// 아래에서 위로 올라오는 애니메이션
const modalSlideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 페이드 아웃 애니메이션 (모달 닫을 때)
const modalFadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  cursor: pointer;
  animation: ${(props) =>
    props.isClosing
      ? css`
          ${modalFadeOut} 0.3s ease-out
        `
      : ""};
  transition: all 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  width: 70%;
  background: rgba(40, 40, 70, 0.9);
  border-radius: 12px 12px 0px 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  display: flex;
  flex-direction: column;
  animation: ${modalSlideUp} 0.3s ease-out;
  cursor: default;

  animation: ${(props) =>
    props.isClosing
      ? css`
          ${modalFadeOut} 0.3s ease-out
        `
      : ""};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #eaeaea;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    font-size: 16px;
    color: #b5b5b5;
  }

  input {
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    color: #eaeaea;
    outline: none;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    text-align: center;

    &::placeholder {
      color: #777;
      text-align: center;
    }

    &:focus {
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.8);
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 1.8rem;
  text-align: center;
  color: #eaeaea; /* 밝은 색 텍스트 */
`;

export const Input = styled.input``;

export const Button = styled.button`
  padding: 12px 24px;
  background: #808080;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #646464;
  }
`;

export const ConfirmButton = styled(Button)`
  background: #ffb74d;

  &:hover {
    background: #c68e3c;
  }
`;
