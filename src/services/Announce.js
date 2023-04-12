import axios from "axios";

export function getAnnounce(type = import.meta.env.VITE_DEFAULT_TYPE_ANNOUNCE, page = 1, search = '') {
    let params = new URLSearchParams({
        'filter': `{"_and":[{"type":{"_eq": "${type}"}}` + (search ? `,{"title":{"_contains":"${search}"}}]}` : ']}'),
        'fields': '*,images_list.announce_image_id,status.*',
        'limit': 12,
        'page' : page,
        'meta' : 'filter_count'
    })
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/announce?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des annonces', error);
    });
}

export function getAnnounceImage(id) {
    let params = new URLSearchParams({'filter[id][_eq]': id})
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/announce_image?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des annonces', error);
    });
}