
const token = "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";

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

export const getGitColorsForLanguages = async () => {
    const request = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
    return await request.json();
}