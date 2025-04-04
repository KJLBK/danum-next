'use client';
import Fire from '../../../public/emoji-assets/fire';
import styles from './ExpBar.module.css';

export default function ExpBar({ exp }) {
    const baseExp = 100;
    const level =
        Math.floor(Math.log2(exp / baseExp + 1)) + 1;
    const currentLevelExp =
        baseExp * (Math.pow(2, level - 1) - 1);
    const nextLevelExp = baseExp * (Math.pow(2, level) - 1);
    const progress =
        ((exp - currentLevelExp) /
            (nextLevelExp - currentLevelExp)) *
        100;

    return (
        <div className={styles.expBarContainer}>
            <div className={styles.levelInfo}>
                <span className={styles.levelText}>
                    신뢰도를 열심히 쌓아가고 있어요
                    <Fire />
                </span>
            </div>
            <div className={styles.progressContainer}>
                <div
                    className={styles.progressFiller}
                    style={{ width: `${progress}%` }}
                >
                    <div
                        className={styles.progressLabel}
                    ></div>
                </div>
            </div>
            <div className={styles.expInfo}>
                {exp}/{nextLevelExp}
            </div>
        </div>
    );
}
