// 쿠키에서 accessToken 가져오기
export function getAccessToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

    return cookieValue || null;
}

// 쿠키에 accessToken 저장하기
export function setAccessToken(token) {
    document.cookie = `accessToken=${token}; path=/; Secure; SameSite=Strict;`;
}

// 쿠키에서 accessToken 삭제하기
export function removeAccessToken() {
    document.cookie = 'accessToken=; Max-Age=0; path=/;';
}

export function getCookie(name) {
    const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)'),
    );
    return match ? decodeURIComponent(match[2]) : null;
}
