import styled from "styled-components";
import palette from "./styles";

// 스타일 정의
export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #2d2a4a, #1b1a33);
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LargeBox = styled.div`
  margin: 50px;
  width: 80%;
  max-width: 800px;
  background: rgba(40, 40, 70, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 10;
`;

export const Label = styled.label`
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: -10px;
  color: #ecf0f1;
`;

export const TextBox = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ecf0f1;
  resize: none; /* 크기 조정 방지 */
  outline: none;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);

  &:focus {
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.8);
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #3b883e;
  }
`;

export const ApplyButton = styled(Button)`
  background: #4caf50;
  margin-bottom: 20px;

  &:hover {
    background: #3b883e;
  }
`;

export const RequireButton = styled(Button)`
  background: #ffb74d;
  margin-bottom: 20px;

  &:hover {
    background: #c68e3c;
  }
`;

export const RegenButton = styled(Button)`
  background: #f06292;
  margin-bottom: 20px;

  &:hover {
    background: #bb4c72;
  }
`;

// Page Style
export const Page = styled.div`
  display: flex;

  background-color: #fdfaf7;
  color: #785e3a;
  border: solid 1px #c2b5a3;
  
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;

  overflow: hidden;

`;

export const StoryPaperWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(135deg, #2d2a4a, #1b1a33);
  position: relative;
  overflow: hidden;
`

export const StoryPaperContainer = styled.div`
  display: flex;
  padding: 60px;
  padding-bottom: 90px;
  position: relative;
  justify-content: center;
  align-items: center;
  min-width: 50vw;
  max-width: 50vw;
  min-height: 500px;
  background: #d8c8a4;
  border: 1px solid #f4d03f;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const StoryTitle = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 2.5rem;
  margin: 40px;
`

export const StoryPaperText = styled.p`
  color: #4e3b31;
  text-align: center;
  font-size: 2.5rem;
  margin: 20px;
`;

export const BackButton = styled(Button)`
  position: relative;
  background: rgba(60, 60, 90, 0.8);

  &:hover {
    background: #64637b;
  }
`;

export const ConfirmContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  gap: 20px;
`;

// Page Navigation 스타일
export const PageNavigationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const NavigationButton = styled.img`
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

export const PageInfo = styled.div`
  font-size: 1.2rem;
  color: #ecf0f1;
  font-weight: bold;
  text-align: center;
`;

export const FooterContainer = styled.div`
  padding: 20px;
  width: calc(100% - 40px);
  display: flex;
  bottom: 10px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FooterButton = styled(Button)`
  margin-top: 20px;
  position: relative;
  background: rgba(60, 60, 90, 0.8);
  
  &:hover {
    background: #64637b;
  }
`;
