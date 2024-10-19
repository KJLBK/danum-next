'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    questionDetail,
    questionCommentShow,
} from '../../../services/questionService';
import QuestionCommentItem from '../../../components/question/comment/QuestionCommentItem';
import QuestionCommentNew from '../../../components/question/new/QuestionCommentNew';
import style from './page.module.css';
import QuillViewer from '../../../components/question/view/QuillViewer';
import PostInfoPanel from '../../../components/question/view/PostInfoPanel';
import { useAuthStore } from '../../../stores/authStore';

export default function QuestionsViewPage() {
    const [data, setData] = useState({});
    const [comment, setComment] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null); // decodedToken을 상태로 관리
    const [isModalOpen, setModalOpen] = useState(false); // 모달 열림 상태 관리
    const params = useParams();
    const { isLoggedIn, user } = useAuthStore();

    // 시간을 "몇 시간 전" 형식으로 변환하는 함수 -> /utils/timeFormat.js

    // 질문 및 댓글 데이터를 가져오는 함수
    const fetchData = async () => {
        try {
            const response = await questionDetail(
                params.questionId,
            );
            setData(response);
        } catch (err) {
            console.error(
                'Error fetching question detail:',
                err,
            );
        }
    };

    const fetchComment = async () => {
        try {
            const response = await questionCommentShow(
                params.questionId,
            );
            setComment(response);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };

    // 처음 컴포넌트가 로드될 때 데이터를 불러옴
    useEffect(() => {
        fetchData();
        fetchComment();
    }, []); // 빈 배열로 설정하여 처음 로드될 때만 실행

    return (
        <div>
            {/* question header */}
            <PostInfoPanel data={data} />
            {/* question content */}
            <QuillViewer content={data.content} />

            <hr />
            <h2>댓글</h2>

            {isLoggedIn ? (
                <QuestionCommentNew
                    email={user} // decodedToken에서 이메일 정보를 전달
                    questionId={params.questionId}
                />
            ) : (
                <p>댓글을 작성하려면 로그인하세요.</p> // 로그인되지 않은 경우 메시지 표시
            )}

            {comment.map((item) => (
                <QuestionCommentItem
                    key={item.comment_id}
                    {...item}
                    emailCheck={isLoggedIn ? user : null} // 로그인되지 않으면 null 전달
                />
            ))}
        </div>
    );
}
