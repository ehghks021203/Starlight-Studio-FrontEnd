// react
import React, { useState, useEffect } from "react";
// axios api
import axios from "axios";
import { fetchDeleteStory, fetchUserLogin } from "../utils/api";
// styles & components
import * as Styled from "../styles/MainPage.styles";
import palette from "../styles/styles";
import PopupModal from "./PopupModal";
import { SyncLoader } from "react-spinners";
import StarryBackground from "./StarryBackground";
import StoryEditor from "./StoryEditor";
import LunarIcon from "../assets/images/lunar-icon.png";
import TrashIcon from "../assets/svgs/trash.svg";
import InformationPage from "./InformationPage";
import LicenseModal from "./LicenseModal";

function MainPage({ onLogin, showToast }) {
  const [isLoading, setLoading] = useState(true); // 로딩 상태 관리
  const [storyList, setStoryList] = useState([]); // 동화책 목록 데이터
  const [currentStory, setCurrentStory] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLicenseOpen, setLicenseOpen] = useState(false);

  // 페이지 첫 렌더링 시 실행
  useEffect(() => {
    pageReload();
  }, []);

  // 페이지 리로드 함수
  const pageReload = () => {
    const storedUsername = localStorage.getItem("username");
    const storedAuthCode = localStorage.getItem("key");
    fetchUserLogin({
      user: storedUsername,
      key: storedAuthCode,
    })
      .then((response) => {
        if (response.data.result === "success") {
          setStoryList(response.data.data); // 동화책 데이터 저장
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          showToast("다시 로그인 해 주세요.", "error");
          //localStorage.removeItem("username");
          //localStorage.removeItem("key");
          //window.location.reload();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 새로운 동화책 만들기 핸들러
  const handleNewBook = () => {
    if (!currentStory) {
      setCurrentStory("");
    } else {
      setCurrentStory(null);
    }
  };

  // 동화책 열기 핸들러
  const handleOpenStory = (story) => {
    console.log(story);
    setCurrentStory(story);
  };

  const handleDeleteStoryButton = (story) => {
    setModalData({ id: story.id, title: story.title });
    setModalOpen(true);
  };

  // 동화책 삭제하기 핸들러
  const handleDeleteStory = (storyId) => {
    const storedUsername = localStorage.getItem("username");
    fetchDeleteStory({
      storyId: storyId,
      user: storedUsername,
    })
      .then((response) => {
        if (response.data.result === "success") {
          showToast("이야기가 삭제되었습니다.", "success");
          setStoryList((prevList) =>
            prevList.filter((story) => story.id !== storyId)
          ); // 로컬 상태 업데이트
          if (currentStory) {
            if (storyId === currentStory.id) {
              setCurrentStory(null);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
        showToast("이야기 삭제 중 오류가 발생했습니다.", "error");
      });
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("key");
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
            <h2>{localStorage.getItem("username")}의 동화책</h2>
          </Styled.SidebarHeader>
          <Styled.SidebarNeck>
            <Styled.NewBookButton onClick={handleNewBook}>
              새로운 동화책 만들기
            </Styled.NewBookButton>
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
                  style={
                    isSelected
                      ? { background: "#64637b", cursor: "default" }
                      : { cursor: "pointer" }
                  }
                >
                  <Styled.StoryTitle>
                    {story.title || "제목 없음"}
                  </Styled.StoryTitle>
                  <Styled.KebabMenuWrapper>
                    <Styled.DeleteButton
                      src={TrashIcon}
                      onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트 전파 차단
                        handleDeleteStoryButton(story);
                      }}
                    />
                  </Styled.KebabMenuWrapper>
                </Styled.StoryButton>
              );
            })
          )}
        </Styled.SidebarBody>
        <Styled.LogoutButton onClick={handleLogout}>
          로그아웃
        </Styled.LogoutButton>
        <Styled.SideFooterContainer>
          <Styled.SideFooterButton onClick={() => setLicenseOpen(true)}>
            라이선스 표시
          </Styled.SideFooterButton>
          <Styled.SideFooterButton>이용약관</Styled.SideFooterButton>
          <Styled.SideFooterButton>개인정보처리방침</Styled.SideFooterButton>
        </Styled.SideFooterContainer>
        <Styled.SideFooterText>
          Copyright 2024. HCI. All rights reserved.
        </Styled.SideFooterText>
      </Styled.Sidebar>
      <Styled.MainContent>
        <StoryEditor
          currentStory={currentStory}
          pageReload={pageReload}
          showToast={showToast}
        />
      </Styled.MainContent>

      {isModalOpen && (
        <PopupModal
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeleteStory}
          storyId={modalData.id}
          storyTitle={modalData.title}
        />
      )}

      {isLicenseOpen && <LicenseModal onClose={() => setLicenseOpen(false)} />}
    </Styled.MainPageWrapper>
  );
}

export default MainPage;
