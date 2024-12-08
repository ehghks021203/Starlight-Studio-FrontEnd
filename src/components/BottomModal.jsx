import React, { useState } from "react";
import * as Styled from "../styles/BottomModal.styles";
import { useEffect } from "react";

const BottomModal = ({ modalType, onClose, onConfirm }) => {
  const [text, setText] = useState("");
  const [isClosing, setClosing] = useState(false);
  const [title, setTitle] = useState("");
  const [ph, setPh] = useState("");

  useEffect(() => {
    if (modalType === "require") {
      setTitle("요청사항이 있어요");
      setPh("요청사항을 입력해주세요!");
    } else if (modalType === "modifyTitle") {
      setTitle("제목을 변경해요");
      setPh("변경할 제목을 입력해주세요!");
    } else if (modalType === "genBookCover") {
      setTitle("어떤 표지를 만들고 싶나요?");
      setPh("요청사항을 입력해주세요!");
    }
  }, []);

  const handleConfirm = () => {
    onConfirm(text);
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleConfirm(); // 엔터키 눌렀을 때 로그인 처리
    }
  };

  const closeModal = () => {
    setClosing(true);
    // 일정 시간 후에 모달 제거
    setTimeout(() => {
      onClose();
    }, 280); // 애니메이션 시간
  };

  return (
    <Styled.ModalOverlay isClosing={isClosing} onClick={closeModal}>
      <Styled.ModalContainer
        isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
      >
        <Styled.ModalHeader>
          <Styled.Title>{title}</Styled.Title>
        </Styled.ModalHeader>
        <Styled.ModalBody>
          <Styled.Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={ph}
          />
        </Styled.ModalBody>
        <Styled.ModalFooter>
          <Styled.ConfirmButton onClick={handleConfirm}>
            확인
          </Styled.ConfirmButton>
          <Styled.Button onClick={closeModal}>취소</Styled.Button>
        </Styled.ModalFooter>
      </Styled.ModalContainer>
    </Styled.ModalOverlay>
  );
};

export default BottomModal;
