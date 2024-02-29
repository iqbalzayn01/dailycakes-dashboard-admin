import PropTypes from "prop-types";

export default function TextInputWithLabel({
  htmlFor,
  label,
  name,
  type,
  className,
  placeholder,
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="sr-only">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

TextInputWithLabel.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};
