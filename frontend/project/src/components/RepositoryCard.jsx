import {useEffect, useState} from "react";
import {
    getAllContributorsFromRepository,
    getAllRepositoryLanguages, getNumberOfCommitsFromRepository,
    getReadMeForRepository
} from "../service/CRUDGitRepository";

import {IoIosArrowUp} from "react-icons/io";
import {LuArrowUpRightFromCircle} from "react-icons/lu";
import {IoTriangleSharp} from "react-icons/io5";

const RepositoryCard = ({gitRepository, languagesColors}) => {
    const [repositoryLanguages, setRepositoryLanguages] = useState(null);
    const [repositoryReadMeImage, setRepositoryReadMeImage] = useState(null);
    const [repositoryContributors, setRepositoryContributors] = useState(null);
    const [commitCount, setCommitCount] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        getAllRepositoryLanguages(gitRepository.name).then(languages => {
            setRepositoryLanguages(Object.keys(languages));
        })

        getReadMeForRepository(gitRepository.name).then(readMe => {
            setRepositoryReadMeImage(atob(readMe.content).split(/[()\n ]/).find(word => word.startsWith("http")));
        }).catch(error => {
            setRepositoryReadMeImage("Not found");
        })

        getAllContributorsFromRepository(gitRepository.name).then(contributors => {
            setRepositoryContributors(contributors);
        })

        getNumberOfCommitsFromRepository(gitRepository.name).then(commitCount => {
            setCommitCount(commitCount);
        });
    }, [commitCount]);

    return (

        <div className="m-2 h-min w-min">
            <div className="relative border-2 border-gray-100 rounded-t-lg">
                <a href={gitRepository.html_url} target="_blank" className="absolute flex justify-end bg-black opacity-0 w-full h-full transition duration-300 ease-in rounded-t-lg hover:opacity-60 cursor-pointer">
                    <h1 className="text-white m-2 me-3 text-xl"><LuArrowUpRightFromCircle /></h1>
                </a>
                <div className="absolute inline-flex">
                    <p className="mt-2 ps-1 block text-black pb-0.5 relative bg-gray-100 font-medium w-full h-min">{gitRepository.name}</p>
                    <p className="text-gray-100 mt-3 relative rotate-90 text-[1.8em] transform -translate-x-[0.1em] -translate-y-[0.18em]"><IoTriangleSharp /></p>
                </div>
                <img
                    src={repositoryReadMeImage}
                    onError={(e) => e.target.src = "https://media.discordapp.net/attachments/920704942765903922/1213503472385654814/Untitled430_20240302170922.png?ex=65f5b62d&is=65e3412d&hm=b5eb939c0fd603d68eebb41733aa5502ae785a2816302abba512b369efb2246e&=&format=webp&quality=lossless&width=610&height=610"}
                    alt={gitRepository.name}
                    className="object-cover rounded-t-lg h-60 w-60 sm:h-72 sm:w-72"/>
            </div>

            <div
                className="mt-1 rounded-b-lg bg-white border-black h-40 w-60 sm:w-72 shadow-lg inline-grid grid-cols-2">
                <div className="relative w-28 sm:w-[8.5rem] h-[8.5rem]">
                    <button
                        className="ms-1 mt-1 flex text-gray-400 justify-between bg-white text-xs w-full font-bold rounded-sm border-gray-100 border hover:bg-gray-100 transition duration-300 ease-in"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <p className="ms-0.5">Contributors</p>
                        <p className={isDropdownOpen ? "me-0.5 mt-0.5 transition rotate-180 duration-500" : "me-0.5 mt-0.5 transition rotate-0 duration-500"}><IoIosArrowUp/></p>
                    </button>
                    {
                        isDropdownOpen &&
                        <div
                            className="ms-1 mt-1 bg-white absolute text-xs rounded-sm shadow-sm w-28 sm:w-[8.5rem] divide-y divide-gray-50">
                            {
                                repositoryContributors.map(contributor => (
                                    <a href={contributor.html_url} target="_blank"
                                       className="flex justify-between cursor-pointer hover:bg-gray-50 transition delay-75 ease-in">
                                        <img alt={contributor.name} src={contributor.avatar_url}
                                             className="my-0.5 ms-0.5 w-4 rounded"/>
                                        <p className="my-0.5 me-0.5">{contributor.login}</p>
                                    </a>
                                ))
                            }
                        </div>
                    }
                    <p className="m-1 px-1 border border-black w-max font-bold text-xs rounded-sm">{commitCount} Commits</p>
                </div>
                <div className="h-[8.5rem]">
                    <div className="flex flex-wrap justify-end h-min">
                        {
                            repositoryLanguages && repositoryLanguages.map(language => (
                                <p className="border px-1 pb-0.5 m-1 w-min h-min rounded font-bold text-xs"
                                   style={{
                                       borderColor: languagesColors[language]?.color,
                                       color: languagesColors[language]?.color
                                   }}>{language}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="text-center font-thin text-xs w-60 sm:w-72">
                    <h1>Last updated on {gitRepository.pushed_at.substring(0, 10)}</h1>
                </div>
            </div>
        </div>
    );
}

export default RepositoryCard;