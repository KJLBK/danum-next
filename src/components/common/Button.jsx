// Button.jsx

export default function Button({ type, children }) {
    return (
        <button
            type={type}
            // style={} TODO: styled to Button
        >
            {children}
        </button>
    );
}
