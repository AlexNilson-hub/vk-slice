export interface ISendImgResponse {
  data: {
    hash: string
    photo: string
    server: number
  }
}

export interface IGetUploadUrlResponse {
  response: {
    album_id: number
    upload_url: string
    user_id: number
  }
}

export interface IToken {
  access_token: string
  scope: string
}
