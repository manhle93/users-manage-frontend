import request from "../utils/request";

export function getCauHinhChamCong(params) {
  return request({
    url: "cauhinhchamcong",
    method: "get",
    params,
  });
}

export function getHeSoLamThem(params) {
  return request({
    url: "hesolamthem",
    method: "get",
    params,
  });
}

export function capNhatCauHinh(data) {
  return request({
    url: "capnhatcauhinh",
    method: "put",
    data,
  });
}

export const CODE_CAU_HINH = [
  { code: "TIME", don_vi: "Phút" },
  { code: "KHOANGCACH", don_vi: "Mét" },
];
