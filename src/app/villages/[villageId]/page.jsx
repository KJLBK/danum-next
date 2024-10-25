'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { villageDetail } from '../../../services/villageService';
import PostInfoPanel from '../../../components/village/view/PostInfoPanel';
import QuillViewer from '../../../components/question/view/QuillViewer';

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
            <PostInfoPanel data={data} />
            <QuillViewer content={data.content} />
        </>
    );
}
