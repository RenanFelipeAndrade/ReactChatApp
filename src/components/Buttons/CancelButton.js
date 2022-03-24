export const CancelButton = ({ children, onClick }) => {
  return (
    <button
      className="px-2 py-1 text-sm bg-red-500 rounded-sm hover:bg-red-700 transition w-full"
      onClick={onClick}
      type={"button"}
    >
      {children}
    </button>
  );
};
