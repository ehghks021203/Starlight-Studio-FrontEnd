import React, { useState, useEffect, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import * as Styled from "../styles/ShareMyBook.styles";
import HTMLFlipBook from "react-pageflip";
import Loading from "./Loading";
import StarryBackground from "./StarryBackground";
import { fetchGetStoryById } from "../utils/api";

// Image 컴포넌트
const Image = forwardRef(({ image, number }, ref) => (
  <Styled.Page ref={ref}>
    {image && (
      <Styled.PageImage
        src={`${process.env.REACT_APP_IMG_URL}${image.replace(
          "/home/ubuntu/public_html",
          ""
        )}`}
        alt="storybook"
      />
    )}
    <Styled.PageNumber left={true}>{number}</Styled.PageNumber>
  </Styled.Page>
));

// Text 컴포넌트
const Text = forwardRef(({ text, number }, ref) => (
  <Styled.Page ref={ref}>
    <Styled.PageText>{text}</Styled.PageText>
    <Styled.PageNumber left={false}>{number}</Styled.PageNumber>
  </Styled.Page>
));

const ShareMyBook = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [storyId, setStoryId] = useState(null);
  const [currentBookTitle, setCurrentBookTitle] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentBookCover, setCurrentBookCover] = useState(null);

  // 동화책 데이터를 불러오는 로직
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      setLoading(true);
      fetchGetStoryById({ storyId: id })
        .then((response) => {
          if (response.data.result === "success") {
            console.log(response.data);
            setCurrentBookTitle(response.data.data[0].title);
            setCurrentUsername(response.data.data[0].username);
            setCurrentBookCover(
              response.data.data[0].cover.replace(
                "/home/ubuntu/public_html",
                ""
              )
            );
            setStoryId(id);
            setPages(response.data.data);
          }
        })
        .catch((error) => {
          console.error("동화책 데이터를 불러오는 데 실패했습니다:", error);
          setStoryId(null);
        })
        .finally(() => setLoading(false));
    }
  }, [location]);

  // PDF 생성 함수
  const exportToPDF = async () => {};

  // FlipBook 페이지 생성 함수
  const renderPages = () => {
    if (!pages || pages.length === 0) {
      console.error("Pages 배열이 비어 있습니다.");
      return [];
    }

    const bookPages = pages.map((page, index) => [
      <Image
        key={`${index}-image`}
        image={page.image}
        number={index * 2 + 1}
      />,
      <Text key={`${index}-text`} text={page.context} number={index * 2 + 2} />,
    ]);

    return bookPages.flat();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (storyId) {
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
            className="html-flip-book"
          >
            <Styled.PageCover
              key={1}
              bgImage={
                currentBookCover
                  ? `${
                      process.env.REACT_APP_IMG_URL
                    }${currentBookCover}?time=${new Date().getTime()}`
                  : "none"
              }
            >
              <Styled.PageCoverTitle>{currentBookTitle}</Styled.PageCoverTitle>
              <Styled.PageCoverAuthor>{currentUsername}</Styled.PageCoverAuthor>
            </Styled.PageCover>
            {(() => {
              const renderedPages = renderPages();
              return renderedPages;
            })()}
          </HTMLFlipBook>
        </Styled.InnerContainer>
        <Styled.FooterContainer>
          {/*<Styled.FooterButton onClick={exportToPDF}>PDF로 내보내기</Styled.FooterButton>*/}
        </Styled.FooterContainer>
      </Styled.ShareWrapper>
    );
  }

  return (
    <Styled.ShareWrapper>
      <StarryBackground />
      <Styled.InnerContainer>
        <Styled.InnerText>올바른 동화책 id가 아니에요.</Styled.InnerText>
      </Styled.InnerContainer>
    </Styled.ShareWrapper>
  );
};

export default ShareMyBook;
