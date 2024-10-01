'use client';

import Image from 'next/image';
import { useState } from 'react';
import QuillEditor from '../../components/QuillEditor';
// import { cookies } from 'next/headers';
// import CheckAuthButton from '../../components/auth/CheckAuthButton';

export default function Test() {
    // 서버 측에서 cookies 사용
    // const cookieStore = cookies();
    // const RefreshToken =
    //     cookieStore.get('refreshToken')?.value;

    // 이미지 테스트
    const [previewImg, setPreviewImg] = useState();

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
        <>
            {/* 클라이언트 컴포넌트에 RefreshToken 전달 */}
            {/* <CheckAuthButton RefreshToken={RefreshToken} /> */}
            <div>
                <form>
                    {/* 파일 업로드  */}
                    <input
                        type='file'
                        onChange={fileHandler}
                    />

                    {/* 이미지 미리보기  */}
                    {previewImg && (
                        <Image
                            src={URL.createObjectURL(
                                previewImg[0]
                            )}
                            alt='이미지 미리보기'
                            width={100}
                            height={100}
                        />
                    )}

                    <button
                        type='button'
                        onClick={saveHandler}
                    >
                        저장하기
                    </button>
                </form>
            </div>
            <div>
                <QuillEditor />
            </div>
        </>
    );
}
