import React, { createContext, useMemo, useState } from 'react'

export interface ISelectedWishProviderProps {
  children: JSX.Element
}

export const WishContext = createContext<any>({})

export const SelectedWishProvider = ({
  children,
}: ISelectedWishProviderProps) => {
  const [selectedWish, setSelectedWish] = useState({ wish: '', author: '' })

  const selectedWishProviderValue = useMemo(
    () => ({ selectedWish, setSelectedWish }),
    [selectedWish, setSelectedWish]
  )

  return (
    <WishContext.Provider value={selectedWishProviderValue}>
      {children}
    </WishContext.Provider>
  )
}
