import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'

const App = () => {
    return (
        <>
            <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/signin' element={<Signin/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                        <Route path='/forgot' element={<ForgotPassword/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App
