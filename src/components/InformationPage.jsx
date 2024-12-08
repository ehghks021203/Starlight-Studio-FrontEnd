// react
import React from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";
// axios api
import { fetchUserLogin } from "../utils/api";
// styles & components
import * as Styled from "../styles/InformationPage.styles";
import StarryBackground from "./StarryBackground";
import LunarIcon from "../assets/images/lunar-icon.png";

const InformationPage = () => {
  const navigate = useNavigate(); // React Router's navigate hook

  const handleNavigate = () => {
    navigate("/story-editor"); // Navigate to /story-editor
  };

  return (
    <Styled.Wrapper>
      <StarryBackground />
      <Styled.Box>
        <Styled.TitleBox>
          <Styled.LunarIcon src={LunarIcon} alt="Lunar Icon" />
          <Styled.Title>별빛 창작소</Styled.Title>
        </Styled.TitleBox>
        <Styled.SubTitle>별빛 창작소에 오신걸 환영합니다!</Styled.SubTitle>
        <Styled.Context>
          별빛 창작소는 내가 원하는 주제, 캐릭터, 배경을 입력하면 그에 맞는
          동화책을 만들어주는 서비스에요.
        </Styled.Context>
        <Styled.FeatureContainer>
          <Styled.FeatureBox>
            <Styled.FeatureIcon>📝</Styled.FeatureIcon>
            <Styled.FeatureTitle>AI 기반 동화 생성</Styled.FeatureTitle>
          </Styled.FeatureBox>
          <Styled.FeatureBox>
            <Styled.FeatureIcon>🪄</Styled.FeatureIcon>
            <Styled.FeatureTitle>이야기 수정 및 재생성</Styled.FeatureTitle>
          </Styled.FeatureBox>
          <Styled.FeatureBox>
            <Styled.FeatureIcon>🎨</Styled.FeatureIcon>
            <Styled.FeatureTitle>AI 기반 삽화 생성</Styled.FeatureTitle>
          </Styled.FeatureBox>
          <Styled.FeatureBox>
            <Styled.FeatureIcon>🔗</Styled.FeatureIcon>
            <Styled.FeatureTitle>간편한 공유 및 저장</Styled.FeatureTitle>
          </Styled.FeatureBox>
        </Styled.FeatureContainer>
      </Styled.Box>
      <Styled.TextButton onClick={handleNavigate}>
        이야기 만들러 가기 →
      </Styled.TextButton>
    </Styled.Wrapper>
  );
};

export default InformationPage;
