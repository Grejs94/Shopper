import React from 'react'

import { Menu, BottomBarWithIcons } from 'components'
import { IconElementsRoutePage } from 'assets'

import * as Styles2 from 'assets/StyledComponents/MainPageWrapper.css'
import * as Styles from './styles'

function RoutePage() {
  return (
    <>
      <Menu iconElementsList={IconElementsRoutePage} activeIcon={'route'} />
      <Styles2.MainPageWrapper>
        <Styles.Message>Page tab still in production!</Styles.Message>
      </Styles2.MainPageWrapper>
      <BottomBarWithIcons />
    </>
  )
}
export default RoutePage
