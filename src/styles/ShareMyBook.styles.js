import styled from "styled-components";
import palette from "./styles";

export const ShareWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #2d2a4a, #1b1a33);
  position: relative;
  overflow: hidden;
`;

export const InnerContainer = styled.div`
  width: 100%;
  flex: 1; /* InnerContainer가 남은 공간을 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; /* FooterContainer를 기준으로 배치 가능 */
`;

export const InnerText = styled.p`
  font-size: 1.5rem;
  color: #ecf0f1;
`;

// Page Style
export const PageCover = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  justify-content: space-between;

  background-color: #d8c8a4;
  background-image: ${(props) =>
    props.bgImage ? `url(${props.bgImage})` : "none"};
  background-size: cover;
  background-position: center;
  color: #785e3a;
  border: none;
  text-align: center;
  font-size: 2.5rem;

  overflow: hidden;
`;

export const PageCoverTitle = styled.div`
  width: calc(100% - 120px);
  color: #000000; /* 글자 색은 검정색으로 유지 */
  font-size: 2rem;
  font-weight: bold;
  padding: 20px 40px;
  border-radius: 50px;
  display: inline-block;
  text-align: center;
  line-height: 1.2;
  margin: 20px;
  background-color: transparent; /* 배경 제거 */

  /* 글자 테두리 효과 */
  text-shadow: 2px 2px 0px #ffffff, -2px -2px 0px #ffffff, 2px -2px 0px #ffffff,
    -2px 2px 0px #ffffff;
`;

export const PageCoverAuthor = styled.div`
  background-color: #ffffff;
  color: #000000;
  font-size: 1.2rem;
  padding: 10px 10px;
  border-radius: 50px;
  display: inline-block;
  text-align: center;
  line-height: 1.2;
  margin-top: 300px;
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #fdfaf7;
  background-image: url(${require("../assets/images/book_page.png")});
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
`;

export const PageText = styled.p`
  padding: 20px;
  margin: auto;
  width: calc(100% - 40px);
  text-align: center;
  font-size: 2.8rem;
`;

export const PageNumber = styled.p`
  position: absolute;
  font-size: 1rem;
  bottom: 10px;
  ${({ left }) => (left ? "left: 20px;" : "right: 20px;")}
`;

export const FooterContainer = styled.div`
  position: fixed;
  padding: 20px;
  width: calc(100% - 40px);
  display: flex;
  bottom: 0px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FooterButton = styled.button`
  padding: 10px 20px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  position: relative;
  background: #4b8ef5;

  &:hover {
    background: #3b7acc;
  }
`;
