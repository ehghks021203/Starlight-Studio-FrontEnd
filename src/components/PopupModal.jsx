import React, { useState } from 'react';
import * as Styled from "../styles/PopupModal.styles";
import { useEffect } from 'react';

const PopupModal = ({ onClose, onConfirm, storyId, storyTitle }) => {
  const [isClosing, setClosing] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(storyTitle);
  }, []);

  const handleConfirm = () => {
    onConfirm(storyId);
    closeModal();
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
      <Styled.ModalContainer isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <Styled.ModalHeader>
          <Styled.Title>동화책을 삭제할까요?</Styled.Title>
        </Styled.ModalHeader>
        <Styled.ModalBody>
          <Styled.Content>
            삭제하면 다시 돌아올 수 없어요. 확인해 주세요!
          </Styled.Content>
          <Styled.DeleteStoryTitle>
            "{title}"
          </Styled.DeleteStoryTitle>
        </Styled.ModalBody>
        <Styled.ModalFooter>
          <Styled.DeleteButton onClick={handleConfirm}>삭제</Styled.DeleteButton>
          <Styled.Button onClick={closeModal}>취소</Styled.Button>
        </Styled.ModalFooter>
      </Styled.ModalContainer>
    </Styled.ModalOverlay>
  );
};

export default PopupModal;
