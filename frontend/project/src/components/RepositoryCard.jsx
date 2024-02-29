import {useEffect, useState} from "react";
import {getAllRepositoryLanguages, getReadMeForRepository} from "../service/CRUDGitRepository";

const RepositoryCard = ({gitRepository, languagesColors}) => {
    const [repositoryLanguages, setRepositoryLanguages] = useState(null);
    const [repositoryReadMeImage, setRepositoryReadMeImage] = useState(null);

    useEffect(() => {
        getAllRepositoryLanguages(gitRepository.name).then(languages => {
            setRepositoryLanguages(Object.keys(languages));
        })

        getReadMeForRepository(gitRepository.name).then(readMe => {
            setRepositoryReadMeImage(atob(readMe.content).split(/[()\n ]/).find(word => word.startsWith("http")));
        }).catch(error => {
            setRepositoryReadMeImage("Not found");
        })
    }, []);

    // function capture(){
    //     var canvas = document.getElementById('canvas');
    //     var video = document.getElementById('video');
    //     canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    // }

    // console.log(createThumb("https://github.com/CodecoolGlobal/epg-3-java-T-Andrei-C/assets/115529065/cdc2dd99-4d6a-4d72-85da-e981f892818e", 100, 100));

    return (
        <div className="m-2 h-min w-min">
            <div className="relative">
                <p className="mt-3 ms-5 px-2 pb-1 rounded bg-black absolute text-white font-medium text-xl">{gitRepository.name}</p>
                <img
                    src={repositoryReadMeImage}
                    onError={(e) => e.target.src = "https://media.discordapp.net/attachments/920704942765903922/1212742763112570900/OIP.png?ex=65f2f1b6&is=65e07cb6&hm=c96b57caf88f8cffb417417e0c29710025fc263cc37f82a732a0ff524c510044&=&format=webp&quality=lossless&width=592&height=592"}
                    alt={gitRepository.name}
                    className="object-cover rounded-t-lg h-60 w-60 sm:h-72 sm:w-72"/>
            </div>

            <div
                className="mt-1 rounded-b-lg bg-white border-black h-40 w-60 sm:w-72 shadow-lg inline-grid grid-cols-2">
                <div className="">

                </div>
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
        </div>
    );
}

export default RepositoryCard;