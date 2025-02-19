import { useLocation, useNavigate } from "react-router";
import { Button } from "../button";

export const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fullName = localStorage.getItem("full_name");

    const handleLogoutClick = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("full_name");
        navigate("/welcome");
    };

    return (
        <div className="flex justify-between items-center mt-10 w-full">
            <img src="/images/logo.svg" alt="logo" width={80} />
            {(location.pathname === "/users" ||
                location.pathname === "/files") && (
                <div className="flex gap-5">
                    <div
                        className={`text-sm cursor-pointer ${
                            location.pathname === "/users" ? "" : "opacity-60"
                        }`}
                        onClick={() => navigate("/users")}
                    >
                        Users
                    </div>
                    <div
                        className={`text-sm cursor-pointer ${
                            location.pathname === "/files" ? "" : "opacity-60"
                        }`}
                        onClick={() => navigate("/files")}
                    >
                        Files
                    </div>
                </div>
            )}
            <div className="flex items-center gap-2 sm:gap-5">
                <div className="text-sm opacity-60">{fullName}</div>
                <div className="w-[180px]">
                    <Button title="LOGOUT" onClick={handleLogoutClick}></Button>
                </div>
            </div>
        </div>
    );
};
