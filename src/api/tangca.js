import request from "../utils/request";

export function getTangCa(params) {
  return request({
    url: "tangca",
    method: "get",
    params,
  });
}

export function xoaTangCa(data) {
  return request({
    url: "xoatangca",
    method: "put",
    data,
  });
}

