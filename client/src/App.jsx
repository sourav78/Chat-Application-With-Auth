import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import NoteState from './context/NoteState'
import Details from './pages/Details'

const App = () => {
    return (
        <NoteState>
            <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/signin' element={<Signin/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                        <Route path='/forgot' element={<ForgotPassword/>}/>
                        <Route path='/details' element={<Details/>}/>
                    </Routes>
                </Router>
            </div>
        </NoteState>
    )
}

export default App
