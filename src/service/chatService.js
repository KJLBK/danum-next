/**
 * 사용자의 모든 채팅방 목록 조회(메인페이지용 아님 그룹채팅용으로 만들예정이라고 함)
 * URL: GET /chat/rooms
 * 설명: 현재 인증된 사용자의 모든 채팅방 목록을 반환합니다.
 * 인증: 필요
 * 응답: ChatRoom 객체 리스트 (JSON)
 * 기능: 사용자의 채팅방 목록을 표시할 때 사용됩니다. 예를 들어, 채팅 앱의 메인 화면에서 사용자가 참여 중인 모든 채팅방을 나열할 때 사용할 수 있습니다.
 *
 * @returns {Promise<Array>} ChatRoom 객체 리스트
 */
export async function getAllChatRooms() {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('/danum-backend/chat/rooms', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res);
    if (!res.ok) {
        throw new Error('Failed to fetch chat rooms');
    }
    return res.json();
}

/**
 * 새로운 채팅방 생성
 * URL: POST /chat/room
 * 설명: 새로운 채팅방을 생성합니다.
 * 인증: 필요
 * Body:
 *  - name: 채팅방 이름 (String)
 * 응답: 생성된 ChatRoom 객체 (JSON)
 * 기능: 사용자가 새로운 그룹 채팅방을 만들 때 사용됩니다.
 *
 * @param {String} name - 채팅방 이름
 * @returns {Promise<Object>} 생성된 ChatRoom 객체
 */
export async function createGroupChat(name) {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('/danum-backend/chat/room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            name: name,
        }),
    });

    if (!res.ok) {
        throw new Error('Failed to create chat room');
    }
    return res.json();
}

/**
 * 특정 채팅방 정보 조회
 * URL: GET /chat/room/{roomId}
 * 설명: 특정 채팅방의 정보를 조회합니다.
 * 응답: ChatRoom 객체 (JSON)
 * 기능: 채팅방의 세부 정보(참여자 목록, 채팅방 설정 등)를 확인할 때 사용됩니다.
 *
 * @param {String} roomId - 채팅방 ID
 * @returns {Promise<Object>} ChatRoom 객체
 */
// getChatRoomInfo
export async function getChatRoomInfo(roomId) {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(
        `/danum-backend/chat/room/${roomId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    console.log('chatService.js:46', res);

    if (!res.ok) {
        throw new Error('Failed to fetch room info');
    }
    return res.json();
}

/**
 * 1:1 채팅방 생성 \
 * URL: POST /chat/room/one-to-one
 * 설명: 1:1 채팅방을 생성합니다.
 * 인증: 필요
 * 요청 본문:
 *  - targetUserId: 대화 상대방 ID (String)
 * 응답:
 *  - 성공: {"roomId": "생성된 채팅방 ID"} (JSON)
 *  - 실패: 에러 메시지 (문자열)
 * 기능: 사용자가 다른 사용자와 1:1 대화를 시작하고자 할 때 사용됩니다.
 *
 * @param {String} targetUserId - 대화 상대방 ID
 * @returns {Promise<Object>} 생성된 채팅방 정보
 */
export async function createPrivateChat(targetUserId) {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(
        '/danum-backend/chat/room/one-to-one',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                targetUserId: targetUserId,
            }),
        }
    );
    console.log('chatService.js:70', res);

    if (!res.ok) {
        throw new Error(
            'Failed to create one-to-one chat room'
        );
    }
    return res.json();
}

/**
 * 최근 대화 내역 조회(메인페이지용)
 * URL: GET /chat/recent-messages -> 메인페이지용
 * 설명: 현재 인증된 사용자의 모든 채팅방에서의 최근 대화 내역을 조회합니다.
 * 인증: 필요
 * 응답: ChatMessage 객체 리스트 (JSON)
 * 기능: 메인 페이지나 대시보드에서 사용자의 모든 채팅 활동 요약을 보여줄 때 사용됩니다. 각 채팅방의 최신 메시지를 표시하여 사용자가 새 메시지나 미확인 대화를 빠르게 확인할 수 있게 합니다.
 */
export async function getRecentMessages() {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(
        '/danum-backend/chat/recent-messages',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    console.log(res);
    if (!res.ok) {
        throw new Error('Failed to get recent messages');
    }
    return res.json();
}
// TODO: 미들웨어 처리 후 메인 페이지 구현시에 기능추가하기(10/1)

/**
 * 채팅방 입장 및 이전 메시지 로드
 * URL: GET /chat/room/{roomId}/enter
 * 설명: 채팅방에 입장하고 이전 메시지를 로드합니다.
 * 인증: 필요
 * 응답:
 *  - 성공: {"roomInfo": ChatRoom 객체, "messages": 메시지 리스트} (JSON)
 *  - 실패: 에러 메시지 (문자열)
 * 기능: 사용자가 특정 채팅방에 입장할 때 사용됩니다. 이 API는 채팅방 정보와 함께 이전 메시지 히스토리를 제공하여 사용자가 대화 맥락을 파악할 수 있게 합니다.
 *
 * @param {String} roomId - 채팅방 ID
 * @returns {Promise<Object>} 채팅방 정보와 메시지 리스트
 */
export async function enterChatRoom(roomID) {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(
        `/danum-backend/chat/room/${roomID}/enter`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to get recent messages');
    }

    return res.json();
}
// TODO: 경빈이가 게시판 구현 완료시에 기능 추가(10/1)

/**
 * 채팅방 메시지 조회
 * URL: GET /chat/room/{roomId}/messages
 * 설명: 특정 채팅방의 모든 메시지를 조회합니다.
 * Body:
 *  - roomId: 채팅방 ID (String)
 * 응답: Object 리스트 (JSON, ChatMessage 객체들을 포함)
 * 기능: 사용자가 특정 채팅방의 전체 대화 내용을 보고자 할 때 사용됩니다. 예를 들어, 채팅방에 처음 입장하거나 이전 메시지를 스크롤하여 불러올 때 이 API를 호출할 수 있습니다.
 *
 * @param {String} roomId - 채팅방 ID
 * @returns {Promise<Array>} 메시지 객체 리스트
 */
// getChatRoomMessages
export async function getChatMessages() {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(
        `/danum-backend/chat/room/${roomID}/messages`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to get ChatMessages');
    }

    return res.json();
}
