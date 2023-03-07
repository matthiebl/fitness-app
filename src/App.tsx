import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TimerPage } from './pages'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<TimerPage />} />
        </Routes>
    </BrowserRouter>
)

export default App
