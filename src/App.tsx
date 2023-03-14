import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { TimerPage } from './pages'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/timer' element={<TimerPage />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
    </BrowserRouter>
)

export default App

const NoPage = () => {
    const navigate = useNavigate()
    React.useEffect(() => navigate('/timer'), [])
    return <></>
}
