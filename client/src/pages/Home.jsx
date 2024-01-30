import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import removeCookie from '../hooks/removeCookie'
import { Modal, message } from 'antd';
import noteContext from '../context/NoteContext';

const Home = () => {

    const { state, updateState } = useContext(noteContext)


    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const [logout, setLogout] = useState(false)

    const [file, setFile] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Image uploaded successfully',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Image not uploaded',
        });
    };
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'No image has been chosen. Please choose an image',
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleLogout = async () => {
        console.log("jj");
        removeCookie('token')
        setLogout(prev => !prev)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = async () => {

        setConfirmLoading(true);

        if (file === null) {

            warning()
            return
        }

        const formData = new FormData()
        formData.append('uploadImage', file)
        formData.append('_id', userData.msg._id)

        try {
            const response = await axios.post("http://localhost:3000/profile/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response);

            if (response.data.success === true) {
                success()
                setConfirmLoading(false);
                setLogout(prev => !prev)
            } else {
                error()
            }


        } catch (error) {
            console.error("Error is", error);
        }

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/chats", {
                    withCredentials: true
                })

                const data = await response.data
                // console.log(data);
                setUserData(data)
                updateState(data.msg)
                console.log(state);
                if (response.status !== 200) {
                    console.log("Login first");
                }

            } catch (error) {
                console.log(error.response.data);
                navigate('/signin')
            }
        }

        fetchData()

    }, [logout])


    return (
        <>
            {contextHolder}
            <div className='flex justify-center items-center h-screen'>
                {userData.success ? (
                    <>
                        <div className="border-4 p-3 rounded-lg border-sky-400 min-w-80">

                            <div className="w-28 h-28 border-2 rounded-full m-auto flex justify-center overflow-hidden items-center">
                                <img className='w-full object-fill' src={userData.msg.profileUrl} alt="" />
                            </div>
                            <div className="mt-5">
                                <h3 className='text-lg'>ID: {userData.msg._id}</h3>
                                <h3 className='text-xl'>UName: {userData.msg.userName}</h3>
                                <h3 className='text-xl'>Email: {userData.msg.email}</h3>
                            </div>
                            <div className=" flex justify-between mt-5">
                                <button
                                    onClick={handleLogout}
                                    className='px-3 py-1 bg-red-600 rounded-md text-xl mt-4'>Logout</button>

                                <button
                                    onClick={showModal}
                                    className='px-3 py-1 bg-sky-400 rounded-md text-xl mt-4'>Profile</button>

                                <Modal
                                    title="Upload Profile Picture"
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    confirmLoading={confirmLoading}>
                                    <form encType="multipart/form-data">
                                        <input
                                            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="large_size"
                                            type="file"
                                            name='uploadImage'
                                            onChange={handleFileChange} />
                                    </form>
                                </Modal>

                                <Link className='px-3 py-1 border-white border-2 rounded-md text-xl mt-4' to='/details'>
                                    context
                                </Link>
                            </div>

                        </div>



                    </>
                ) : (
                    <div className='m-auto' role="status">
                        <svg aria-hidden="true" className="inline w-32 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}


            </div>

        </>
    )
}

export default Home