import request from '@/utils/request'

export function getCarouselImages(){
    return request({
        url: '/minio/getCarouselImages',
        method: 'post'
    })
}

export function getCategories(){
    return request({
        url: '/minio/getCategories',
        method: 'post'
    })
}

export function getExhibitionData(itemId) {
  return request({
    url: '/minio/exhibition/data',
    method: 'get',
    params: { itemId }
  })
}


export function uploadFile(formData) {
  return request({
    url: '/minio/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data' 
    }
  })
}