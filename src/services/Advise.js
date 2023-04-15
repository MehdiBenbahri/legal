import axios from "axios";

export function getAdvise() {
    let params = new URLSearchParams({
        'sort' : '-date_created',
    })
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/advise?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des annonces', error);
    });
}