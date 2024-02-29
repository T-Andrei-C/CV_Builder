import {useEffect, useState} from "react";
import {getAllRepositoryLanguages} from "../service/CRUDGitRepository";

const RepositoryCard = ({gitRepository, languagesColors}) => {
    const [repositoryLanguages, setRepositoryLanguages] = useState(null);
    useEffect(() => {
        getAllRepositoryLanguages(gitRepository.name).then(languages => {
            setRepositoryLanguages(Object.keys(languages));
        })
    }, []);

    return (
        // <h1 className="text-amber-50 dark:text-amber-950">hey</h1>
        <div className="m-2 h-min w-min">
            <div className="relative">
                <p className="mt-3 ms-5 px-2 pb-1 rounded bg-black absolute text-white font-medium text-xl">{gitRepository.name}</p>
                <img
                    src="https://github.com/T-Andrei-C/Cinemagic/assets/115529065/29933bb7-4381-4d56-ba10-ad05557877ef"
                    className="object-cover rounded-t-lg h-60 w-60 sm:h-72 sm:w-72"/>
            </div>

            <div
                className="mt-1 rounded-b-lg bg-white border-black h-40 w-60 sm:w-72 shadow-lg inline-grid grid-cols-2">
                <div className="bg-red-500">

                </div>
                <div className="bg-black inline-grid grid-cols-2 sticky">
                    {
                        repositoryLanguages && repositoryLanguages.map(language => (
                            <p className="border px-1 pb-0.5 mt-1 ms-1 bg-black rounded font-bold text-xs"
                               style={{
                                   borderColor: languagesColors[language]?.color,
                                   color: languagesColors[language]?.color
                               }}>{language}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default RepositoryCard;