'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProfile } from '../../services/authService';

export default function GetProfile() {
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile();
                setProfileImage(data); // 서버로부터 받은 프로필 이미지 설정
            } catch (err) {
                setError(err.message);
            }
        }

        fetchProfile(); // 컴포넌트가 렌더링될 때 프로필 데이터를 가져옴
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profileImage) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Image
                src={profileImage}
                alt='Profile'
                width={30} // Next.js Image 컴포넌트에 필요한 width 속성
                height={30} // Next.js Image 컴포넌트에 필요한 height 속성
                style={{
                    objectFit: 'cover', // 이미지 비율 유지하면서 자르기
                    borderRadius: '50%', // 동그란 모양
                    border: '2px solid #ccc', // 선택사항: 테두리 추가
                }}
            />
        </div>
    );
}
