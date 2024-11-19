import { useState, useEffect } from 'react';
import styles from './AICommentItem.module.css';

export default function TypewriterEffect({
    text,
    onComplete,
}) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setIsTyping(true);
        setDisplayText('');

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
                if (onComplete) onComplete();
            }
        }, 20);

        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <div className={styles.typewriterContainer}>
            <span>{displayText}</span>
            {isTyping && (
                <svg
                    viewBox="8 4 8 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.cursor}
                >
                    <rect
                        x="10"
                        y="6"
                        width="4"
                        height="12"
                        fill="#666"
                    />
                </svg>
            )}
        </div>
    );
}
