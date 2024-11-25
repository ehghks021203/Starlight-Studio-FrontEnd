import React, { useState, useEffect, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import * as Styled from "../styles/ShareMyBook.styles";
import Modal from './BottomModal';
import { MoonLoader } from 'react-spinners';
import HTMLFlipBook from 'react-pageflip';
import Loading from './Loading';
import StarryBackground from './StarryBackground';
import { fetchGetStory, fetchNewStory } from '../utils/api';

const ShareMyBook = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentBookTitle, setCurrentBookTitle] = useState("");
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const user = params.get('user');
    const title = params.get('title');
    if (user && title) {
      const decodedTitle = decodeURIComponent(title);
      const decodedUsername = decodeURIComponent(user);
      console.log("Decoded Title: ", decodedTitle);
      console.log("Decoded Username: ", decodedUsername);
      setLoading(true);

      // 동화책 불러오는 엔드포인트로 통신 시작
      fetchGetStory({
        title: decodedTitle,
        user: decodedUsername,
      }).then((response) => {
        if (response.data.result === "success") {
          console.log(response.data.data);
          // 동화책의 제목을 불러오기
          setCurrentBookTitle(decodedTitle);
          // 동화책의 전체 내용을 pages에 저장
          setPages(response.data.data);
        }
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        // 모든 과정이 끝나면 로딩 끝
        setLoading(false);
      });
    }
  }, [location]);

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

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <Styled.ShareWrapper>
      <StarryBackground />
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
    </Styled.ShareWrapper>
  );
};
    
export default ShareMyBook;
    