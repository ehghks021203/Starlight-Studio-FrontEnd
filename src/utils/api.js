import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 취소 토큰 관리
let loginCancelTokenSource = null;
let deleteStoryCancelTokenSource = null;
let cancelTokenSource = null;



// API 요청 함수 정의
// 로그인 api
export const fetchUserLogin = (params) => {
    if (loginCancelTokenSource) {
        loginCancelTokenSource.cancel('request canceled.');
    }
    loginCancelTokenSource = axios.CancelToken.source();
    return api.post(`/user?user=${params.user}&key=${params.key}`, {}, {
        cancelToken: loginCancelTokenSource.token
    });
};

// 동화책 삭제 api
export const fetchDeleteStory = (params) => {
    if (deleteStoryCancelTokenSource) {
        deleteStoryCancelTokenSource.cancel('request canceled.');
    }
    deleteStoryCancelTokenSource = axios.CancelToken.source();
    return api.post(`/delstory?story_id=${params.storyId}&user=${params.user}`, {}, {
        cancelToken: deleteStoryCancelTokenSource.token
    });
};

// 동화책 불러오기 api
export const fetchGetStory = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('requset canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/getstory?title=${params.title}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 생성 api
export const fetchNewStory = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled.');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/newstory?title=${params.title}&topic=${params.topic}&character=${params.character}&background=${params.background}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 다음 내용 생성 api
export const fetchNextStory = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/nextstory?story_id=${params.storyId}&page=${params.page}&context=${params.context}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 요구사항 포함해 재생성 api
export const fetchRequireStory = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/reqstory?story_id=${params.storyId}&page=${params.page}&context=${params.context}&request=${params.request}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 내용 재생성 api
export const fetchRegenStory = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/regenstory?story_id=${params.storyId}&page=${params.page}&context=${params.context}&r_context=${params.rContext}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 내용 끝내기 api
export const fetchEndStory = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/endstory?story_id=${params.storyId}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 제목 바꾸기 api
export const fetchChangeTitle = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/chtitle?story_id=${params.storyId}&newtitle=${params.newTitle}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 이미지 생성 api
export const fetchGenImage = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/genimg?story_id=${params.storyId}&page=${params.page}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 이미지 요청사항으로 생성 api
export const fetchRequireImage = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/reqimg?story_id=${params.storyId}&page=${params.page}&req_context=${params.reqContext}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 id로 데이터 받아오기 api
export const fetchGenCoverImage = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/gencover?story_id=${params.storyId}&user=${params.user}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};

// 동화책 id로 데이터 받아오기 api
export const fetchGetStoryById = (params) => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('request canceled');
    }
    cancelTokenSource = axios.CancelToken.source();
    return api.post(`/sharestory?story_id=${params.storyId}`, {}, {
        cancelToken: cancelTokenSource.token
    });
};