'use client';

import React from 'react';
import style from './Modal.module.css'; // 모달 스타일을 위한 CSS 모듈

const Modal = ({
    isOpen,
    title,
    content,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null; // 모달이 열려 있지 않으면 렌더링하지 않음

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h2>{title}</h2>
                <div>{content}</div>
                <button onClick={onConfirm}>확인</button>
                <button onClick={onCancel}>취소</button>
            </div>
        </div>
    );
};

export default Modal;
