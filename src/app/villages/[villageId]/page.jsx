'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    villageDetail,
    villageDelete,
} from '../../../services/villageService';
import PostInfoPanel from '../../../components/common/board/PostInfoPanel';
import QuillViewer from '../../../components/common/board/QuillViewer';

export default function VillageViewPage() {
    const [data, setData] = useState({});
    const params = useParams();

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

    useEffect(() => {
        fetchData();
    }, [params.villageId]);

    return (
        <>
            <PostInfoPanel
                data={data}
                board="villages"
                onDelete={villageDelete}
            />
            <QuillViewer content={data.content} />
        </>
    );
}
