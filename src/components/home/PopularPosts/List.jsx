import PopularPostButton from './Button';
import styles from './List.module.css';

export default function PopularPostlist({ header, data }) {
    return (
        <div className={styles.listLayout}>
            <h3 className={styles.listHeader}>{header}</h3>
            <ul className={styles.listUl}>
                {data.map((board, index) => (
                    <PopularPostButton
                        key={
                            board.question_id ||
                            board.village_id
                        }
                        item={board}
                        index={index + 1}
                    />
                ))}
            </ul>
        </div>
    );
}
