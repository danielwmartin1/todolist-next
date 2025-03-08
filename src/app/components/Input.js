export default function Input({ type, value, onChange, onKeyDown, placeholder, autoFocus, className, style }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={`text-black w-full sm:w-1/2 px-4 py-2 m-2 border rounded-md ${className}`}
      style={{ borderRadius: "6px", ...style }}
    />
  );
}
