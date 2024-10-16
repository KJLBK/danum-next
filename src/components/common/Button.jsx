import styles from './Button.module.css';
export default function Button({
    type,
    children,
    onClick,
}) {
    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                type={type}
                onClick={onClick} // onClick 핸들러 추가
                // style={} TODO: styled to Button
            >
                {children}
            </button>
        </div>
    );
}
