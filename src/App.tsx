import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Hero, GenerationForm, AvatarChat, Contact } from './components'
import { useState } from "react";

function App() {
    const [mainQuery, setMainQuery] = useState<string>('');

    return (
        <BrowserRouter>
            <div className="min-h-full overflow-hidden">

                <Navbar />

                <Routes>
                    <Route path="/user" element={<Hero mainQuery={mainQuery} setMainQuery={setMainQuery} />} />
                    <Route path="/generate" element={<GenerationForm mainQuery={mainQuery} setMainQuery={setMainQuery} />} />
                    <Route path="/" element={<AvatarChat />} />
                    <Route path="/:id" element={<AvatarChat />} />
                    <Route path="/:id/:uid" element={<AvatarChat />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>


            </div>
        </BrowserRouter>
    )
}

export default App
