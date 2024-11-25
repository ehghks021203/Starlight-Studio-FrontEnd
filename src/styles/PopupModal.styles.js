import styled, { keyframes, css } from "styled-components";
import palette from "./styles";

// 모달 슬라이드 업 애니메이션
const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 모달 페이드 아웃 애니메이션
const modalFadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// 모달 오버레이 스타일
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
    animation: ${props => props.isClosing ? css`${modalFadeOut} 0.3s ease-out` : ''};
    transition: all 0.3s ease-out;
`;

// 모달 컨테이너 스타일
export const ModalContainer = styled.div`
    width: 80%;
    max-width: 500px;
    background: rgba(40, 40, 70, 0.9);
    border-radius: 12px 12px 0px 0px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    padding: 20px;
    display: flex;
    flex-direction: column;
    animation: ${modalSlideUp} 0.3s ease-out;
    cursor: default;
    
    animation: ${props => props.isClosing ? css`${modalFadeOut} 0.3s ease-out` : ''};
`;

// 모달 헤더 스타일
export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #eaeaea;
`;

// 모달 본문 스타일
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

// 모달 푸터 스타일 (버튼 영역)
export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
`;

// 모달 제목 스타일
export const Title = styled.div`
  width: 100%;
  font-size: 1.8rem;
  text-align: center;
  color: #eaeaea;
`;

export const Content = styled.div`
  width: 100%;
  font-size: 1.0rem;
  text-align: center;
  color: #eaeaea;
`

export const DeleteStoryTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 1.0rem;
  text-align: center;
  color: #e74c3c;
`

// 버튼 스타일
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

export const DeleteButton = styled(Button)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`
