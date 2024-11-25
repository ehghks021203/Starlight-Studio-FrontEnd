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
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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