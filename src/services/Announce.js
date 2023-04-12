import axios from "axios";
export function getAnnounce(type = import.meta.env.VITE_DEFAULT_TYPE_ANNOUNCE) {
    let params = new URLSearchParams({'filter[type][_eq]': type,'fields' : '*,images_list.announce_image_id,status.*'})
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/announce?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des annonces',error);
    });
}

export function getAnnounceImage(id) {
    let params = new URLSearchParams({'filter[id][_eq]' : id})
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/announce_image?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des annonces',error);
    });
}