// react
import React, { useState } from "react";
// axios api
import { fetchUserLogin } from "../utils/api";
// styles & components
import * as Styled from "../styles/Login.styles";
import StarryBackground from "./StarryBackground";

function Login({ onLogin, showToast }) {
  const [username, setUsername] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleLogin = async () => {
    if (!username.trim() || !authCode.trim()) {
      showToast("사용자명과 인증번호를 입력해주세요.", "warn");
      return;
    }

    setLoading(true); // 로딩 시작
    fetchUserLogin({
      user: username,
      key: authCode,
    })
      .then((response) => {
        console.log(response);
        if (response.data.result === "success") {
          localStorage.setItem("username", username); // localStorage에 저장
          localStorage.setItem("key", authCode);
          onLogin(username); // 로그인 콜백 호출
        } else {
          showToast(response.data.msg, "error");
        }
      })
      .catch((error) => {
        console.error("로그인 요청 중 오류 발생:", error);
        showToast(
          "서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
          "error"
        );
      })
      .finally((response) => {
        setLoading(false); // 로딩 종료
      });
  };

  // 인증번호 입력 제한
  const handleAuthCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAuthCode(value);
    }
  };

  // 엔터 키 누를 때 로그인 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // 엔터키 눌렀을 때 로그인 처리
    }
  };

  return (
    <Styled.LoginWrapper>
      <StarryBackground />
      <Styled.LoginBox>
        <Styled.Title>🌙 나만의 동화책 만들기</Styled.Title>
        <Styled.SubTitle>
          🌟 나만의 작은 동화책을 만들어 보아요! 🌟
        </Styled.SubTitle>
        <div>
          <Styled.InputField
            type="text"
            placeholder="사용자명을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown} // 엔터 키 처리 추가
          />
          <Styled.InputField
            type="password"
            placeholder="인증번호를 입력하세요"
            value={authCode}
            onChange={handleAuthCodeChange}
            onKeyDown={handleKeyDown} // 엔터 키 처리 추가
          />
          <Styled.LoginButton onClick={handleLogin} disabled={loading}>
            {loading ? "로그인 중..." : "동화책 만들기"}
          </Styled.LoginButton>
        </div>
      </Styled.LoginBox>
    </Styled.LoginWrapper>
  );
}

export default Login;
