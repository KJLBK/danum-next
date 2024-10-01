// RecentMessagesList 기능 테스트 완료
// 메인페이지용 컴포넌트
// 예외처리 : 비회원 상황일시 안보여야함. / 0개의 리스트일시 채팅이 없습니다 같은 상태 메시지 처리가 되어야함.

'use client';

import { useEffect } from 'react';
import { getRecentMessages } from '../../service/chatService';

export default function RecentMessagesList() {
    useEffect(() => {
        fetchRecentMessages();
    }, []);

    const fetchRecentMessages = async () => {
        const fetchMessages = await getRecentMessages();
        console.log('RecentMessagesList', fetchMessages);
    };

    return (
        <>
            <div>Component(RecentMessagesList)</div>
        </>
    );
}
