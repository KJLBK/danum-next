// Input.jsx

export default function Input({
    type,
    value,
    onChange,
    placeholder,
    required,
}) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            // TODO: styled to LoginInput
            // style={{ fontSize: '.875rem' }}
        />
    );
}
