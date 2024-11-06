import Link from 'next/link';
import { formatTimeAgo } from '../../../utils/timeFormat';

export default function PopularPostButton({ item }) {
    const src = item.question_id
        ? `/questions/${item.question_id}`
        : `/villages/${item.village_id}`;

    return (
        <>
            <Link href={src}>
                <div>
                    <li
                        key={
                            item.question_id ||
                            item.village_id
                        }
                    >
                        <p>{item.addressTag}</p>
                        <h4>{item.title}</h4>
                        <span>
                            {item.author.userName}
                        </span>{' '}
                        <span>
                            {formatTimeAgo(item.created_at)}
                        </span>
                        <span> 읽음 {item.view_count}</span>
                    </li>
                </div>
            </Link>
        </>
    );
}
