import React from 'react'
import { Link } from 'react-router-dom'

import { IconItem } from '../index'

const IconItemWithLink = ({ image, text, to }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'white' }}>
      <IconItem image={image} text={text} />
    </Link>
  )
}

export default IconItemWithLink
