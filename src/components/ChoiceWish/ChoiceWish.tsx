import React, { useState } from 'react'
import { wishList } from '../../common/consts/wish'
import { useSwipeable } from 'react-swipeable'
import { useGetWishContext } from '../../common/hooks/useGetWishContext'
import './style.css'
import { IChoiceWishProps } from '../../common/types/components.types'
import { wishAuthor } from '../../common/consts/wishAuthor'

export const ChoiceWish = ({ onClickNextButton }: IChoiceWishProps) => {
  const [wish, setWish] = useState(0)
  const wishListLen = wishList.length
  const { setSelectedWish } = useGetWishContext()
  const swipeText = require(`../../common/img/swipeText.png`)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setWish((prevState) => {
        if (prevState === wishListLen - 1) {
          return (prevState = 1)
        }

        return prevState + 1
      })
    },
    onSwipedRight: () => {
      setWish((prevState) => {
        if (prevState === 0) {
          return (prevState = wishListLen - 1)
        }

        return prevState - 1
      })
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <div
      className="wishContainer"
      style={{
        backgroundImage: `url(${require(`../../common/img/1.png`)})`,
      }}
      {...handlers}
    >
      <img className="helpText" src={swipeText} alt="swipeText" />

      <div className="wishTextContainer">
        <p className="wishText shortWishText">{wishList[wish]}</p>
        <p className="wishAuthor shortWishText">{wishAuthor[wish]}</p>
      </div>

      <button
        className="buttonStyle"
        type="button"
        onClick={() => {
          setSelectedWish({ wish: wishList[wish], author: wishAuthor[wish] })
          onClickNextButton()
        }}
      >
        ВЫБРАТЬ ФОН
      </button>
    </div>
  )
}
