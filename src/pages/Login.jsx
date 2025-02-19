import { useNavigate } from "react-router";
import { Button } from "../components/button";
import { Auth } from "../components/layouts/auth-layout";
import { Input } from "../components/input";
import { useState, useEffect } from "react";
import { isValidEmail } from "../utils/validations";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginClick = async () => {
        if (!isValidEmail(email)) {
            toast.error("Email isn't valid");
            return;
        }
        await axios
            .post("http://localhost:3000/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                if (response.status !== 200) {
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

    const handleRegistrationClick = () => {
        navigate("/registration");
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleLoginClick();
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
            <h1 className="mt-[30px] text-2xl">Log in</h1>
            <div className="flex flex-col gap-2.5 mt-[20px]">
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
            </div>
            <div className="w-[380px] gap-5 flex flex-col mt-5">
                <Button title="LOGIN" onClick={handleLoginClick}></Button>
            </div>
            <div className="my-[20px] flex gap-1">
                <p className="text-sm">Don't have an account?</p>
                <p
                    className="text-customRed text-sm cursor-pointer"
                    onClick={handleRegistrationClick}
                >
                    Sign up
                </p>
            </div>
            <ToastContainer />
        </Auth>
    );
}

export default Login;
