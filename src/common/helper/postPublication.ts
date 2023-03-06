import bridge from '@vkontakte/vk-bridge'
import instance from '../../api/instance'
import { ISendImgResponse, IToken } from '../types/postPublication.types'

export const getToken = () => {
  try {
    return bridge.send('VKWebAppGetAuthToken', {
      app_id: 51513371,
      scope: 'stories,wall,photos',
    })
  } catch (err) {
    console.log(err)
  }
}

export const getUploadUrl = (token: IToken) => {
  try {
    return bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.getWallUploadServer',
      params: { access_token: token.access_token, v: '5.131' },
    })
  } catch (err) {
    console.log(err)
  }
}

export const sendImg = (data: Blob | FormData) => {
  try {
    return instance.post(
      'https://tass-miniapp-vk.linestest.com/tass-miniapp.php',
      data
    )
  } catch (err) {
    console.log(err)
  }
}

export const savePhoto = (token: IToken, uploadImg: ISendImgResponse) => {
  try {
    return bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.saveWallPhoto',
      params: {
        access_token: token.access_token,
        v: '5.131',
        user_id: 0,
        photo: uploadImg?.data.photo,
        server: uploadImg?.data.server,
        hash: uploadImg?.data.hash,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export const postOnWall = (savePhotoResponse: any) => {
  const attachments = `photo${savePhotoResponse?.response[0].owner_id}_${savePhotoResponse.response[0].id}`

  try {
    return bridge.send('VKWebAppShowWallPostBox', {
      message: 'Hello!',
      attachments,
    })
  } catch (err) {
    console.log(err)
  }
}

export const dataURLtoFile = (dataUrl: any, fileName: string) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], fileName, { type: mime })
}
