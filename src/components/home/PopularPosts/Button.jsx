import Link from 'next/link';
import { formatTimeAgo } from '../../../utils/timeFormat';
import styles from './Button.module.css';

export default function PopularPostButton({ item, index }) {
    const src = item.question_id
        ? `/questions/${item.question_id}`
        : `/villages/${item.village_id}`;

    return (
        <>
            <Link href={src}>
                <li
                    key={
                        item.question_id || item.village_id
                    }
                >
                    <div className={styles.buttonLayout}>
                        {/* <p>{item.addressTag}</p> */}
                        <div
                            className={styles.buttonHeader}
                        >
                            <span>{index}</span>
                        </div>
                        <div>
                            <div
                                className={
                                    styles.buttonTitle
                                }
                            >
                                <h4>{item.title}</h4>
                            </div>
                            <div
                                className={
                                    styles.buttonSubTitle
                                }
                            >
                                <span>
                                    {item.author.userName}
                                </span>
                                <span> • </span>
                                <span>
                                    읽음 {item.view_count}
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
        </>
    );
}
