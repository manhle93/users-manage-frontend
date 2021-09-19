import request from "../utils/request";

export function getList(params) {
  return request({
    url: "checking",
    method: "get",
    params,
  });
}

export function getChiTiet(params) {
  return request({
    url: "showchecking",
    method: "get",
    params,
  });
}

export function capNhatTinhHopLe(data) {
  return request({
    url: "capnhattrangthai",
    method: "put",
    data,
  });
}

export function getListCaNhan(params) {
  return request({
    url: "chamcongcanhan",
    method: "get",
    params,
  });
}

export function exportChamCong(params = {}){
  return request({
    url:"checking-export",
    method:"get",
    params: params,
    responseType: 'blob',
  })
}