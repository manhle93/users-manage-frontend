import request from "../utils/request";

export function uploadFile(data, progress = undefined) {
  return request({
    url: "uploadfile",
    method: "post",
    onUploadProgress: (progressEvent) => {
      if (progress !== undefined) {
        if (progressEvent.lengthComputable) {
          progress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        } else {
          progress(progressEvent.loaded);
        }
      }
    },
    data,
  });
}

export function sendMail(data) {
  return request({
    url: "guithu",
    method: "post",
    data,
  });
}

export function getThuDaGui(params) {
  return request({
    url: "thugui",
    method: "get",
    params,
  });
}
export function getThuCaNhan(params) {
  return request({
    url: "thucanhan",
    method: "get",
    params,
  });
}

export function getSingleMail(params) {
  return request({
    url: "singlemail",
    method: "get",
    params,
  });
}

export function getBinhLuan(params) {
  return request({
    url: "binhluan",
    method: "get",
    params,
  });
}

export function guiBinhLuan(data) {
  return request({
    url: "traloithu",
    method: "post",
    data,
  });
}