import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  CreateSmartList,
  IconItemWithLinkAndSetCategory,
  IconItemContainer,
} from 'components'

import * as Styles2 from 'assets/StyledComponents/MainPageWrapper.css'
import { IconElementsShopHelperPage } from 'assets'
import { search_coloredImg } from 'pictures/ParentCategoryIcons'

function HelperPage() {
  return (
    <>
      <Menu
        iconElementsList={IconElementsShopHelperPage}
        activeIcon="shopHelper"
      />
      <PageInfo description={'Helper'} />
      <Styles2.MainPageWrapper>
        <Switch>
          <Route exact path="/shopHelper">
            <IconItemContainer>
              <IconItemWithLinkAndSetCategory
                image={search_coloredImg}
                text="Create smart list"
                to="/shopHelper/createSmartList"
              />
            </IconItemContainer>
          </Route>
          <Route exact path="/shopHelper/createSmartList">
            <CreateSmartList />
          </Route>
        </Switch>
      </Styles2.MainPageWrapper>
      <BottomBarWithIcons />
    </>
  )
}
export default HelperPage
