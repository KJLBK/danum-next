import PopularPostButton from './Button';

export default function PopularPostlist({ header, data }) {
    return (
        <div>
            <h3>{header}</h3>
            <ul>
                {data.map((board) => (
                    <PopularPostButton
                        key={board.question_id}
                        item={board}
                    />
                ))}
            </ul>
        </div>
    );
}
