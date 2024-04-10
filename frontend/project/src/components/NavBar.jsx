import {useState} from "react";

const NavBar = () => {
    const [showNavBar, setShowNavBar] = useState(100);
    const [hideNavBar, setHideNavBar] = useState(350);

    window.onscroll = () => {
        const navBar = document.querySelector("nav");
        const hideAndShowDistanceDifference = 250;
        if (window.scrollY >= hideNavBar){
            setHideNavBar(window.scrollY);
            setShowNavBar(window.scrollY - hideAndShowDistanceDifference);
            navBar.classList.remove("bg-navbar-color/95", "text-navbar-text-color", "border-x-navbar-text-color");
            navBar.classList.add("bg-navbar-color/0", "text-navbar-text-color/0", "border-x-navbar-text-color/0");
        }

        if (window.scrollY <= showNavBar){
            setHideNavBar(window.scrollY + hideAndShowDistanceDifference);
            setShowNavBar(window.scrollY);
            navBar.classList.remove("bg-navbar-color/0", "text-navbar-text-color/0", "border-x-navbar-text-color/0");
            navBar.classList.add("bg-navbar-color/95", "text-navbar-text-color", "border-x-navbar-text-color");
        }
    }

    return (
        <>
            <nav
                className="sticky z-10 top-2 mb-2 bg-navbar-color/95 text-navbar-text-color border-x-navbar-text-color border-2 border-y-transparent transition-colors duration-300 p-4 mx-3 rounded-full">
                {/*<div className="w-full h-16 flex justify-center">*/}
                {/*<span className="bg-black w-16 h-full rounded-full relative">*/}
                {/*    <span className="border-4 border-t-black w-0 h-0 bg-transparent border-b-transparent border-x-transparent absolute"></span>*/}
                {/*</span>*/}

                {/*</div>*/}
                {/*<span className="flex justify-center">*/}
                {/*    <span className="border-[20px] border-t-secondary-color/95 w-0 h-0 bg-transparent border-b-transparent border-x-transparent absolute top-14"></span>*/}
                {/*</span>*/}
                dasdasdasdasd
            </nav>

        </>
    )
}

export default NavBar;