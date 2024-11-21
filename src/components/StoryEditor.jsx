import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Styled from "../styles/StoryEditor.styles";
import Modal from './Modal';
import { MoonLoader } from 'react-spinners';
import HTMLFlipBook from 'react-pageflip';
import LeftArrow from '../assets/images/left-arrow.png';
import RightArrow from '../assets/images/right-arrow.png';

function StoryEditor({ currentStory, pageReload, showToast }) {
  const storedUsername = localStorage.getItem('username');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    topic: "",
    character: "",
    background: "",
  });
  const [pages, setPages] = useState([]);
  const [currentStoryTitle, setCurrentStoryTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isStoryCreating, setStoryCreating] = useState(false);
  const [isStoryAdd, setStoryAdd] = useState(false);
  const [pencilBroken, setPencilBroken] = useState(false);
  const [isRequireModalOpen, setRequireModalOpen] = useState(false);
  const [isModifyTitleModalOpen, setModifyTitleModalOpen] = useState(false);
  const [storyEnd, setStoryEnd] = useState(false);

  useEffect(() => {
    if (!currentStory) { 
      console.log(step);
      setStep(0); 
      return;
    }
    setLoading(true);
    setCurrentPage(1);
    axios.post(`${process.env.REACT_APP_API_URL}/getstory?title=${currentStory.title}&user=${storedUsername}`, {
      // Body Empty
    }).then((response) => {
      if (response.data.result === "success") {
        console.log(response.data.data);
        setResponseMessage(response.data.data[0].context);
        setPages(response.data.data);
        setCurrentStoryTitle(currentStory.title);
      }
    }).catch ((error) =>{
      showToast("다시 로그인해 주세요.", "error");
      localStorage.removeItem('username');
      localStorage.removeItem('key');
      // 페이지 새로고침
      window.location.reload();
    }).finally((response) => {
      setLoading(false);
    });
    setStep(1);
    console.log(step);
    
  }, [currentStory]);

  useEffect(() => {
    if (pages.length === 0 || isStoryCreating) { return; }
    console.log(currentPage);
    console.log(pages[currentPage-1]);
    if (pages[currentPage-1].context.includes("동화 끝~!")) {
      setResponseMessage("동화가 모두 끝났어요~!!");
      setStoryEnd(true);
    } else if (pages[currentPage-1].context.includes('연필이 부러졌어요. \'다른 내용 만들어줘요\' 버튼을 눌러 새로운 연필을 주세요!')) {
      setPencilBroken(true);
      setResponseMessage(pages[currentPage-1].context);
     } else {
      setResponseMessage(pages[currentPage-1].context);
      setStoryEnd(false);
    }
  }, [currentPage])

  useEffect(() => {
    if (isStoryAdd) { setCurrentPage(currentPage + 1); }
    setStoryAdd(false);
  }, [pages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };



  const handleCreateStory = () => {
    setStoryCreating(true);
    const { title, topic, character, background } = inputs;
    if (!title || !topic || !character || !background) {
      showToast("제목과 주제, 캐릭터, 배경을 모두 입력해야해요.", "warn");
      return;
    }
    setStep(1);
    setLoading(true);
    setResponseMessage("");

    axios.post(`${process.env.REACT_APP_API_URL}/newstory?title=${title}&topic=${topic}&character=${character}&background=${background}&user=${storedUsername}`, {

    }).then((response) => {
      if (response.data.result === "success") {
        setCurrentPage(1);
        showToast("동화책이 성공적으로 생성되었어요!", "success");
        console.log(response.data.data);
        setPages([response.data.data]);
        pageReload();
      } else {
        showToast("이미 존재하는 책 제목이에요. 다른 이름으로 정해주세요.", "warn");
        setStep(0);
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      setInputs({
        title: "",
        topic: "",
        character: "",
        background: "",
      });
      setStoryCreating(false);
      setLoading(false);
    });
  };

  // 다음 내용 만들기
  const handleApplyStory = () => {
    setLoading(true);
    // 히스토리 정제
    const formattedStories = pages
      .map(item => `[${item.pagenum}페이지] ${item.context}\n\n`)
      .join('');
    axios.post(`${process.env.REACT_APP_API_URL}/nextstory?story_id=${pages[0].story_id}&page=${pages.length+1}&context=${formattedStories}&user=${storedUsername}`, {

    }).then((response) => {
      if (response.data.result === "success") {
        if (response.data.data.context.includes('연필이 부러졌어요. \'다른 내용 만들어줘요\' 버튼을 눌러 새로운 연필을 주세요!')) {
          setPencilBroken(true);
        } else {
          setPencilBroken(false);
        }
        setStoryAdd(true);
        setPages((prevPages) => [...prevPages, response.data.data]);
      } else {
        console.log(response.data);
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      setLoading(false);
    });
  }

  // 내용에 대한 요청사항 보내기
  const handleRequireButton = () => {
    setRequireModalOpen(true);
  }

  const handleRequireStory = (text) => {
    setLoading(true);
    const pagenum = currentPage;
    // 히스토리 정제
    const formattedStories = pages
      .slice(0, pagenum)
      .map(item => `[${item.pagenum}페이지] ${item.context}\n\n`)
      .join('');
    axios.post(`${process.env.REACT_APP_API_URL}/reqstory?story_id=${pages[0].story_id}&page=${pages.length+1}&context=${formattedStories}&request=${text}&user=${storedUsername}`, {

    }).then((response) => {
      if (response.data.result === "success") {
        if (response.data.data.context.includes('연필이 부러졌어요. \'다른 내용 만들어줘요\' 버튼을 눌러 새로운 연필을 주세요!')) {
          setPencilBroken(true);
        } else {
          setPencilBroken(false);
        }
        const updatePages = [...pages];
        updatePages[pagenum-1] = response.data.data;
        setPages(updatePages);
        setResponseMessage(response.data.data.context);
      } else {
        console.log(response.data);
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      setLoading(false);
    });
  }
  
  // 내용 다시 만들기
  const handleRegenerateStory = (pagenum) => {
    setLoading(true);
    // 히스토리 정제
    const formattedStories = pages
      .slice(0, pagenum - 1)
      .map(item => `[${item.pagenum}페이지] ${item.context}\n\n`)
      .join('');
    const regenContext = pages[pagenum-1].context;
    axios.post(`${process.env.REACT_APP_API_URL}/regenstory?story_id=${pages[0].story_id}&page=${pages.length+1}&context=${formattedStories}&r_context=${regenContext}&user=${storedUsername}`, {

    }).then((response) => {
      if (response.data.result === "success") {
        console.log(response.data.data);
        if (response.data.data.context.includes('연필이 부러졌어요. \'다른 내용 만들어줘요\' 버튼을 눌러 새로운 연필을 주세요!')) {
          showToast("연필이 부러졌네요. 다시 시도해보아요.", "info");
          setPencilBroken(true);
        } else {
          setPencilBroken(false);
        }
        const updatePages = [...pages];
        updatePages[pagenum-1] = response.data.data;
        setPages(updatePages);
        setResponseMessage(response.data.data.context);
      } else {
        console.log(response.data);
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      setLoading(false);
    });
  }

  const handleModifyTitleButton = () => {
    setModifyTitleModalOpen(true);
  };

  
  const handleModifyTitle = (text) => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API_URL}/chtitle?story_id=${pages[0].story_id}&newtitle=${text}&user=${storedUsername}`, {

    }).then((response) => {
      if (response.data.result === "success") {
        showToast("제목이 변경되었어요.", "success");
        setCurrentStoryTitle(text);
        pageReload();
      } else {
        console.log(response.data);
      }
    }).catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      showToast("API 요청 중 오류가 발생했어요.", "error");
    }).finally(() => {
      setLoading(false);
    });
  }

  const handleCreateImage = () => {
    showToast("이미지 생성은 다음 시간에 해보아요", "error");
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

  const handlePreviousStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleBookPreview = () => {
    setStep(2);
  };

  return (
    <Styled.MainContainer>
      {step === 0 && (
        <Styled.InnerContainer>
          <Styled.LargeBox>
            <h2>새로운 동화책 만들기</h2>
            <Styled.Label>제목</Styled.Label>
            <Styled.TextBox
              name="title"
              placeholder="동화책의 제목을 입력하세요"
              value={inputs.title}
              onChange={handleInputChange}
              style={{"height": "22px"}}
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
      )}

      {step === 1 && (
        <>
          <Styled.InnerContainer>
            <Styled.StoryPaperWrapper>
              <Styled.StoryTitle>
                {currentStoryTitle}
              </Styled.StoryTitle>
              <Styled.StoryPaperContainer>
                {loading ? (
                  <MoonLoader color="#4e3b31" loading={loading} size={100} />
                ) : (
                  <>
                    {responseMessage && <Styled.StoryPaperText>{responseMessage}</Styled.StoryPaperText>}
                    {storyEnd ? (
                      <Styled.ConfirmContainer>
                        <Styled.ApplyButton onClick={handleModifyTitleButton}>제목을 바꾸고 싶어요</Styled.ApplyButton>
                        <Styled.RegenButton onClick={handleCreateImage}>삽화를 그릴래요</Styled.RegenButton>
                      </Styled.ConfirmContainer>
                    ) : (
                      <Styled.ConfirmContainer>
                        {(currentPage === pages.length && !pencilBroken) && <Styled.ApplyButton onClick={handleApplyStory} disabled={pencilBroken}>이 내용으로 할래요</Styled.ApplyButton>}
                        {(currentPage === pages.length && !pencilBroken) && <Styled.RequireButton onClick={() => handleRequireButton()} disabled={pencilBroken}>요청사항이 있어요</Styled.RequireButton>}
                        {currentPage === pages.length && <Styled.RegenButton onClick={() => handleRegenerateStory(currentPage)} >다른 내용 만들어줘요</Styled.RegenButton>}
                      </Styled.ConfirmContainer>
                    )}
                  </>
                )
              }
              </Styled.StoryPaperContainer>
              {!loading && (
                <Styled.PageNavigationContainer>
                  <Styled.NavigationButton 
                    src={LeftArrow} 
                    alt="Left Arrow" 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    style={{ opacity: currentPage === 1 ? 0 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
                  />
                  <Styled.PageInfo>
                    {`${currentPage} / ${pages.length}`}
                  </Styled.PageInfo>
                  <Styled.NavigationButton 
                    src={RightArrow} 
                    alt="Right Arrow" 
                    onClick={handleNextPage} 
                    disabled={currentPage === pages.length}
                    style={{ opacity: currentPage === pages.length ? 0 : 1, cursor: currentPage === pages.length ? 'default' : 'pointer' }}
                  />
                </Styled.PageNavigationContainer>
              )}
            </Styled.StoryPaperWrapper>
          </Styled.InnerContainer>
          {!loading && (
            <Styled.FooterContainer>
              <div />
              <Styled.FooterButton primary onClick={handleBookPreview}>
                책 미리보기
              </Styled.FooterButton>
            </Styled.FooterContainer>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <Styled.InnerContainer>
            <HTMLFlipBook
              width={300}
              height={400}
              size={"stretch"}
              minWidth={300}
              maxWidth={520}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={false}
            >
              <Styled.Page key={1}>
                {currentStoryTitle}
              </Styled.Page>
              {pages.map((page) => (
                <Styled.Page key={page.pagenum}>
                  {page.context}
                </Styled.Page>
                
              ))}
            </HTMLFlipBook>
          </Styled.InnerContainer>
          <Styled.FooterContainer>
            <Styled.BackButton onClick={handlePreviousStep}>뒤로가기</Styled.BackButton>
          </Styled.FooterContainer>
        </>
      )}

      {isRequireModalOpen && (
        <Modal
          modalType={"require"} 
          onClose={() => setRequireModalOpen(false)}
          onConfirm={handleRequireStory}
        />
      )}

      {isModifyTitleModalOpen && (
        <Modal
          modalType={"modifyTitle"} 
          onClose={() => setModifyTitleModalOpen(false)}
          onConfirm={handleModifyTitle}
        />
      )}
    </Styled.MainContainer>
  );
}

export default StoryEditor;