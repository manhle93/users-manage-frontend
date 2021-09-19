import request from "../utils/request";
export function getNhanVien(params) {
  return request({
    url: "nhanvien",
    method: "get",
    params,
  });
}

export function addNhanVien(data) {
  return request({
    url: "nhanvien",
    method: "post",
    data,
  });
}

export function editNhanVien(data) {
  return request({
    url: "nhanvien",
    method: "put",
    data,
  });
}

export function showNhanVien(params) {
  return request({
    url: "showNhanVien",
    method: "get",
    params,
  });
}

export function nghiViec(data) {
  return request({
    url: "nghiviec",
    method: "put",
    data,
  });
}

export function exportNhanVien(params = {}){
  return request({
    url:"exportnhanvien",
    method:"get",
    params: params,
    responseType: 'blob',
  })
}