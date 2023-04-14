import axios from "axios";

export function getRecruitment(status = "Publiée", page = 1, search = '') {
    let params = new URLSearchParams({
        'filter': `{"_and":[{"status":{"_eq": "${status}"}}` + (search ? ',' : '') + (search ? `{"title":{"_contains":"${search}"}}]}` : ']}'),
        'fields': '*,status.*',
        'sort' : '-date_created',
        'limit': 15,
        'page' : page,
        'meta' : 'filter_count'
    })
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/recruitment?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des annonces', error);
    });
}