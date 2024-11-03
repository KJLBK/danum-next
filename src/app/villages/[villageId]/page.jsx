'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    villageDetail,
    villageDelete,
    villageCommentShow,
    villageCommentNew,
    villageCommentDelete,
    villageCommentUpdate,
} from '../../../services/villageService';
import CommentItem from '../../../components/board/view/CommentItem';
import CommentNew from '../../../components/board/new/CommentNew';
import PostInfoPanel from '../../../components/board/view/PostInfoPanel';
import QuillViewer from '../../../components/board/view/QuillViewer';
import { useAuthStore } from '../../../stores/authStore';

export default function VillageViewPage() {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const params = useParams();
    const { isLoggedIn, user } = useAuthStore();

    const fetchData = async () => {
        try {
            const response = await villageDetail(
                params.villageId,
            );
            setData(response);
        } catch (err) {
            console.error(
                '질문 세부 정보 가져오기 오류:',
                err,
            );
        }
    };

    const fetchComments = async () => {
        try {
            const response = await villageCommentShow(
                params.villageId,
            );
            setComments(response);
        } catch (err) {
            console.error('댓글 가져오기 오류:', err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchComments();
    }, [params.villageId]);

    return (
        <>
            <PostInfoPanel
                data={data}
                board="villages"
                onDelete={villageDelete}
            />
            <QuillViewer content={data.content} />
            <hr />
            <h2>댓글</h2>
            {isLoggedIn ? (
                <CommentNew
                    postId={params.villageId}
                    email={user}
                    onSubmitComment={villageCommentNew}
                    type="village"
                />
            ) : (
                <p>댓글을 작성하려면 로그인하세요.</p>
            )}
            {comments.map((item) => (
                <CommentItem
                    key={item.comment_id}
                    {...item}
                    onDelete={villageCommentDelete}
                    onUpdate={villageCommentUpdate}
                    type="village"
                />
            ))}
        </>
    );
}
