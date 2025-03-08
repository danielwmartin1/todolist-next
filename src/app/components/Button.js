export default function Button({ onClick, children, className, style }) {
  return (
    <button
      onClick={onClick}
      className={`w-24 px-4 py-2 m-2 border rounded-md ${className}`}
      style={{ borderRadius: "6px", ...style }}
    >
      {children}
    </button>
  );
}
