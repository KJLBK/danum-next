'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Profile({
    profileImageUrl,
    onImageChange,
}) {
    const [previewImg, setPreviewImg] = useState(null);

    // 이미지 저장
    const saveHandler = async () => {
        if (!previewImg) {
            return;
        }

        const formData = new FormData();
        formData.append('img', previewImg[0]);

        const result = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        }).then((res) => res.json());

        if (result.message === 'OK') {
            alert('이미지가 저장되었습니다.');
            onImageChange(result.url); // 선택한 이미지 URL 전달
        }
    };

    // 이미지 미리보기
    const fileHandler = (e) => {
        const file = e.target.files;

        if (file && file.length > 0) {
            setPreviewImg(file);
        }
    };

    return (
        <div>
            {/* 파일 업로드  */}
            <input type='file' onChange={fileHandler} />

            {/* 이미지 미리보기: 선택한 이미지가 없으면 기본 이미지 */}
            {(previewImg && previewImg[0]) ||
            profileImageUrl ? (
                <Image
                    src={
                        previewImg
                            ? URL.createObjectURL(
                                  previewImg[0]
                              )
                            : profileImageUrl
                    }
                    alt='이미지 미리보기'
                    width={100}
                    height={100}
                />
            ) : null}

            <button type='button' onClick={saveHandler}>
                저장하기
            </button>
        </div>
    );
}
