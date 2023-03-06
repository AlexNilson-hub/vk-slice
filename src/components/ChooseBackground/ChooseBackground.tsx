import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useGetWishContext } from '../../common/hooks/useGetWishContext'
import * as htmlToImage from 'html-to-image'
import './style.css'
import '../ChoiceWish/style.css'
import {
  dataURLtoFile,
  getToken,
  getUploadUrl,
  postOnWall,
  savePhoto,
  sendImg,
} from '../../common/helper/postPublication'
import { postStories } from '../../common/helper/postStories'
import {
  IGetUploadUrlResponse,
  ISendImgResponse,
  IToken,
} from '../../common/types/postPublication.types'
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  postOnStoryImg,
  postOnWallImg,
} from '../../common/img/index'

export const ChooseBackground = () => {
  const [imageNumber, setImageNumber] = useState(0)
  const { selectedWish } = useGetWishContext()
  const imageCount = 9
  const imgList = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ]

  const wishTextColor = [3, 6].includes(imageNumber)
    ? 'wishWhiteText'
    : 'wishBlackText'

  const htmlImage = async () => {
    const node = document.getElementById('postcard') as HTMLElement
    console.log(node, 'node')
    try {
      const response = await htmlToImage.toPng(node)
      return response.slice(0, 100)
    } catch (e) {
      console.log(e)
    }
  }

  const postPublication = async (data: any) => {
    try {
      // eslint-disable-next-line no-debugger
      debugger
      const postcard = await dataURLtoFile(data, 'postcard.png')
      console.log(postcard, 'postcard')
      const formData = await new FormData()
      // await formData.append('photo', image1)
      await formData.append('photo', image1)

      const token = await getToken()
      console.log(token, 'token')
      const uploadUrl = (await getUploadUrl(token)) as IGetUploadUrlResponse
      console.log(uploadUrl, 'uploadUrl')
      await formData.append('url', uploadUrl.response.upload_url)

      const sendImgResponse = (await sendImg(formData)) as ISendImgResponse
      console.log(sendImgResponse, 'sendImgResponse')

      if (sendImgResponse?.data) {
        // eslint-disable-next-line no-debugger
        debugger
        const savePhotoResponse = await savePhoto(token, sendImgResponse)
        console.log(savePhotoResponse, 'savePhotoResponse')
        if (savePhotoResponse?.response) {
          await postOnWall(savePhotoResponse)
          console.log(postOnWall, 'postOnWall')
        }
      }
      alert('the story publication successfully posted')
    } catch (e) {
      console.log(e)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setImageNumber((prevState) => {
        if (prevState === imageCount) {
          return (prevState = 0)
        }

        return prevState + 1
      })
    },
    onSwipedRight: () => {
      setImageNumber((prevState) => {
        if (prevState === 0) {
          return (prevState = imageCount)
        }

        return prevState - 1
      })
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const postStoriesHandler = async () => {
    const response = await htmlImage()
    if (response) {
      await postStories(response)
    }
  }

  const postPublicationHandler = async () => {
    const response = await htmlImage()
    if (response) {
      await postPublication(response)
    }
  }

  return (
    <>
      <p className="swipeTitle">Свайпай и выбирай фон</p>

      <div
        style={{
          backgroundImage: `url(${imgList[imageNumber]})`,
        }}
        className="chooseBackgroundContainer"
        id="postcard"
        {...handlers}
      >
        <div className="wishTextContainer">
          <p className={`wishText ${wishTextColor}`}>{selectedWish.wish}</p>
          <p className={`wishText ${wishTextColor}`}>{selectedWish.author}</p>
        </div>
      </div>

      <div className="buttonContainer">
        <img
          src={postOnStoryImg}
          alt="postOnStoryImg"
          onClick={postStoriesHandler}
          className="chooseBackgroundButton"
        />

        <img
          src={postOnWallImg}
          alt="postOnWallImg"
          onClick={postPublicationHandler}
          className="chooseBackgroundButton"
        />
      </div>
    </>
  )
}
