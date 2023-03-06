import { useContext } from 'react'
import { WishContext } from '../contexts/wish.context'

export const useGetWishContext = () => {
  return useContext(WishContext)
}
