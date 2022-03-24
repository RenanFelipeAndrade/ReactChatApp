export const ConfirmButton = ({ children, onClick, submit }) => {
  return (
    <button
      className="px-2 py-1 text-sm bg-teal-500 rounded-sm hover:bg-teal-700 transition w-full"
      onClick={onClick}
      type={submit || "button"}
    >
      {children}
    </button>
  );
};
