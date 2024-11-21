import React from 'react';
import { MoonLoader } from 'react-spinners';
import StarryBackground from './StarryBackground';
import * as Styled from "../styles/Loading.styles";
import palette from "../styles/styles";

function Loading() {
  return (
    <Styled.LoadingWrapper>
        <StarryBackground/>
        <MoonLoader color={palette.yellow} loading={true} size={50} />
        <Styled.LoadingText>로딩 중...</Styled.LoadingText>
    </Styled.LoadingWrapper>
    );
}

export default Loading;
