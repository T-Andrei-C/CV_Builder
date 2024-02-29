import {useEffect, useState} from "react";
import {getAllGitRepositories, getGitColorsForLanguages} from "../service/CRUDGitRepository";
import RepositoryCard from "./RepositoryCard";

const Test = () => {
    const [gitRepositories, setGitRepositories] = useState(null);
    const [gitLanguagesColors, setGitLanguagesColors] = useState(null);
    useEffect(() => {
        getAllGitRepositories().then(repositories => {
            setGitRepositories(repositories);
        })
        getGitColorsForLanguages().then(colors => {
            setGitLanguagesColors(colors);
        })
    }, []);
    // const test = atob(gitRepositories?.content);
    // console.log(test?.split("(")?.find(word => word.startsWith("http")));
    //
    // console.log(atob(gitRepositories.content));

    // console.log(gitRepositories)
    // console.log(gitRepositories.split(/[() ]/).find(word => word.startsWith("http")));
    // console.log(gitRepositories.split(/[()\n ]/))
    return (
        // <img alt="here" src={gitRepositories.split(/[()\n ]/).find(word => word.startsWith("http"))}/>
        //   <h1 className="">here</h1>
        <div className="inline-grid grid-cols-4">
            {gitRepositories && gitRepositories.map(repository => (
                <RepositoryCard gitRepository={repository} languagesColors={gitLanguagesColors}/>
            ))}
        </div>
    );
}

export default Test;