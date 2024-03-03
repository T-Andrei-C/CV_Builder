
const auth = `Bearer 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`;

export const getAllGitRepositories = async () => {
    const request = await fetch("https://api.github.com/users/T-Andrei-C/repos", {
        headers: {
            "Authorization" : auth
        }
    });
    return await request.json();
}

export const getAllRepositoryLanguages = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/T-Andrei-C/${repositoryName}/languages`, {
        headers: {
            "Authorization" : auth
        }
    });
    return await request.json();
}

export const getReadMeForRepository = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/T-Andrei-C/${repositoryName}/readme`, {
        headers: {
            "Authorization" : auth
        }
    })
    return await request.json();
}

export const getAllContributorsFromRepository = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/T-Andrei-C/${repositoryName}/contributors`, {
        headers: {
            "Authorization" : auth
        }
    })
    return await request.json();
}

export const getNumberOfCommitsFromRepository = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/T-Andrei-C/${repositoryName}/commits?per_page=1&page=1`, {
        headers: {
            "Authorization" : auth
        }
    })

    const pageLink = request.headers.get("Link").split("page");
    const commitNumber = pageLink[pageLink.length - 1].substring(1).replace(">; rel=\"last\"", "");
    return commitNumber;
}

export const getGitColorsForLanguages = async () => {
    const request = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
    return await request.json();
}