'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './Profile.module.css'; // CSS 모듈 임포트

export default function Profile({
    profileImageUrl,
    onImageChange,
}) {
    const [previewImg, setPreviewImg] = useState(null);

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
            onImageChange(result.url);
        }
    };

    const fileHandler = (e) => {
        const file = e.target.files;

        if (file && file.length > 0) {
            setPreviewImg(file);
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.imageContainer}>
                {(previewImg && previewImg[0]) ||
                profileImageUrl ? (
                    <Image
                        src={
                            previewImg
                                ? URL.createObjectURL(
                                      previewImg[0],
                                  )
                                : profileImageUrl
                        }
                        alt="이미지 미리보기"
                        width={100}
                        height={100}
                        className={styles.profileImage}
                    />
                ) : null}
            </div>
            <div className={styles.buttonContainer}>
                <label className={styles.fileLabel}>
                    파일 선택
                    <input
                        type="file"
                        onChange={fileHandler}
                        className={styles.fileInput}
                    />
                </label>

                <button
                    type="button"
                    onClick={saveHandler}
                    className={styles.saveButton}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
}
