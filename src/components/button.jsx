export const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={`bg-customRed w-full h-[45px]`}>
      {children}
    </button>
  );
};
