'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // jwtDecode를 올바르게 import
import {
    questionDetail,
    questionCommentShow,
} from '../../../service/questionService';
import QuestionCommentItem from '../../../components/question/QuestionCommentItem';
import QuestionCommentNew from '../../../components/question/QuestionCommentNew';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

export default function QuestionsViewPage() {
    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null); // decodedToken을 상태로 관리
    const params = useParams();

    // 질문 및 댓글 데이터를 가져오는 함수
    const fetchData = async () => {
        try {
            const response = await questionDetail(
                params.questionId
            );
            setData(response);
        } catch (err) {
            console.error(
                'Error fetching question detail:',
                err
            );
        }
    };

    const fetchComment = async () => {
        try {
            const response = await questionCommentShow(
                params.questionId
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
    }, [comment]); // 빈 배열로 설정하여 처음 로드될 때만 실행

    // 로컬 스토리지에서 JWT 토큰을 가져와 디코딩하는 useEffect
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            setDecodedToken(decoded); // 디코딩된 토큰을 상태로 저장
        }
    }, []); // 컴포넌트가 로드될 때 한 번 실행

    return (
        <div>
            <h2>제목 : {data.title}</h2>
            <p>
                {data.email} | {data.created_at} |{' '}
                {data.view_count}
            </p>
            <Viewer
                key={data.content}
                initialValue={data.content}
            />
            <hr />
            <h2>댓글</h2>

            {/* JWT 토큰이 존재할 때만 새로운 댓글 작성 */}
            {decodedToken ? (
                <QuestionCommentNew
                    email={decodedToken.sub} // decodedToken에서 이메일 정보를 전달
                    questionId={params.questionId}
                />
            ) : (
                <p>댓글을 작성하려면 로그인하세요.</p> // 로그인되지 않은 경우 메시지 표시
            )}

            {comment.map((item) => (
                <QuestionCommentItem
                    key={item.comment_id}
                    {...item}
                    emailCheck={
                        decodedToken
                            ? decodedToken.sub
                            : null
                    } // 로그인되지 않으면 null 전달
                />
            ))}
        </div>
    );
}
