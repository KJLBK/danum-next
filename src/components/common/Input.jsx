// Input.jsx
import style from './Input.module.css';

export default function Input({
    type,
    name,
    value,
    onChange,
    placeholder,
    required,
}) {
    return (
        <div className={style.container}>
            <label className={style.label}>{name}</label>
            <input
                className={style.input}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}
