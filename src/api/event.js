import {GET} from './../utils/request';

export function getList(data) {
    return GET('/events/list', data);
}

export function add(data) {
    return GET('/events/add', data);
}

export async function remove(data) {
    return GET("/events/delete", data);
}

export async function update(data) {
    return GET("/events/update", data);
}

