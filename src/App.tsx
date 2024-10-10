import { Option } from "./components/options"
import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/Home"
import UserPage from "./pages/User"

function App() {
    return (
        <main className="flex min-h-screen">
            <div>
                <Option />
            </div>
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/user/:id" Component={UserPage} />
            </Routes>
        </main>
    )
}

export default App
