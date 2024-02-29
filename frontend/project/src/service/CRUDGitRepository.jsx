
const token = "Bearer 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";

export const getAllGitRepositories = async () => {
    const request = await fetch("https://api.github.com/users/T-Andrei-C/repos", {
        headers: {
            "Authorization" : token
        }
    });
    return await request.json();
}

export const getAllRepositoryLanguages = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/T-Andrei-C/${repositoryName}/languages`, {
        headers: {
            "Authorization" : token
        }
    });
    return await request.json();
}

export const getReadMeForRepository = async (repositoryName) => {
    const request = await fetch(`https://api.github.com/repos/T-Andrei-C/${repositoryName}/readme`, {
        headers: {
            "Authorization" : token
        }
    })
    return await request.json();
}

export const getGitColorsForLanguages = async () => {
    const request = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
    return await request.json();
}