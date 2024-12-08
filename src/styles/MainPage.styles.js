import styled from "styled-components";
import palette from "./styles";

// MainPage Wrapper
export const MainPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #2d2a4a, #1b1a33);
  position: relative;
  overflow: hidden;
`;

// Sidebar 스타일 (변경 없음)
export const Sidebar = styled.div`
  width: 290px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(60, 60, 90, 0.8);
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  padding: 0px;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  z-index: 10;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const SidebarNeck = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`;

export const SidebarBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  overflow-y: auto;
  overflow-x: hidden;

  padding-left: 20px;
  padding-right: 10px;
  margin-right: 10px;
`;

export const LunarIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

// 동화책 버튼 스타일
export const StoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  margin: 5px 0;
  background: transparent;
  color: #ecf0f1;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px 10px 0 0;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s ease, border-bottom-color 0.3s ease;

  &:hover {
    background: #64637b;
    border-bottom-color: #ffffff;
  }
`;

export const StoryTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 50px);
  display: inline-block;
`;

export const KebabMenuWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: auto;
`;

export const DeleteButton = styled.img`
  width: 20px;
  height: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: -8px;
`;

// 로그아웃 버튼 스타일
export const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  background: #e74c3c;
  color: #383755;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

export const SideFooterContainer = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const SideFooterButton = styled.button`
  background: none;
  border: 0px solid transparent;
  color: ${palette.white};
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    color: ${palette.gray};
  }
`;

export const SideFooterText = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  background: none;
  border: 0px solid transparent;
  color: ${palette.white};
  font-size: 0.84rem;
  text-align: center;
  z-index: 10;
  transition: all 0.3s ease;
`;

// 새로운 동화책 만들기 버튼 스타일
export const NewBookButton = styled.button`
  padding: 15px;
  width: 250px;
  height: 50px;
  background: ${palette.yellow};
  color: #383755;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #bea231;
  }
`;

// MainContent
export const MainContent = styled.div`
  flex: 1; /* 나머지 공간을 차지하도록 설정 */
  margin-left: 290px; /* Sidebar 너비만큼 여백 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 높이를 Sidebar와 일치 */
  background: transparent;
`;
