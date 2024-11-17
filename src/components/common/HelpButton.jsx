import style from './HelpButton.module.css';
export default function HelpButton() {
    return (
        <div className={style.helpContainer}>
            <button
                className={style.helpButton}
                aria-label="도움말"
            >
                ?
            </button>
            <div className={style.helpModal}>
                <p>
                    닉네임을 클릭하면 도움을 줄 수 있어요💡
                </p>
            </div>
        </div>
    );
}
