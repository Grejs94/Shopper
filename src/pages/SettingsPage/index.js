import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  IconItemContainer,
  IconItemWithLink,
} from 'components'
import { IconElementsSettingsPage } from 'assets'
import { shopHelper_coloredImg } from 'pictures'

import { SettingsHelperContent } from './components'
import * as Styles from 'assets/StyledComponents/MainPageWrapper.css'

function SettingsPage() {
  return (
    <>
      <Menu
        iconElementsList={IconElementsSettingsPage}
        activeIcon={'settings'}
      />
      <PageInfo description={'Settings'} />
      <Styles.MainPageWrapper>
        <Switch>
          <Route exact path="/settings">
            <IconItemContainer>
              <IconItemWithLink
                image={shopHelper_coloredImg}
                text="Helper"
                to="/settings/helper"
              />
            </IconItemContainer>
          </Route>
          <Route exact path="/settings/helper">
            <SettingsHelperContent />
          </Route>
        </Switch>
      </Styles.MainPageWrapper>
      <Switch>
        <Route path="/settings">
          <BottomBarWithIcons />
        </Route>
      </Switch>
    </>
  )
}
export default SettingsPage
