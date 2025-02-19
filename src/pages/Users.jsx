import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Nav } from "../components/layouts/nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { formatDate } from "../utils/formats";

function Admin() {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [filesData, setFilesData] = useState([]);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/welcome");
        } else {
            try {
                const response = await axios.get(
                    "http://localhost:3000/users",
                    {
                        headers: {
                            token: token,
                        },
                    }
                );
                if (response.status !== 200) {
                    toast.error(response.data);
                } else {
                    setUsersData(response.data);
                }
            } catch (error) {
                toast.error(error.response.data);
            }
        }
    };

    const fetchFileData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/welcome");
        } else {
            try {
                const response = await axios.get(
                    "http://localhost:3000/files",
                    {
                        headers: {
                            token: token,
                        },
                    }
                );
                if (response.status !== 200) {
                    toast.error(response.data);
                } else {
                    setFilesData(response.data);
                }
            } catch (error) {
                toast.error(error.response.data);
            }
        }
    };

    const handleStatusChange = async (email, currentStatus) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `http://localhost:3000/user`,
                {
                    email: email,
                    status: currentStatus === "active" ? "inactive" : "active",
                },
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (response.status !== 204) {
                toast.error(response.data);
            } else {
                toast.success("User status updated successfully");
                fetchUserData();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const handleFileChange = async (email, title) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `http://localhost:3000/user`,
                {
                    email: email,
                    file_title: title,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (response.status !== 204) {
                toast.error(response.data);
            } else {
                toast.success("User status updated successfully");
                fetchUserData();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const deleteUser = (email) => async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(
                `http://localhost:3000/user/${email}`,
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (response.status !== 200) {
                toast.error(response.data);
            } else {
                toast.success("The user has been deleted successfully");
                fetchUserData();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchFileData();
    }, [navigate]);

    return (
        <div className="flex flex-col gap-[60px] 2xl:mx-[370px] xl:mx-[200px] lg:mx-[100px] md:mx-[50px] mx-3">
            <Nav />
            <div className="flex flex-col gap-5 overflow-x-auto pb-4">
                {usersData.map(
                    (user) =>
                        user.role !== "admin" && (
                            <>
                                <hr className="opacity-30 min-w-[500px]" />
                                <div
                                    key={user.email}
                                    className="grid grid-cols-[40px_minmax(100px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_80px_50px] sm:grid-cols-6 gap-2 md:gap-6 items-center justify-center text-center min-w-[500px]"
                                >
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={user.status === "active"}
                                            onChange={() =>
                                                handleStatusChange(
                                                    user.email,
                                                    user.status
                                                )
                                            }
                                        />
                                        <span className="slider"></span>
                                    </label>
                                    <div className="text-sm opacity-60">
                                        {user.full_name}
                                    </div>
                                    <div className="text-sm opacity-60">
                                        {user.email}
                                    </div>
                                    <div className="text-sm opacity-60">
                                        {formatDate(user.createdAt)}
                                    </div>
                                    <div className="text-sm opacity-60 flex items-end gap-1">
                                        {filesData.map((file) => (
                                            <div
                                                key={file.title}
                                                className="flex flex-col"
                                            >
                                                <label className="fileCheckBox">
                                                    {file.title}
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    checked={user.files.some(
                                                        (userFile) =>
                                                            userFile.title ===
                                                            file.title
                                                    )}
                                                    onChange={() =>
                                                        handleFileChange(
                                                            user.email,
                                                            file.title
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className="text-sm text-customRed font-bold cursor-pointer"
                                        onClick={deleteUser(user.email)}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </>
                        )
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Admin;
