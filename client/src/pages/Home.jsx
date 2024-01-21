import React, { useEffect } from 'react'
import axios from 'axios'

const Home = () => {

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000", {
                    withCredentials: true
                })

                const data = await response.data

                if (response.status !== 200) {
                    console.log("Login first");
                }
                console.log(response);
                console.log(data);
            } catch (error) {
                console.log(error.message);
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