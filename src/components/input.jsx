export const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className={`w-full bg-transparent h-[45px] opacity-60 border-white border border-opacity-60 px-5 py-4 text-sm`}
    />
  );
};
