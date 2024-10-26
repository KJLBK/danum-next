import PostInfoPanel from '../../components/common/board/PostInfoPanel';
import QuillViewer from '../../components/common/board/QuillViewer';

const QUESTIONS_DATA_DUMMY = [
    {
        question_id: 36,
        title: 'How to implement chat functionality?',
        content:
            'I am struggling with implementing a chat feature using WebSocket. Can anyone help?',
        author: {
            userId: 'user123@example.com',
            userName: 'TechLover',
            profileImageUrl:
                'https://example.com/profile1.png',
        },
        created_at: '2024-10-01T12:45:21.123456',
        conversation: null,
        like: 2,
        view_count: 20,
    },
];
const COMMENTS_DATA_DUMMY = [
    {
        comment_id: 59,
        email: 'pep@pep',
        content: 'jkbkjk',
        created_at: '2024-10-19T02:32:22.689067',
        accepted: false,
    },
    {
        comment_id: 61,
        email: 'Ehd@Ehd',
        content: 'vnxznv,mxz',
        created_at: '2024-10-19T17:53:04.602792',
        accepted: false,
    },
    {
        comment_id: 62,
        email: 'Ehd@Ehd',
        content: 'vmdn,a',
        created_at: '2024-10-19T17:54:06.187184',
        accepted: false,
    },
];

export default function Test() {
    return (
        <>
            <PostInfoPanel data={QUESTIONS_DATA_DUMMY[0]} />
            <QuillViewer
                content={QUESTIONS_DATA_DUMMY[0].content}
            />
        </>
    );
}
