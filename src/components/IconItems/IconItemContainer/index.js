import React from 'react'

import * as Styles from './styles'

const IconItemContainer = ({ children, addStyles }) => {
  return (
    <Styles.ItemsContainer style={addStyles}>
      {children}
      <Styles.EmptyItem />
    </Styles.ItemsContainer>
  )
}

export default IconItemContainer
