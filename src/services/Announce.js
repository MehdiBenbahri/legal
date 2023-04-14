import axios from "axios";

export function getAnnounce(type = import.meta.env.VITE_DEFAULT_TYPE_ANNOUNCE, page = 1, search = '') {
    let params = new URLSearchParams({
        'filter': `{"_and":[` + (type === 'all' ? '' : `{"type":{"_eq": "${type}"}}`) + (search && type !== 'all' ? ',' : '') + (search ? `{"title":{"_contains":"${search}"}}]}` : ']}'),
        'fields': '*,images_list.announce_image_id,status.*',
        'sort' : '-date_created',
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

export function getAnnounceById(id) {
    let params = new URLSearchParams({'filter[id][_eq]': id,'fields': '*,images_list.announce_image_id,status.*'})
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

export function getAnnounceAllImage(id) {
    let params = new URLSearchParams({'filter[announce_id][_eq]': id, 'fields' : '*,announce_image_id.image,announce_image_id.title,announce_image_id.description'})
    let options = {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        url: (import.meta.env.VITE_API_BASE + 'items/announce_announce_image?' + params),
    };
    return axios(options).then((response) => {
        return response;
    }, (error) => {
        console.log('(AuthAPI) Une erreur est survenue lors de la récupération des annonces', error);
    });
}