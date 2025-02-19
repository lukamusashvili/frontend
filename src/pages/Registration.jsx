import { useNavigate } from "react-router";
import { Button } from "../components/button";
import { Auth } from "../components/layouts/auth-layout";
import { Input } from "../components/input";
import { useEffect, useState } from "react";
import { doPasswordsMatch, isValidEmail } from "../utils/validations";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registration() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

    const handleRegistrationClick = async () => {
        if (!isValidEmail(email)) {
            toast.error("Email isn't valid");
            return;
        }
        if (!doPasswordsMatch(password, passwordRepeat)) {
            toast.error("Passwords don't match");
            return;
        }
        await axios
            .post("http://localhost:3000/registration", {
                email: email,
                full_name: fullName,
                password: password,
            })
            .then((response) => {
                if (response.status !== 201) {
                    toast.error(response.data);
                    return;
                } else {
                    localStorage.setItem("token", response.data);
                    toast.success("The user has been registered successfully");
                    navigate("/");
                }
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleRegistrationClick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [email, password]);

    return (
        <Auth>
            <h1 className="mt-[40px] text-2xl">Wellcome to CRS</h1>
            <p className="opacity-60 text-sm mt-1">
                This is a private website. Sharing the link to this website is
                prohibited and monitored by IP address. Please do not share this
                link with unauthorized individuals.
            </p>
            <h1 className="mt-[30px] text-2xl">Register</h1>
            <div className="flex flex-col gap-2.5 mt-[20px]">
                <Input
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                ></Input>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <div className="relative">
                    <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Input>
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
                <div className="relative">
                    <Input
                        placeholder="Enter the Password again"
                        type={showPasswordRepeat ? "text" : "password"}
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                    ></Input>
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() =>
                            setShowPasswordRepeat(!showPasswordRepeat)
                        }
                    >
                        {showPasswordRepeat ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </div>
            <div className="w-[380px] gap-5 flex flex-col mt-5">
                <Button
                    title="REGISTER"
                    onClick={handleRegistrationClick}
                ></Button>
            </div>
            <div className="my-[20px] flex gap-1">
                <p className="text-sm">Already have an account?</p>
                <p
                    className="text-customRed text-sm cursor-pointer"
                    onClick={handleLoginClick}
                >
                    Log in
                </p>
            </div>
            <ToastContainer />
        </Auth>
    );
}

export default Registration;
