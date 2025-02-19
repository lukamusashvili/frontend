import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Nav } from "../components/layouts/nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../components/button";

function Home() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const handleDownload = (url) => {
        return () => {
            window.open(url, "_blank");
        };
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/welcome");
            } else {
                try {
                    const response = await axios.get(
                        "http://localhost:3000/user",
                        {
                            headers: {
                                token: token,
                            },
                        }
                    );
                    if (response.status !== 200) {
                        toast.error(response.data);
                    } else {
                        localStorage.setItem(
                            "full_name",
                            response.data.full_name
                        );
                        if (response.data.role === "admin") {
                            navigate("/users");
                        } else {
                            setUserData(response.data);
                        }
                    }
                } catch (error) {
                    toast.error(error.response.data);
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="flex flex-col gap-[60px] 3xl:mx-[370px] 2xl:mx-[200px] lg:mx-[100px] md:mx-[50px] mx-3">
            <Nav />
            {userData.status === "inactive" ? (
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl">Waiting for access</h1>
                    <div className="text-sm opacity-60">
                        This is a private website. Sharing the link to this
                        website is prohibited and monitored by IP address.
                        Please do not share this link with unauthorized
                        individuals.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl">Wellcome to CRS</h1>
                    <hr className="opacity-30" />
                    {userData.files && userData.files.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center">
                            {userData.files.map((file) => (
                                <div
                                    key={file.title}
                                    className="flex flex-col justify-between p-5 border border-white border-opacity-20 gap-auto w-[280px] h-[240px]"
                                >
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-2xl">
                                            {file.title}
                                        </h1>
                                        <p className="opacity-60 text-sm">
                                            {file.description}
                                        </p>
                                    </div>
                                    <Button
                                        title="DOWNLOAD"
                                        onClick={handleDownload(file.url)}
                                    ></Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5">
                            <h1 className="text-2xl">No files available</h1>
                        </div>
                    )}
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Home;
