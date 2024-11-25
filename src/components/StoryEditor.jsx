import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import * as Styled from "../styles/StoryEditor.styles";
import BottomModal from './BottomModal';
import { MoonLoader } from 'react-spinners';
import HTMLFlipBook from 'react-pageflip';
import LeftArrow from '../assets/images/left-arrow.png';
import RightArrow from '../assets/images/right-arrow.png';
import { fetchChangeTitle, fetchEndStory, fetchGenImage, fetchGetStory, fetchNewStory, fetchNextStory, fetchRegenStory, fetchRequireImage, fetchRequireStory } from '../utils/api';

const EDITOR_TYPE = {
  BOOK_CREATE: 0,
  STORY_GEN: 1,
  IMAGE_GEN: 2,
  BOOK_PREVIEW: 3, 
};

function StoryEditor({ currentStory, pageReload, showToast }) {
  const storedUsername = localStorage.getItem('username');
  const [editorType, setEditorType] = useState(EDITOR_TYPE.BOOK_CREATE);
  const [prevEditorType, setPrevEditorType] = useState(EDITOR_TYPE.BOOK_CREATE);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseImage, setResponseImage] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    topic: "",
    character: "",
    background: "",
  });
  const [pages, setPages] = useState([]);
  const [currentBookTitle, setCurrentBookTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookLoading, setBookLoading] = useState(false);
  const [isStoryAdd, setStoryAdd] = useState(false);
  const [pencilBroken, setPencilBroken] = useState(false);
  const [isRequireModalOpen, setRequireModalOpen] = useState(false);
  const [isRequireImageModalOpen, setRequireImageModalOpen] = useState(false);
  const [isModifyTitleModalOpen, setModifyTitleModalOpen] = useState(false);
  const [isGenBookCoverModalOpen, setGenBookCoverModalOpen] = useState(false);
  const [storyEnd, setStoryEnd] = useState(false);

  // 다른 동화책을 선택할 때
  useEffect(() => {
    // 만약 현재 선택된 동화책이 없을 경우
    if (!currentStory || currentStory === "") { 
      // 동화책 생성 페이지로 이동한다.
      setEditorType(EDITOR_TYPE.BOOK_CREATE);
      return;
    }

    // 동화책 로드 상태로 진입한다.
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    // 동화책이 바뀌게 되면 현재 페이지를 1페이지로 설정한다.
    // 동화책 완결 여부를 거짓으로 돌려둔다.
    setBookLoading(true);
    setLoading(true);
    setCurrentPage(1);
    setStoryEnd(false);

    // 동화책 불러오는 엔드포인트로 통신 시작
    fetchGetStory({
      title: currentStory.title,
      user: storedUsername,
    }).then((response) => {
      if (response.data.result === "success") {
        console.log(response.data.data);
        // 동화책의 제목을 불러오기
        setCurrentBookTitle(currentStory.title);
        // 동화책의 전체 내용을 pages에 저장
        setPages(response.data.data);
        // 동화책의 첫 부분 내용 받아오기
        setResponseMessage(response.data.data[0].context);
        if (response.data.data[0].image) { setResponseImage(response.data.data[0].image.replace('/home/ubuntu/public_html', '')); }
        // 동화책이 끝난 상태인지 받아오기
        setStoryEnd(response.data.data[0].end === 0 ? false : true);
      }
    }).catch ((error) =>{
      console.log(error);
      // 오류가 발생하면 재로그인 요청
      showToast("다시 로그인해 주세요.", "error");
      localStorage.removeItem('username');
      localStorage.removeItem('key');
      // 페이지 새로고침
      window.location.reload();
    }).finally(() => {
      // 모든 과정이 끝나면 로딩 끝
      setLoading(false);
      // 동화책 스토리를 볼 수 있는 화면으로 이동한다.
      setEditorType(EDITOR_TYPE.STORY_GEN);
      // 동화책 로드 상태를 종료한다.
      setBookLoading(false);
    });
  }, [currentStory]);

  // 현재 동화책의 페이지 번호가 바뀌면
  useEffect(() => {
    // 현재 저장된 페이지의 길이가 0이거나 동화책 로드 상태에 있다면 코드 실행 X
    if (pages.length === 0 || isBookLoading) { return; }

    // 만약 동화가 완결이 났다면
    if (pages[0].end === 1) {
      setStoryEnd(true);
    } else {
      setStoryEnd(false);
    }
    // 현재 페이지의 텍스트 내용을 저장
    setResponseMessage(pages[currentPage-1].context);
    // 현재 페이지의 이미지를 저장
    if (pages[currentPage-1].image) {
      setResponseImage(pages[currentPage-1].image.replace('/home/ubuntu/public_html', ''));
    } else {
      setResponseImage(null);
    }
    
  }, [currentPage])

  // 현재 동화책 내용이 추가되면 자동으로 다음 페이지로 진입
  useEffect(() => {
    if (isStoryAdd) { setCurrentPage(currentPage + 1); }
    setStoryAdd(false);
  }, [pages]);

  // 인풋값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // 동화책 생성 핸들러
  const handleCreateStory = () => {
    // 만약 동화책 생성(로드) 상태라면 버튼 동작 불가
    if (isBookLoading) { return; }

    // 동화책 생성(로드) 상태로 진입
    setBookLoading(true);
    const { title, topic, character, background } = inputs;
    // 제목, 주제, 캐릭터, 배경 중 하나라도 입력을 하지 않았다면
    if (!title || !topic || !character || !background) {
      showToast("제목과 주제, 캐릭터, 배경을 모두 입력해야해요.", "warn");
      return;
    }

    // 데이터를 모두 받아오기 전까지 로딩
    // 스토리 생성 화면으로 전환
    // 페이지 텍스트 메세지를 ""으로 초기화
    setCurrentBookTitle(title);
    setLoading(true);
    setEditorType(EDITOR_TYPE.STORY_GEN);
    setResponseMessage("");
    setStoryEnd(false);

    fetchNewStory({
      title: title,
      topic: topic,
      character: character,
      background: background,
      user: storedUsername,
    }).then((response) => {
      console.log(response);
      if (response.data.result === "success") {
        // 동화책 전체 페이지 불러오기
        setPages([response.data.data]);
        // 첫 번째 페이지로 이동
        setCurrentPage(1);
        setResponseImage(null);
        setResponseMessage(response.data.data.context);
        showToast("동화책이 성공적으로 생성되었어요!", "success");
        // 동화책을 생성하였으니 이전 인풋 박스 안의 내용은 초기화
        setInputs({
          title: "",
          topic: "",
          character: "",
          background: "",
        });
        pageReload();   // 페이지 리로드(사이드바에 동화책 목록 갱신을 위해 필요)
      } else {
        // 다시 동화책 생성 페이지로 진입
        setEditorType(EDITOR_TYPE.BOOK_CREATE);
        showToast(response.data.msg, "warn");
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      // 동화책 생성(로드) 상태 종료 및 로딩 종료
      setBookLoading(false);
      setLoading(false);
    });
  };

  // 다음 내용 생성 핸들러
  const handleApplyStory = () => {
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    setLoading(true);
    // 히스토리 정제
    const formattedStories = pages
      .map(item => `[${item.pagenum}페이지] ${item.context}\n\n`)
      .join('');
    
    // 다음 내용 생성 엔드포인트로 통신
    fetchNextStory({
      storyId: pages[0].story_id,
      page: pages.length+1,
      context: formattedStories,
      user: storedUsername,
    }).then((response) => {
      if (response.data.result === "success") {
        // 연필이 부러졌을 경우 (ChatGPT로 변경하면서 필요 X)
        // setPencilBroken(true);
        // else { setPencilBroken(false); }

        // 스토리 생성 상태로 진입(자동으로 다음 페이지로 전환)
        setStoryAdd(true);
        // 페이지의 마지막 인덱스에 새로 생성한 페이지 추가
        setPages((prevPages) => [...prevPages, response.data.data]);
      } else {
        showToast(response.data.msg, "warn");
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      setLoading(false);
    });
  }

  // 내용에 대한 요청사항 버튼
  const handleRequireButton = () => {
    // 요청사항 모달창 띄우기
    setRequireModalOpen(true);
  }

  // 요청사항 핸들러
  const handleRequireStory = (text) => {
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    setLoading(true);
    // 현재 페이지 저장
    const pagenum = currentPage;
    // 히스토리 정제
    const formattedStories = pages
      .slice(0, pagenum)
      .map(item => `[${item.pagenum}페이지] ${item.context}\n\n`)
      .join('');
    
    // 요청사항을 추가한 스토리 변경 엔드포인트로 통신
    fetchRequireStory({
      storyId: pages[0].story_id,
      page: pagenum,
      context: formattedStories,
      request: text,
      user: storedUsername,
    }).then((response) => {
      if (response.data.result === "success") {
        // 연필이 부러졌을 경우 (ChatGPT로 변경하면서 필요 X)
        // setPencilBroken(true);
        // else { setPencilBroken(false); }

        // 페이지 업데이트
        const updatePages = [...pages];
        updatePages[pagenum-1] = response.data.data;
        setPages(updatePages);
        // 현재 페이지 텍스트 변경
        setResponseMessage(response.data.data.context);
      } else {
        showToast(response.data.msg, "warn");
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      // 로딩 상태 종료
      setLoading(false);
    });
  }
  
  // 내용 다시 만들기
  const handleRegenerateStory = (pagenum) => {
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    setLoading(true);
    // 히스토리 정제
    const formattedStories = pages
      .slice(0, pagenum - 1)
      .map(item => `[${item.pagenum}페이지] ${item.context}\n\n`)
      .join('');
    // 재생성할 텍스트 내용 보여주기
    const regenContext = pages[pagenum-1].context;

    // 텍스트 재생성 엔드포인트로 통신
    fetchRegenStory({
      storyId: pages[0].story_id,
      page: pagenum,
      context: formattedStories,
      rContext: regenContext,
      user: storedUsername,
    }).then((response) => {
      if (response.data.result === "success") {
        // 연필이 부러졌을 경우 (ChatGPT로 변경하면서 필요 X)
        // setPencilBroken(true);
        // else { setPencilBroken(false); }

        // 페이지 업데이트
        const updatePages = [...pages];
        updatePages[pagenum-1] = response.data.data;
        setPages(updatePages);
        // 현재 페이지 텍스트 변경
        setResponseMessage(response.data.data.context);
      } else {
        showToast(response.data.msg, "warn");
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      // 로딩 상태 종료
      setLoading(false);
    });
  }

  // 동화책 끝내기 핸들러
  const handleStoryEnd = () => {
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    setLoading(true);
    // 요청사항을 추가한 스토리 변경 엔드포인트로 통신
    fetchEndStory({
      storyId: pages[0].story_id,
      user: storedUsername,
    }).then((response) => {
      if (response.data.result === 'success') { setStoryEnd(true); }
      showToast(response.data.msg, response.data.result);
    }).finally(() => {
      setLoading(false);
    })
  }

  // 동화책 제목 변경 버튼
  const handleModifyTitleButton = () => {
    // 동화책 제목 변경 모달창 띄우기
    setModifyTitleModalOpen(true);
  };

  // 동화책 제목 변경 핸들러  
  const handleModifyTitle = (text) => {
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    setLoading(true);
    fetchChangeTitle({
      storyId: pages[0].story_id,
      newTitle: text,
      user: storedUsername
    }).then((response) => {
      if (response.data.result === "success") {
        showToast("제목이 변경되었어요.", "success");
        // 현재 보여지는 동화책 타이틀 변경
        setCurrentBookTitle(text);
        pageReload();   // 페이지 리로드(사이드바에 표시되는 동화책 제목 변경을 위해 필요)
      } else {
        showToast(response.data.msg, "warn");
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      // 로딩 상태 종료
      setLoading(false);
    });
  }

  // 스토리 만들기 화면 전환 버튼
  const handleGenStoryButton = () => {
    setEditorType(EDITOR_TYPE.STORY_GEN);
  }

  // 이미지 만들기 화면 전환 버튼
  const handleGenImageButton = () => {
    setEditorType(EDITOR_TYPE.IMAGE_GEN);
    showToast("이미지를 만들어보아요!", "success");
  };

  // 이미지 생성 핸들러
  const handleGenImage = () => {
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    setLoading(true);
    // 현재 페이지 저장
    const pagenum = currentPage;
    // 다음 내용 생성 엔드포인트로 통신
    fetchGenImage({
      storyId: pages[0].story_id,
      page: pagenum,
      user: storedUsername,
    }).then((response) => {
      if (response.data.result === 'success') {
        // 페이지 업데이트
        const updatePages = [...pages];
        updatePages[pagenum-1].image = response.data.data;
        setPages(updatePages);
        // 현재 페이지의 이미지 변경
        setResponseImage(response.data.data.replace('/home/ubuntu/public_html', ''));
        showToast(response.data.msg, 'success');
      } else {
        showToast(response.data.msg, 'error');
      }
      console.log(response);
    }).catch((error) => {
      if (axios.isCancel(error)) {
        showToast('그림을 다 그리지 못했어요...', 'error');
      } else {
        console.log(error);
      }
    }).finally(() => {
      // 로딩 상태 종료
      setLoading(false);
    });
  };

  const handleRequireImageButton = () => {
    // 동화책 이미지 요청사항 모달 띄우기
    setRequireImageModalOpen(true);
  };

  const handleRequireImage = (text) => {
    // 데이터를 모두 받아오기 전까지 로딩 화면 표시
    setLoading(true);
    // 현재 페이지 저장
    const pagenum = currentPage;
    // 다음 내용 생성 엔드포인트로 통신
    fetchRequireImage({
      storyId: pages[0].story_id,
      page: pagenum,
      reqContext: text,
      user: storedUsername,
    }).then((response) => {
      if (response.data.result === 'success') {
        // 캐싱 지우기
        pageReload();
        // 페이지 업데이트
        const updatePages = [...pages];
        updatePages[pagenum-1].image = response.data.data;
        setPages(updatePages);
        // 현재 페이지의 이미지 변경
        setResponseImage(response.data.data.replace('/home/ubuntu/public_html', ''));
        showToast(response.data.msg, 'success');
      } else {
        showToast(response.data.msg, 'error');
      }
      console.log(response);
    }).catch((error) => {
      if (axios.isCancel(error)) {
        showToast('그림을 다 그리지 못했어요...', 'error');
      } else {
        console.log(error);
      }
    }).finally(() => {
      // 로딩 상태 종료
      setLoading(false);
    });
  };

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // 이전 페이지로 변경
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1); // 다음 페이지로 변경
    }
  };

  // 이전 에디터 페이지로 이동
  const handlePreviousEditor = () => {
    setEditorType(prevEditorType);
  };

  // 동화책 프리뷰
  const handleBookPreview = () => {
    setPrevEditorType(editorType);
    setEditorType(EDITOR_TYPE.BOOK_PREVIEW);
  };
  
  // 동화책 커버 생성 버튼
  const handleGenBookCoverButton = () => {
    setGenBookCoverModalOpen(true);
  };

  // 동화책 커버 생성 핸들러
  const handleGenBookCover = (text) => {
    // func
  };

  // 동화책 공유 핸들러
  const handleShare = () => {
    const titleEncoded = encodeURIComponent(currentBookTitle);
    const usernameEncoded = encodeURIComponent(storedUsername);
    const shareLink = `${process.env.REACT_APP_URL}/share?title=${titleEncoded}&user=${usernameEncoded}`;
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        showToast('클립보드에 복사되었습니다!', 'success');
      })
      .catch((err) => {
        showToast('클립보드 복사 실패!', 'error');
        console.error('클립보드 복사 실패:', err);
      });
  };

  const stringToNumber = (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      result += charCode.toString(36); // 36진수로 변환하여 숫자 압축
    }
    return result;
  };

  const Image = forwardRef((props, ref) => {
      return (
        <Styled.Page ref={ref}>
          <div />
          {props.image && (<Styled.PageImage src={`${process.env.REACT_APP_IMG_URL}${props.image.replace('/home/ubuntu/public_html', '')}`} alt="storybook" />)}
          <Styled.PageNumber left={true}>{props.number}</Styled.PageNumber>
        </Styled.Page>
      );
    }
  );
  
  const Text = forwardRef((props, ref) => {
      return (
        <Styled.Page ref={ref}>
          <div />
          <Styled.PageText>{props.text}</Styled.PageText>
          <Styled.PageNumber left={false}>{props.number}</Styled.PageNumber>
        </Styled.Page>
      );
    }
  );

  const renderContent = () => {
    switch (editorType) {
      case EDITOR_TYPE.BOOK_CREATE:
        return (
          <Styled.InnerContainer>
            <Styled.LargeBox>
              <h2>새로운 동화책 만들기</h2>
              <Styled.Label>제목</Styled.Label>
              <Styled.TextBox
                name="title"
                placeholder="동화책의 제목을 입력하세요"
                value={inputs.title}
                onChange={handleInputChange}
                style={{ height: "22px" }}
              />
              <Styled.Label>주제</Styled.Label>
              <Styled.TextBox
                name="topic"
                placeholder="동화책의 주제를 입력하세요"
                value={inputs.topic}
                onChange={handleInputChange}
              />
              <Styled.Label>캐릭터</Styled.Label>
              <Styled.TextBox
                name="character"
                placeholder="캐릭터를 입력하세요"
                value={inputs.character}
                onChange={handleInputChange}
              />
              <Styled.Label>배경</Styled.Label>
              <Styled.TextBox
                name="background"
                placeholder="배경을 입력하세요"
                value={inputs.background}
                onChange={handleInputChange}
              />
              <Styled.Button onClick={handleCreateStory}>
                이야기 만들기
              </Styled.Button>
            </Styled.LargeBox>
          </Styled.InnerContainer>
        );
      case EDITOR_TYPE.STORY_GEN:
        return (
          <>
            <Styled.InnerContainer>
              <Styled.StoryPaperWrapper>
                <Styled.StoryTitle>{currentBookTitle}</Styled.StoryTitle>
                <Styled.StoryPaperContainer>
                  {loading ? (
                    <Styled.CenterAlignContainer>
                      <MoonLoader color="#4e3b31" loading={loading} size={80} />
                      <Styled.LoadingText>글을 쓰고 있어요...</Styled.LoadingText>
                    </Styled.CenterAlignContainer>
                  ) : (
                    <>
                      {responseMessage && (
                        <Styled.StoryPaperText>{responseMessage}</Styled.StoryPaperText>
                      )}
                      {!storyEnd && (
                        <Styled.ConfirmContainer>
                          {currentPage === pages.length && !pencilBroken && (
                            <>
                              <Styled.ApplyButton
                                onClick={handleApplyStory}
                                disabled={pencilBroken}
                              >
                                이 내용으로 할래요
                              </Styled.ApplyButton>
                              <Styled.RequireButton
                                onClick={() => handleRequireButton()}
                                disabled={pencilBroken}
                              >
                                요청사항이 있어요
                              </Styled.RequireButton>
                              <Styled.RegenButton
                                onClick={() => handleRegenerateStory(currentPage)}
                              >
                                다른 내용 만들어줘요
                              </Styled.RegenButton>
                              <Styled.RegenButton
                                onClick={handleStoryEnd}
                              >
                                이제 끝낼래요
                              </Styled.RegenButton>
                            </>
                          )}
                        </Styled.ConfirmContainer>
                      )}
                    </>
                  )}
                </Styled.StoryPaperContainer>
                {!loading && (
                  <Styled.PageNavigationContainer>
                    <Styled.NavigationButton
                      src={LeftArrow}
                      alt="Left Arrow"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      style={{
                        opacity: currentPage === 1 ? 0 : 1,
                        cursor: currentPage === 1 ? "default" : "pointer",
                      }}
                    />
                    <Styled.PageInfo>{`${currentPage} / ${pages.length}`}</Styled.PageInfo>
                    <Styled.NavigationButton
                      src={RightArrow}
                      alt="Right Arrow"
                      onClick={handleNextPage}
                      disabled={currentPage === pages.length}
                      style={{
                        opacity: currentPage === pages.length ? 0 : 1,
                        cursor: currentPage === pages.length ? "default" : "pointer",
                      }}
                    />
                  </Styled.PageNavigationContainer>
                )}
              </Styled.StoryPaperWrapper>
            </Styled.InnerContainer>
            {!loading && (
              <Styled.FooterContainer>
                {storyEnd ? (
                  <>
                    <Styled.FooterButton onClick={handleModifyTitleButton}>
                      제목 바꾸기
                    </Styled.FooterButton>
                    <Styled.FooterButton onClick={handleGenImageButton}>
                      그림 생성하기
                    </Styled.FooterButton>
                  </>
                ) : (<div></div>)}
                
                <Styled.FooterButton onClick={handleBookPreview}>
                  책 미리보기
                </Styled.FooterButton>
              </Styled.FooterContainer>
            )}
          </>
        );
      case EDITOR_TYPE.IMAGE_GEN:
        return (
          <>
            <Styled.InnerContainer>
              <Styled.StoryPaperWrapper>
                <Styled.StoryTitle>{currentBookTitle}</Styled.StoryTitle>
                <Styled.StoryPaperContainer>
                  {loading ? (
                    <Styled.CenterAlignContainer>
                      <MoonLoader color="#4e3b31" loading={loading} size={80} />
                      <Styled.LoadingText>그림을 그리고 있어요...</Styled.LoadingText>
                    </Styled.CenterAlignContainer>
                  ) : (
                    <>
                      {responseMessage && (
                        <Styled.CenterAlignContainer>
                          {responseImage &&
                            <Styled.GeneratedImage 
                              src={`${process.env.REACT_APP_IMG_URL}${responseImage}`}
                              alt="Image" 
                            />
                          }
                          
                          <Styled.ImagePaperText>{responseMessage}</Styled.ImagePaperText>
                        </Styled.CenterAlignContainer>
                      )}
                      <Styled.ConfirmContainer>
                        <Styled.ApplyButton
                          onClick={handleGenImage}
                          disabled={pencilBroken}
                        >
                          그림을 생성할래요
                        </Styled.ApplyButton>
                        <Styled.RequireButton
                          onClick={handleRequireImageButton}
                          disabled={pencilBroken}
                        >
                          요청사항이 있어요
                        </Styled.RequireButton>
                      </Styled.ConfirmContainer>
                    </>
                  )}
                </Styled.StoryPaperContainer>
                {!loading && (
                  <Styled.PageNavigationContainer>
                    <Styled.NavigationButton
                      src={LeftArrow}
                      alt="Left Arrow"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      style={{
                        opacity: currentPage === 1 ? 0 : 1,
                        cursor: currentPage === 1 ? "default" : "pointer",
                      }}
                    />
                    <Styled.PageInfo>{`${currentPage} / ${pages.length}`}</Styled.PageInfo>
                    <Styled.NavigationButton
                      src={RightArrow}
                      alt="Right Arrow"
                      onClick={handleNextPage}
                      disabled={currentPage === pages.length}
                      style={{
                        opacity: currentPage === pages.length ? 0 : 1,
                        cursor: currentPage === pages.length ? "default" : "pointer",
                      }}
                    />
                  </Styled.PageNavigationContainer>
                )}
              </Styled.StoryPaperWrapper>
            </Styled.InnerContainer>
            {!loading && (
              <Styled.FooterContainer>
                {storyEnd ? (
                  <>
                    <Styled.FooterButton onClick={handleModifyTitleButton}>
                      제목 바꾸기
                    </Styled.FooterButton>
                    <Styled.FooterButton onClick={handleGenStoryButton}>
                      이야기 생성하기
                    </Styled.FooterButton>
                  </>
                ) : (<div></div>)}
                
                <Styled.FooterButton onClick={handleBookPreview}>
                  책 미리보기
                </Styled.FooterButton>
              </Styled.FooterContainer>
            )}
          </>
        );
      case EDITOR_TYPE.BOOK_PREVIEW:
        return (
          <>
            <Styled.InnerContainer>
              <HTMLFlipBook
                width={500}
                height={500}
                minWidth={520}
                maxWidth={520}
                maxShadowOpacity={0.7}
                showCover={true}
                mobileScrollSupport={false}
              >
                <Styled.PageCover key={1}>
                  <Styled.PageCoverTitle>
                    {currentBookTitle}
                  </Styled.PageCoverTitle>
                </Styled.PageCover>
                {(() => {
                  const bookPages = [];
                  for (let i = 0; i < pages.length; i += 1) {
                    const page = pages[i];

                    bookPages.push(<Image key={`${i+1}-image`} image={page.image} number={i*2 + 1} />);
                    bookPages.push(<Text key={`${i+1}-text`} text={page.context} number={i*2 + 2} />);
                  }
                  return bookPages;
                })()}
              </HTMLFlipBook>
            </Styled.InnerContainer>
            <Styled.FooterContainer>
              <Styled.BackButton onClick={handlePreviousEditor}>뒤로가기</Styled.BackButton>
              <Styled.BackButton onClick={handleGenBookCoverButton}>표지 꾸미기</Styled.BackButton>
              <Styled.BackButton onClick={handleShare}>공유하기</Styled.BackButton>
            </Styled.FooterContainer>
          </>
        );
    }
  }

  return (
    <Styled.MainContainer>
      {renderContent()}
      {isRequireModalOpen && (
        <BottomModal
          modalType="require"
          onClose={() => setRequireModalOpen(false)}
          onConfirm={handleRequireStory}
        />
      )}
      {isRequireImageModalOpen && (
        <BottomModal
          modalType="require"
          onClose={() => setRequireImageModalOpen(false)}
          onConfirm={handleRequireImage}
        />
      )}
      {isModifyTitleModalOpen && (
        <BottomModal
          modalType="modifyTitle"
          onClose={() => setModifyTitleModalOpen(false)}
          onConfirm={handleModifyTitle}
        />
      )}
      {isGenBookCoverModalOpen && (
        <BottomModal
          modalType="genBookCover"
          onClose={() => setGenBookCoverModalOpen(false)}
          onConfirm={handleGenBookCover}
        />
      )}
    </Styled.MainContainer>
  );
}

export default StoryEditor;