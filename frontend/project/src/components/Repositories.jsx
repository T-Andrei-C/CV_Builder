import {useEffect, useState} from "react";
import {getAllGitRepositories, getGitColorsForLanguages} from "../service/CRUDGitRepository";
import RepositoryCard from "./RepositoryCard";

const Repositories = () => {
    const [gitRepositories, setGitRepositories] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const repositoriesPerPage = 8;

    useEffect(() => {
        getAllGitRepositories(repositoriesPerPage, numberOfPage).then((repositories) => {
            setGitRepositories([...gitRepositories, ...repositories]);
        })
    }, [numberOfPage]);

    const loadMore = () => {
        setNumberOfPage(numberOfPage + 1);
    }

    // console.log(document.getElementById("test")?.getBoundingClientRect().bottom);

    // window.onscroll = () => {
    //     console.log(document.getElementById("test")?.getBoundingClientRect().bottom + " bottom");
    //     console.log(document.getElementById("test")?.getBoundingClientRect().top + " top")
    //     // console.log(window.scrollY)
    //     const cardTop = window.scrollY + document.getElementById("test")?.getBoundingClientRect().top;
    //     // console.log(cardTop)
    //     const cardBottom = document.getElementById("test")?.getBoundingClientRect().bottom - document.getElementById("test")?.getBoundingClientRect().top;
    //     // console.log(cardBottom + " bottom")
    //     // console.log(window.scrollY)
    // }

    return (
        <div className="">
            <div className="relative justify-center flex">
                <div id="test"
                     className="relative inline-grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 exsm:grid-cols-2">
                    {gitRepositories && gitRepositories.map((repository, i) => (
                        <div className="">
                            <RepositoryCard key={i} gitRepository={repository}/>
                        </div>
                    ))}
                </div>
            </div>
            {numberOfPage === 1 &&
                <div className="flex justify-center w-full">
                    <div className="inline-grid grid-cols-3 my-5">
                        <hr className="h-1.5 me-3 mt-2.5 bg-highlight-color border-0"/>
                        <button onClick={loadMore} className="">Load more</button>
                        <hr className="h-1.5 ms-3 mt-2.5 w-52 bg-highlight-color border-0"/>
                    </div>
                </div>
            }
            <p>asdasdasd</p>
            <p>asdasdasd</p>
            <p>asdasdasd</p>
            <p>asdasdasd</p>
            <p>asdasdasd</p>
            <p>asdasdasd</p>
            <p>asdasdasd</p>

        </div>
    );
}

export default Repositories;