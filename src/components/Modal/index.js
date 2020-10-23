import React from 'react'
import { createPortal } from 'react-dom'
import { useHistory } from 'react-router-dom'

import * as Styles from './styles'

const Modal = ({ message, children }) => {
  const history = useHistory()
  const handleClose = () => {
    history.goBack()
  }

  return createPortal(
    <Styles.Wrapper onClick={handleClose}>
      <Styles.Content onClick={(e) => e.stopPropagation()}>
        <Styles.CloseIcon onClick={handleClose}>&times;</Styles.CloseIcon>
        {message ? (
          <Styles.ChildrenContainer>
            <Styles.ChildrenInfo>{message}</Styles.ChildrenInfo>
          </Styles.ChildrenContainer>
        ) : null}
        {children}
      </Styles.Content>
    </Styles.Wrapper>,
    document.querySelector('#modals'),
  )
}

export default Modal
