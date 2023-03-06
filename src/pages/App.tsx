import React, { useState } from 'react'
import { AppRoot } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { WelcomeScreen } from '../components/WelcomeScreen/WelcomeScreen'
import { ChoiceWish } from '../components/ChoiceWish/ChoiceWish'
import { ChooseBackground } from '../components/ChooseBackground/ChooseBackground'
import { SelectedWishProvider } from '../common/contexts/wish.context'

export const App = () => {
  const [step, setStep] = useState(1)
  const firstStep = step === 1
  const secondStep = step === 2
  const thirdStep = step === 3

  const onClickNextButton = () => {
    setStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <AppRoot>
      <SelectedWishProvider>
        <div
          style={{
            position: 'relative',
            // width: '414px',
            height: '100vh',
            width: '100%',
          }}
        >
          {firstStep && <WelcomeScreen onClickNextButton={onClickNextButton} />}
          {secondStep && <ChoiceWish onClickNextButton={onClickNextButton} />}
          {thirdStep && <ChooseBackground />}
        </div>
      </SelectedWishProvider>
    </AppRoot>
  )
}
