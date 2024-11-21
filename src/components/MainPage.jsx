import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Styled from "../styles/MainPage.styles";
import palette from '../styles/styles';
import { SyncLoader } from 'react-spinners';
import StoryEditor from './StoryEditor';
import StarryBackground from './StarryBackground';
import LunarIcon from '../assets/images/lunar-icon.png';
import TrashIcon from '../assets/svgs/trash.svg';


function MainPage({ onLogin, showToast }) {
  const [isLoading, setLoading] = useState(true); // 로딩 상태 관리
  const [storyList, setStoryList] = useState([]); // 동화책 목록 데이터
  const [currentStory, setCurrentStory] = useState(null);

  useEffect(() => {
    pageReload();
  }, []);

  const pageReload = () => {
    const storedUsername = localStorage.getItem('username');
    const storedAuthCode = localStorage.getItem('key');
    axios.post(`${process.env.REACT_APP_API_URL}/user?user=${storedUsername}&key=${storedAuthCode}`, {
      // Body Empty
    }).then((response) => {
      if (response.data.result === "success") {
        setStoryList(response.data.data); // 동화책 데이터 저장
      }
    }).catch((error) => {
      showToast("다시 로그인 해 주세요.", "error");
      localStorage.removeItem('username');
      localStorage.removeItem('key');
      window.location.reload();
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleNewBook = () => {
    setCurrentStory(null);
  };

  const handleOpenStory = (story) => {
    setCurrentStory(story);
  };

  const handleDeleteStory = (storyId) => {
    const storedUsername = localStorage.getItem('username');
    axios.post(`${process.env.REACT_APP_API_URL}/delstory?story_id=${storyId}&user=${storedUsername}`, {
      // Body Empty
    }).then((response) => {
      if (response.data.result === "success") {
        showToast("이야기가 삭제되었습니다.", "success");
        setStoryList((prevList) => prevList.filter((story) => story.id !== storyId)); // 로컬 상태 업데이트
        if (currentStory) {
          if (storyId === currentStory.id) { setCurrentStory(null); }
        }
      }
    }).catch((error) => {
      console.log(error);
      showToast("이야기 삭제 중 오류가 발생했습니다.", "error");
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('key');
    showToast("로그아웃되었습니다.", "success");
    window.location.reload();
  };

  return (
    <Styled.MainPageWrapper>
      <StarryBackground />
      <Styled.Sidebar>
        <div>
          <Styled.SidebarHeader>
            <Styled.LunarIcon src={LunarIcon} alt="Lunar Icon" />
            <h2>{localStorage.getItem('username')}의 동화책</h2>
          </Styled.SidebarHeader>
          <Styled.SidebarNeck>
            <Styled.NewBookButton onClick={handleNewBook}>새로운 동화책 만들기</Styled.NewBookButton>
            <p>최근에 만든 동화책이에요.</p>
          </Styled.SidebarNeck>
        </div>
        <Styled.SidebarBody>
          {isLoading ? (
            <div style={{ margin: "10px" }}>
              <SyncLoader color={palette.yellow} height={500} size={8} />
            </div>
          ) : (
            storyList.map((story) => {
              const isSelected = currentStory === story.title;
              return (
                <Styled.StoryButton
                  key={story.id}
                  onClick={isSelected ? null : () => handleOpenStory(story)}
                  style={isSelected ? { background: "#64637b", cursor: "default" } : { cursor: "pointer" }}
                >
                  <Styled.StoryTitle>{story.title || "제목 없음"}</Styled.StoryTitle>
                  <Styled.KebabMenuWrapper>
                    <Styled.DeleteButton
                      src={TrashIcon}
                      onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트 전파 차단
                        handleDeleteStory(story.id);
                      }}
                    />
                  </Styled.KebabMenuWrapper>
                </Styled.StoryButton>
              );
            })
          )}
        </Styled.SidebarBody>
        <Styled.LogoutButton onClick={handleLogout}>로그아웃</Styled.LogoutButton>
      </Styled.Sidebar>
      <Styled.MainContent>
        <StoryEditor 
          currentStory={currentStory} 
          pageReload={pageReload}
          showToast={showToast} 
        />
      </Styled.MainContent>

      
    </Styled.MainPageWrapper>
  );
}

export default MainPage;
