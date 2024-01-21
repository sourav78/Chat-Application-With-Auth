import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/signin'
import Signup from './pages/signup'

const App = () => {
    return (
        <>
            <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/signin' element={<Signin/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App
