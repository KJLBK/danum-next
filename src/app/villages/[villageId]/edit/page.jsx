'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    villageDetail,
    villageUpdate,
} from '../../../../services/villageService';
import style from './page.module.css';
import QuillEditor from '../../../../components/common/board/QuillEditor';

export default function EditVillagePage() {
    const [data, setData] = useState({
        title: '',
        content: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const editorRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const fetchVillageData = async () => {
            try {
                const response = await villageDetail(
                    params.villageId,
                );
                setData({
                    title: response.title || '',
                    content: response.content || '',
                });
                setIsLoading(false);
            } catch (err) {
                console.error(
                    'Error fetching question detail:',
                    err,
                );
                setIsLoading(false);
            }
        };

        fetchVillageData();
    }, [params.villageId]);

    const handleUpdate = async () => {
        try {
            const content = editorRef.current.getContent();
            if (!data.title.trim()) {
                alert('제목을 입력하세요.');
                return;
            }
            const id = params.villageId;
            const title = data.title;

            await villageUpdate(id, title, content);
            router.push(`/villages/${params.villageId}`);
        } catch (error) {
            console.error('Error updating village:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>게시글 수정</h2>
            <div className={style.formRow}>
                <input
                    className={style.input}
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={data.title}
                    onChange={(e) =>
                        setData({
                            ...data,
                            title: e.target.value,
                        })
                    }
                />
                <button
                    onClick={handleUpdate}
                    className={style.button}
                >
                    수정
                </button>
            </div>

            <div>
                <QuillEditor
                    ref={editorRef}
                    content={data.content}
                />
            </div>
        </div>
    );
}
