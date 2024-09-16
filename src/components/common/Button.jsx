export default function Button({
    type,
    children,
    onClick,
}) {
    return (
        <button
            type={type}
            onClick={onClick} // onClick 핸들러 추가
            // style={} TODO: styled to Button
        >
            {children}
        </button>
    );
}
