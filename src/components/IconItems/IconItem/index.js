import React from 'react'

import * as Styles from './styles'

function IconItem({ image, text, addStyle, handleOnClick = () => {} }) {
  return (
    <Styles.Item onClick={handleOnClick} style={addStyle}>
      <Styles.ItemPictureContainer>
        <Styles.ItemPicture src={image} />
      </Styles.ItemPictureContainer>
      <Styles.ItemText>{text}</Styles.ItemText>
    </Styles.Item>
  )
}

export default IconItem
