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
  padding: 40px;
  padding-bottom: 90px;
  position: relative;
  justify-content: center;
  align-items: center;
  min-width: 50vw;
  max-width: 50vw;
  min-height: 400px;
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

export const StoryPaperText = styled.div`
  display: block;
  color: #4e3b31;
  text-align: center;
  font-size: 2.5rem;
  margin: 20px;
  max-height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const BackButton = styled(Button)`
  position: relative;
  background: rgba(60, 60, 90, 0.8);

  &:hover {
    background: #64637b;
  }
`;

export const ConfirmContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  bottom: 10px;
  display: flex;
  gap: 20px;
`;

// IMAGE_GEN 화면 스타일
export const GeneratedImage = styled.img`
  width: 280px;
  margin-bottom: 10px;
  display: block;
`;

export const ImagePaperText = styled(StoryPaperText)`
  font-size: 1.8rem;
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

export const CenterAlignContainer = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
`

export const LoadingText = styled.p`
  display: block;
  color: #4e3b31;
  text-align: center;
  font-size: 1.8rem;
  margin: 20px;
  margin-top: 40px;
`

// Page Style
export const PageCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dc143c;
  color: #785e3a;
  border: none;
  text-align: center;
  font-size: 2.5rem;
  overflow: hidden;
`;

export const PageCoverTitle = styled.div`
  background-color: #ffffff;
  color: #000000;
  font-size: 2rem;
  font-weight: bold;
  padding: 20px 40px;
  border-radius: 50px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: inline-block;
  text-align: center;
  line-height: 1.2;
  margin: 20px;
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #fdfaf7;
  background-image: url(${require('../assets/images/book_page.png')});
  background-size: cover;
  background-position: center;
  color: #785e3a;
  border: solid 1px #c2b5a3;
  text-align: center;
  font-size: 2.5rem;
  overflow: hidden;
`;

export const PageImage = styled.img`
  width: 80%;
  margin: auto;
`

export const PageText = styled.p`
  padding: 20px;
  margin: auto;
  width: calc(100% - 40px);
  text-align: center;
  font-size: 2.8rem;
`

export const PageNumber = styled.p`
  position: absolute;
  font-size: 1.0rem;
  bottom: 10px;
  ${({ left }) => left ? 'left: 20px;' : 'right: 20px;'}
`;