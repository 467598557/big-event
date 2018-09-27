import {GET} from './../utils/request';

export function getList(data) {
    return GET('/event/list', data);
}

export function add(data) {
    return GET('/event/add', data);
}

export async function remove(data) {
    return GET("/event/delete", data);
}

export async function update(data) {
    return GET("/event/update", data);
}

