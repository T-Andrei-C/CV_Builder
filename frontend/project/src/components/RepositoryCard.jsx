import {useEffect, useState} from "react";
import {
    getAllContributorsFromRepository,
    getAllRepositoryLanguages, getNumberOfCommitsFromRepository,
    getReadMeForRepository
} from "../service/CRUDGitRepository";

import {IoIosArrowUp} from "react-icons/io";
import {LuArrowUpRightFromCircle} from "react-icons/lu";
import No_Image_Available from "./img/No_Image_Available.img"
import {isDesktop} from "react-device-detect";

const RepositoryCard = ({gitRepository}) => {
    const [repositoryLanguages, setRepositoryLanguages] = useState(null);
    const [repositoryReadMeImage, setRepositoryReadMeImage] = useState("");
    const [repositoryContributors, setRepositoryContributors] = useState(null);
    const [commitCount, setCommitCount] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        getAllRepositoryLanguages(gitRepository.name).then(languages => {
            setRepositoryLanguages(Object.keys(languages));
        })

        getReadMeForRepository(gitRepository.name).then(readMe => {
            const imageLink = atob(readMe.content).split(/[()\n ]/).find(word => word.startsWith("http"));
            if (imageLink !== undefined) {
                setRepositoryReadMeImage(imageLink);
            }
        }).catch(error => {
            setRepositoryReadMeImage("");
        })

        getAllContributorsFromRepository(gitRepository.name).then(contributors => {
            setRepositoryContributors(contributors);
        })

        getNumberOfCommitsFromRepository(gitRepository.name).then(commitCount => {
            setCommitCount(commitCount);
        });
    }, [commitCount, gitRepository]);

    return (
        <div
            className={isDesktop ? `m-2 w-min opacity-60 translate-y-0 transition-all duration-700 hover:opacity-100 hover:-translate-y-8` : `m-2 w-min`}>
            <div className="relative">
                <a href={gitRepository.html_url} target="_blank"
                   className="bg-black absolute flex justify-end opacity-0 w-full h-full transition duration-300 ease-in rounded-t-lg hover:opacity-60 cursor-pointer">
                    <h1 className="text-white m-2 me-3 text-xl animate-pulse"><LuArrowUpRightFromCircle/></h1>
                </a>
                <div className="absolute inline-flex">
                    <p className="text-highlight-color bg-background-color mt-2 ps-1 pe-1 pb-[0.2em] block relative font-medium w-full h-min">{gitRepository.name}</p>
                    <p className="w-0 h-0 border-[0.6em] border-background-color rotate-45 mt-3 mr-5 relative border-b-transparent border-l-transparent transform -translate-x-[0.6em]"></p>
                </div>
                <img
                    src={repositoryReadMeImage}
                    onError={(e) => e.target.src = No_Image_Available}
                    alt={gitRepository.name}
                    className="border-background-color object-cover border-4 rounded-t-lg h-60 w-60 sm:h-72 sm:w-72 bg-secondary-color"/>
            </div>

            <div
                className="bg-background-color shadow-highlight-color/30 mt-1 rounded-b-lg h-40 w-60 sm:w-72 shadow-lg inline-grid grid-cols-2">
                <div className="relative w-28 sm:w-[8.5rem] h-[8.5rem]">
                    <button
                        className="text-highlight-color bg-primary-color border-highlight-color ms-1 mt-1 flex justify-between text-xs w-full font-bold rounded-sm border hover:bg-highlight-color hover:text-primary-color transition-all duration-300"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <p className="ms-1">{repositoryContributors?.length === 1 ? "1 Contributor" : `${repositoryContributors?.length} Contributors`}</p>
                        <p className={isDropdownOpen ? "me-0.5 mt-0.5 transition rotate-180 duration-150" : "me-0.5 mt-0.5 transition rotate-0 duration-150"}>
                            <IoIosArrowUp/></p>
                    </button>
                    {
                        isDropdownOpen &&
                        <div
                            className="bg-primary-color text-highlight-color shadow-highlight-color/10 ms-1 mt-1 absolute text-xs rounded-sm shadow-sm w-28 sm:w-[8.5rem] divide-y divide-highlight-color">
                            {
                                repositoryContributors.map((contributor, i) => (
                                    <a key={i} href={contributor.html_url} target="_blank"
                                       className="flex justify-between cursor-pointer hover:bg-highlight-color hover:text-primary-color transition delay-75 ease-in">
                                        <img alt={contributor.name} src={contributor.avatar_url}
                                             className="my-0.5 ms-0.5 w-4 rounded"/>
                                        <p className="my-0.5 me-0.5">{contributor.login}</p>
                                    </a>
                                ))
                            }
                        </div>
                    }
                    <p className="border-highlight-color text-highlight-color m-1 px-1 border w-max font-bold text-xs rounded-sm">{commitCount} Commits</p>
                </div>
                <div className="h-[8.5rem]">
                    <div className="flex flex-wrap justify-end h-min">
                        {
                            repositoryLanguages && repositoryLanguages.map((language, i) => (
                                <p key={i}
                                   className={`text-highlight-color border-highlight-color border px-1 mt-1 me-1 w-min h-min rounded font-bold text-xs`}>{language}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="text-highlight-color text-center font-thin text-xs w-60 sm:w-72">
                    <h1>Last updated on {gitRepository.pushed_at.substring(0, 10)}</h1>
                </div>
            </div>
        </div>
    );
}

export default RepositoryCard;