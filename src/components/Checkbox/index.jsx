import './index.css';

const Checkbox = ({ 
    id,
    name,
    checked,
    onChange,
    label }) => {
    return (
        <div className="input-group checkbox">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <label className='label-remember' htmlFor={id}>{label}</label>
        </div>
    );
};

export default Checkbox;