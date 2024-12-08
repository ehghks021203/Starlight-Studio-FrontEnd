import React, { useState } from "react";
import * as Styled from "../styles/PopupModal.styles";
import { useEffect } from "react";

const LicenseModal = ({ onClose }) => {
  const [isClosing, setClosing] = useState(false);

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
          <Styled.Title>라이선스</Styled.Title>
        </Styled.ModalHeader>
        <Styled.ModalBody>
          <Styled.Content>
            이 웹사이트는 세종글꽃체를 사용하여 작성되었습니다.
          </Styled.Content>
        </Styled.ModalBody>
        <Styled.ModalFooter>
          <Styled.Button onClick={closeModal}>닫기</Styled.Button>
        </Styled.ModalFooter>
      </Styled.ModalContainer>
    </Styled.ModalOverlay>
  );
};

export default LicenseModal;
