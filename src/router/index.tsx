import { BrowserRouter, Route, Routes } from "react-router-dom"
import CharactersPage from "../pages/CharactersPage"
import HomePage from "../pages/HomePage"
import FilmographyPage from "../pages/FilmographyPage"


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/characters" element={<CharactersPage />} />
                <Route path="/filmography" element={<FilmographyPage />} />
            </Routes>
        </BrowserRouter>
    )
}