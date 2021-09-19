import request from "../utils/request";

export function getList(params) {
  return request({
    url: "dangkynghi",
    method: "get",
    params,
  });
}

export function dangKyNghi(data) {
  return request({
    url: "dangkynghi",
    method: "post",
    data,
  });
}
export function xuLyDangKy(data) {
  return request({
    url: "xulydangkynghi",
    method: "post",
    data,
  });
}

export function xoaDangKy(data) {
  return request({
    url: "xoadangkynghi",
    method: "put",
    data,
  });
}

export function getLichNghiCaNhan(params) {
  return request({
    url: "lichnghicanhan",
    method: "get",
    params,
  });
}

export function getSoNgayCong(id){
  return request({
    url:`songaycong/${id}`,
    method:'get'
  });
}

export const TRANG_THAI = {
  CHO_DUYET: "cho_duyet",
  TU_CHOI: "tu_choi",
  DA_DUYET: "da_duyet",
};
