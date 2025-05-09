export const Button = ({ title, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-customRed w-full text-sm font-bold h-[45px]`}
        >
            {title}
        </button>
    );
};
