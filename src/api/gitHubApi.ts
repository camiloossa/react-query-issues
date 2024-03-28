import axios from "axios";


export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers:{
        'Authorization': import.meta.env.BEARE_TOKEN_GITHUB
    }
});