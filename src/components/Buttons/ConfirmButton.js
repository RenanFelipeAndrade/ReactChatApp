export const ConfirmButton = ({
  children,
  onClick,
  submit,
  fitWidth,
  ...props
}) => {
  return (
    <button
      className={`px-2 py-1 text-sm bg-teal-500 rounded-sm hover:bg-teal-700 transition ${
        fitWidth ? "w-fit" : "w-full"
      }`}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      {...props}
    >
      {children}
    </button>
  );
};
