'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // jwtDecode를 올바르게 import
import {
    questionDetail,
    questionCommentShow,
} from '../../../service/questionService';
import QuestionCommentItem from '../../../components/question/QuestionCommentItem';
import QuestionCommentNew from '../../../components/question/QuestionCommentNew';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css'; // Quill 에디터 스타일
import style from './page.module.css';

// Quill을 동적으로 불러오기
const Quill = dynamic(() => import('quill'), {
    ssr: false, // 서버 사이드 렌더링 비활성화
});

export default function QuestionsViewPage() {
    const [data, setData] = useState({});
    const [comment, setComment] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null); // decodedToken을 상태로 관리
    const params = useParams();
    const editorRef = useRef(null); // Quill 인스턴스가 들어갈 ref

    // 시간을 "몇 시간 전" 형식으로 변환하는 함수
    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const createdDate = new Date(dateString);
        const diffInSeconds = Math.floor(
            (now - createdDate) / 1000
        ); // 두 날짜의 차이 (초 단위)

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);

        if (days > 0) {
            return `${days}일 전`;
        } else if (hours > 0) {
            return `${hours}시간 전`;
        } else if (minutes > 0) {
            return `${minutes}분 전`;
        } else {
            return '방금 전';
        }
    };

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

    // Quill 에디터를 읽기 전용으로 설정하는 useEffect
    useEffect(() => {
        if (!editorRef.current) return;

        async function initQuill() {
            const QuillInstance = (await import('quill'))
                .default;

            const quill = new QuillInstance(
                editorRef.current,
                {
                    theme: 'snow', // Quill 기본 테마
                    readOnly: true, // 읽기 전용 모드
                    modules: {
                        toolbar: false, // 툴바 비활성화
                    },
                }
            );

            // Quill 인스턴스에 저장된 콘텐츠 설정 (HTML 형태일 경우)
            if (data.content) {
                quill.clipboard.dangerouslyPasteHTML(
                    data.content
                ); // HTML 데이터를 Quill에 렌더링
            }
        }

        initQuill();
    }, [data.content]); // data.content가 변경될 때마다 실행

    // 처음 컴포넌트가 로드될 때 데이터를 불러옴
    useEffect(() => {
        fetchData();
        fetchComment();
    }, []); // 빈 배열로 설정하여 처음 로드될 때만 실행

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
            <h1 className={style.title}>{data.title}</h1>
            <div className={style.info}>
                <span className={style.profile}></span>
                <span className={style.email}>
                    {data.email}
                </span>
                &nbsp;&nbsp;
                <span className={style.metaInfo}>
                    {formatTimeAgo(data.created_at)} • 읽음
                    {data.view_count}
                </span>
            </div>

            {/* Quill을 통해 게시글 내용을 뷰어로 표시 */}
            <div>
                <div
                    className={style.content}
                    id='quill-viewer'
                    ref={editorRef}
                    style={{
                        height: 'auto',
                        minHeight: '300px',
                    }}
                ></div>
            </div>

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
