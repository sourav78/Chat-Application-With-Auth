import React, { useState } from 'react'
import NoteConetext from './NoteContext'

const NoteState = ({children}) => {

    const st = {
        name: "guest",
        age: 18
    }

    const [state, setState] = useState(st)

    const updateState = (obj) => {
        setState(obj)
    }

    return (
        <NoteConetext.Provider value={{state, updateState}}>
            {children}
        </NoteConetext.Provider>
    )
}

export default NoteState