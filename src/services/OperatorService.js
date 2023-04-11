import axios from "axios";

export function getOperator() {
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/operator'),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des opérateurs',error);
    });
}