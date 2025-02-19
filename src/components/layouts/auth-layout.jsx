export const Auth = ({ children }) => {
    return (
        <div className="flex items-center mt-10 w-full flex-col">
            <img src="/images/logo.svg" alt="logo" width={180} />
            <div className="max-w-[380px]">{children}</div>
        </div>
    );
};
