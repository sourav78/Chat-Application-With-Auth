import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("/api", {
                    withCredentials: true
                })

                const data = await response.data

                if (response.status !== 200) {
                    console.log("Login first");
                }
                // console.log(response);
                // console.log(data);
                if(!data.success){
                    navigate('/signin')
                }
            } catch (error) {
                console.log(error.response.data);
                navigate('/signin')
            }
        }

        fetchData()
    })

    return (
        <>

        </>
    )
}

export default Home