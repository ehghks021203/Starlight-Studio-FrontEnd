import styled from "styled-components";
import palette from "./styles";

export const Wrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #2d2a4a, #1b1a33);
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Box = styled.div`
  background: rgba(40, 40, 70, 0.9);
  padding: 80px;
  border-radius: 15px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.7);
  text-align: center;
  width: calc(100% - 240px);
  max-width: 1100px;
  height: auto;
  z-index: 10;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100px;
  width: 100%;
  z-index: 10;
  margin-bottom: 40px;
`;

export const LunarIcon = styled.img`
  width: 128px;
  height: 128px;
`;

export const Title = styled.h1`
  font-size: 2.8rem;
  color: ${palette.yellow};
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
`;

export const SubTitle = styled.h1`
  font-size: 1.8rem;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${palette.white};
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
`;

export const Context = styled.div`
  font-size: 1.2rem;
  margin-bottom: 60px;
  color: ${palette.white};
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
`;

export const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
`;

export const FeatureBox = styled.div`
  background: rgba(60, 60, 90, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  color: ${palette.white};
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  font-size: 1.2rem;
  text-align: justify;
`;

export const FeatureIcon = styled.div`
  height: 120px;
  margin-bottom: 20px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
`;

export const FeatureTitle = styled.div`
  margin-bottom: -5px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

export const TextButton = styled.button`
  margin-top: 80px;
  width: 300px;
  height: 60px;
  padding: 10px 10px;
  background: ${palette.yellow};
  color: #1b1a33;
  font-weight: bold;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: #e8c72a;
    transform: translateY(-3px);
    box-shadow: 0px 5px 15px rgba(244, 208, 63, 0.5);
  }

  &:disabled {
    opacity: 0.7;
    background: gray;
  }
`;
