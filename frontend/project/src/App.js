import Repositories from "./components/Repositories";
import NavBar from "./components/NavBar";
import {useEffect, useState} from "react";

function App() {
    const [theme, setTheme] = useState("");

    useEffect(() => {
        if (localStorage.getItem("theme") === null){
            localStorage.setItem("theme", "light");
        }

        const body = document.querySelector("body");
        body.classList = "";
        body.classList.add(localStorage.getItem("theme"));
    }, [theme]);

    return (
        <>
            <div>
                <NavBar/>
                <button onClick={() => {localStorage.setItem("theme", "light");setTheme("light");}}>Light</button>
                <button onClick={() => {localStorage.setItem("theme", "dark");setTheme("dark");}}>Dark</button>
                <button onClick={() => {localStorage.setItem("theme", "green");setTheme("green");}}>Green</button>
                <div className="flex justify-center">
                    <Repositories/>
                </div>
            </div>
        </>
    );
}

export default App;