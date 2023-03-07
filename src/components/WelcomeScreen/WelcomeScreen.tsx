import React, { useEffect } from 'react'
import './style.css'
import { IWelcomeScreenProps } from '../../common/types/components.types'
import bridge from '@vkontakte/vk-bridge'

export const WelcomeScreen = ({ onClickNextButton }: IWelcomeScreenProps) => {
  const backgroundButtonImg = require('../../common/img/BackgroundButton.png')

  const vkWebAppInitAsync = async () => {
    await bridge.send('VKWebAppInit')
  }

  useEffect(() => {
    vkWebAppInitAsync()
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${require(`../../common/img/Background.png`)})`,
      }}
      className="welcomeScreenContainer"
    >
      <img
        onClick={() => onClickNextButton()}
        className="welcomeScreenButton"
        src={backgroundButtonImg}
        alt="backgroundButtonImg"
      />
    </div>
  )
}
