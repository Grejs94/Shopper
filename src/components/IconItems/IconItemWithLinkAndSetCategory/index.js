import React from 'react'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { IconItem } from '../index'

import { setCategory } from 'features/category/categorySlice'

const IconItemWithLinkAndSetCategory = ({ image, text, to }) => {
  const dispatch = useDispatch()

  return (
    <Link
      to={to}
      onClick={() => {
        dispatch(setCategory(text))
      }}
      style={{ textDecoration: 'none', color: 'white' }}
    >
      <IconItem image={image} text={text} />
    </Link>
  )
}

export default IconItemWithLinkAndSetCategory
