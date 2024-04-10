
const auth = `Bearer ${process.env["REACT_APP_GIT_TOKEN"]}`;
const gitHubOwner = "MateiMadalina"

export const getAllGitRepositories = async (repositoriesPerPage, numberOfPage) => {
    const request = await fetch(`https://api.github.com/users/${gitHubOwner}/repos?per_page=${repositoriesPerPage}&page=${numberOfPage}`, {
        headers: {
            "Authorization" : auth
        }
    });
    return await request.json();
}

export const getAllRepositoryLanguages = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/${gitHubOwner}/${repositoryName}/languages`, {
        headers: {
            "Authorization" : auth
        }
    });
    return await request.json();
}

export const getReadMeForRepository = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/${gitHubOwner}/${repositoryName}/readme`, {
        headers: {
            "Authorization" : auth
        }
    })
    return await request.json();
}

export const getAllContributorsFromRepository = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/${gitHubOwner}/${repositoryName}/contributors`, {
        headers: {
            "Authorization" : auth
        }
    })

    return request.status === 200 ? await request.json() : [];
}

export const getNumberOfCommitsFromRepository = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/${gitHubOwner}/${repositoryName}/commits?per_page=1&page=1`, {
        headers: {
            "Authorization" : auth
        }
    })

    if (request.status === 200){
        const pageLink = request.headers.get("Link").split("page");
        const commitNumber = pageLink[pageLink.length - 1].substring(1).replace(">; rel=\"last\"", "");
        return commitNumber;
    }
    return 0;
}

export const getGitColorsForLanguages = async () => {
    const request = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
    return await request.json();
}