import request from "../utils/request";

export function getThongBao(params) {
  return request({
    url: "thongbao",
    method: "get",
    params,
  });
}

export function docThongBao(data) {
  return request({
    url: "docthongbao",
    method: "put",
    data,
  });
}
