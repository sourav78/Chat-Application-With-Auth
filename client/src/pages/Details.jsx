import React, { useContext } from 'react'
import noteContext from '../context/NoteContext'

const Details = () => {

    const {state} = useContext(noteContext)


    return (

        <>
        {state && <div>{state.userName}</div>}
        {/* {a.name} */}
        </>
    )
}

export default Details