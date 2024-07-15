import './index.css';

const Button = ({
    type,
    className,
    onClick,
    isDisabled = false,
    text,
    icon,
    color,
    borderRadius,
    size
}) => {
    return (
        <button
            type={type}
            className={`btn ${className} ${size} ${color} ${borderRadius} ${isDisabled ? 'btn-disabled' : ''}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {icon && <span className="icon">{icon}</span>}
            {text}
        </button>
    );
};

export default Button;
