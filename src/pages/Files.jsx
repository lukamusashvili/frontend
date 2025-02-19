import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Nav } from "../components/layouts/nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { MdDeleteForever, MdEdit, MdClose } from "react-icons/md";
import "../components/modal/Modal.css";

function Files() {
    const navigate = useNavigate();
    const [filesData, setFilesData] = useState([]);
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    const handleDownload = (url) => {
        return () => {
            window.open(url, "_blank");
        };
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

    const addFile = () => async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                `http://localhost:3000/file`,
                {
                    title: title,
                    description: description,
                    url: url,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (response.status !== 201) {
                toast.error(response.data);
            } else {
                toast.success("The file has been added successfully");
                fetchFileData();
            }
            toggleModal();
        } catch (error) {
            toast.error(error.response.data);
            toggleModal();
        }
    };

    const editFile = () => async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `http://localhost:3000/file`,
                {
                    title: title,
                    description: description,
                    url: url,
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
                toast.success("The file has been updated successfully");
                fetchFileData();
            }
            toggleModal();
        } catch (error) {
            toast.error(error.response.data);
            toggleModal();
        }
    };

    const deleteFile = (title) => async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(
                `http://localhost:3000/file/${title}`,
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (response.status !== 200) {
                toast.error(response.data);
            } else {
                toast.success("The file has been deleted successfully");
                fetchFileData();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        fetchFileData();
    }, [navigate]);

    return (
        <div className="flex flex-col gap-[60px] 3xl:mx-[370px] 2xl:mx-[200px] lg:mx-[100px] md:mx-[50px] mx-3">
            <Nav />
            <div className="flex flex-col gap-5 overflow-x-auto pb-4">
                {filesData && filesData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center">
                        {filesData.map((file) => (
                            <div
                                key={file.title}
                                className="flex flex-col justify-between p-5 border border-white border-opacity-20 gap-auto w-[280px] h-[240px]"
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl">
                                            {file.title}
                                        </h1>
                                        <div className="flex gap-1">
                                            <div
                                                className="text-white font-bold cursor-pointer"
                                                onClick={() => {
                                                    setTitle(file.title);
                                                    setDescription(
                                                        file.description
                                                    );
                                                    setUrl(file.url);
                                                    setIsEditing(true);
                                                    toggleModal();
                                                }}
                                            >
                                                <MdEdit size={20} />
                                            </div>
                                            <div
                                                className="text-customRed font-bold cursor-pointer"
                                                onClick={deleteFile(file.title)}
                                            >
                                                <MdDeleteForever size={20} />
                                            </div>
                                        </div>
                                    </div>
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
                        <div className="flex flex-col justify-between p-5 border border-white border-opacity-20 gap-auto w-[280px] h-[240px]">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl">Add a new File</h1>
                                <p className="opacity-60 text-sm">
                                    Enter the details of the new file you want
                                    to add. the file title has to be unique and
                                    it cannot be edited
                                </p>
                            </div>
                            <Button
                                title="Add File"
                                onClick={() => {
                                    setTitle("");
                                    setDescription("");
                                    setUrl("");
                                    setIsEditing(false);
                                    toggleModal();
                                }}
                            ></Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        <h1 className="text-2xl">No files available</h1>
                    </div>
                )}
            </div>
            <ToastContainer />
            {modal && (
                <div className="modal">
                    <div className="modal-content border border-white border-opacity-20 p-10">
                        <h2 className="text-sm font-bold">
                            {title ? "Edit The File" : "Add a new File"}
                        </h2>
                        <div className="flex flex-col gap-5 my-5">
                            <Input
                                disabled={isEditing}
                                placeholder="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Input>
                            <Input
                                placeholder="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            ></Input>
                            <textarea
                                className="w-full bg-transparent h-[90px] opacity-60 border-white border border-opacity-60 px-5 py-4 text-sm"
                                placeholder="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <Button
                            title={title ? "Save" : "Add"}
                            onClick={isEditing ? editFile() : addFile()}
                        ></Button>

                        <button
                            className="close-modal"
                            onClick={() => toggleModal()}
                        >
                            <MdClose size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Files;
