export const CancelButton = ({ children, onClick, fitWidth, centered }) => {
  return (
    <button
      className={`px-2 py-1 text-sm bg-red-500 rounded-sm hover:bg-red-700 transition ${
        fitWidth ? "w-fit" : "w-full"
      } ${centered && "mx-auto"}`}
      onClick={onClick}
      type={"button"}
    >
      {children}
    </button>
  );
};
