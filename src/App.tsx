import { Option } from "./components/options"
import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import User from "./pages/User"

function App() {
    return (
        <main className="flex min-h-screen">
            <div>
                <Option />
            </div>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/user/:id" Component={User} />
            </Routes>
        </main>
    )
}

export default App
