import axios from "axios";
export function getVending() {
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/vending'),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des ventes',error);
    });
}

export function getVendingById(id) {
    let params = new URLSearchParams({'filter[id][_eq]': id,'fields' : '*,categories.categories_id.*'})
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/vending?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log(`(AuthAPI) Une erreur est survenue lors de la récupération de la vente ( id : ${id} )`,error);
    });
}