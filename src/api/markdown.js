import {GET} from './../utils/request';
import {POST} from "../utils/request";

export function get(data) {
    return GET('/markdown/get', data);
}

export function add(data) {
    return POST('/markdown/add', data);
}

export async function update(data) {
    return POST("/markdown/update", data);
}
