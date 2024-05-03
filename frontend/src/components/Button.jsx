export default function Button({ children, className, onClick, disabled }) {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        className="m-4 p-2 bg-gray-200 rounded-md shadow-md "
      >
        {children}
      </button>
    </div>
  );
}
