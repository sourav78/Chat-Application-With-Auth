import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import reactSvg from '../assets/react.svg'
import axios from 'axios'
import { message } from 'antd';

const Signin = () => {

    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthorized, setIsAuthorized] = useState(false)

    const success = (content) => {
        messageApi.open({
            type: 'success',
            content: content,
        });
    };
    const errors = (content) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    

    useEffect(() => {
        console.log(isAuthorized);
        isAuthorized && navigate('/') 
    }, [isAuthorized])

    const onHandleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/user/signin", {
                email,
                password
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            )

            const data = await response.data

            data.success && setIsAuthorized(true)

            console.log(data);
        } catch (error) {
            console.log(error.response.data);
            errors(error.response.data.msg)
            setIsAuthorized(false)
        }

    }

    return (
        <>
        {contextHolder}
            <div className='flex justify-center items-center h-screen'>
                <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="px-6 py-4">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src={reactSvg} alt="" />
                        </div>

                        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

                        <form onSubmit={onHandleLogin}>
                            <div className="w-full mt-4">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
                            </div>

                            <div className="w-full mt-4">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>

                                <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

                        <Link to="/signup"><p className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin