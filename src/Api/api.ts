import axios from 'axios';

const accessToken = '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';

export const gitApi = {
    getRepositories(searchValue: string, page: number, pageSize: number) {
        return axios.get('https://api.github.com/search/repositories', {
            headers: {
                'Authorization': `token ${accessToken}`,
            },
            params: {
                q: searchValue,
                page: page,
                per_page: pageSize,
            },
        })
        .then(response => response.data)
    },
    getRepositoryById(owner: string, repoName: string) {
        return axios.get(`https://api.github.com/repos/${owner}/${repoName}`)
        .then(response => response.data)
    }
}