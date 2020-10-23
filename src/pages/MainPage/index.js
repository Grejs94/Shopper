import React from 'react'

import { Menu, IconItemContainer, IconItem, ScrollTop } from 'components'
import {
  basket_coloredImg,
  edit_coloredImg,
  list_coloredImg,
  save_coloredImg,
  add_coloredImg,
  remove_coloredImg,
  shopItems_coloredImg,
  dishes_coloredImg,
  groceries_coloredImg,
  lists_coloredImg,
  products_coloredImg,
  history_coloredImg,
  shopHelper_coloredImg,
  search_coloredImg,
  settings_coloredImg,
  route_coloredImg,
} from 'pictures'
import { IconElementsMainPage } from 'assets'

import * as Styles2 from 'assets/StyledComponents/MainPageWrapper.css'
import * as Styles from './styles'

const ScrollToParentCategory = (category) => {
  const div = document.querySelector(`#${category}`)

  div.scrollIntoView()
}

function MainPage() {
  return (
    <>
      <Menu iconElementsList={IconElementsMainPage} activeIcon="" />
      <Styles2.MainPageWrapper>
        <Styles.TableOfContentsContainer>
          <Styles.TableOfContentsTitle>
            Table of Contents:
          </Styles.TableOfContentsTitle>
          <Styles.SectionDescription
            onClick={() => ScrollToParentCategory('AboutShopper')}
          >
            Shopper
          </Styles.SectionDescription>
          <IconItemContainer addStyles={{ marginTop: '15px' }}>
            <IconItem
              addStyle={{ cursor: 'pointer' }}
              image={basket_coloredImg}
              text={'Basket'}
              handleOnClick={() => ScrollToParentCategory('Basket')}
            />
          </IconItemContainer>
          <IconItemContainer addStyles={{ marginTop: '15px' }}>
            <IconItem
              addStyle={{ cursor: 'pointer' }}
              image={shopItems_coloredImg}
              text={'Shop'}
              handleOnClick={() => ScrollToParentCategory('Shop')}
            />
          </IconItemContainer>
          <IconItemContainer addStyles={{ marginTop: '15px' }}>
            <IconItem
              addStyle={{ cursor: 'pointer' }}
              image={shopHelper_coloredImg}
              text={'Helper'}
              handleOnClick={() => ScrollToParentCategory('Helper')}
            />
          </IconItemContainer>
          <IconItemContainer addStyles={{ marginTop: '15px' }}>
            <IconItem
              addStyle={{ cursor: 'pointer' }}
              image={settings_coloredImg}
              text={'Settings'}
              handleOnClick={() => ScrollToParentCategory('Settings')}
            />
          </IconItemContainer>
          <IconItemContainer addStyles={{ marginTop: '15px' }}>
            <IconItem
              addStyle={{ cursor: 'pointer' }}
              image={route_coloredImg}
              text={'Fastest route'}
              handleOnClick={() => ScrollToParentCategory('Route')}
            />
          </IconItemContainer>
        </Styles.TableOfContentsContainer>
        <Styles.SectionsContainer>
          <Styles.EmptyDivForMenuSpace id="AboutShopper" />
          <Styles.SectionContainer>
            <Styles.SectionTitle>Shopper</Styles.SectionTitle>
            <Styles.P>
              Shopper is application to help you make your shopping process as
              easy as possible.
            </Styles.P>
            <Styles.P>
              It enables you create shopping list in basket. You can add food,
              products, dishes and even savedlists as items with its own value,
              when your shopping list is ready you can push it to history.
            </Styles.P>
            <Styles.P>
              Data from your history will let you use AI Shopper Helper to show
              you sorted item you most probably needed right now.
            </Styles.P>
            <Styles.P>
              Shopper also will help you save some time while shopping. He will
              generate fastest road when you shopping to relieve you from
              looking many times on your basket list and wondering what item i
              should go first.
            </Styles.P>
          </Styles.SectionContainer>
          <Styles.EmptyDivForMenuSpace id="Basket" />
          <Styles.SectionContainer>
            <Styles.SectionTitle>Basket</Styles.SectionTitle>
            <IconItemContainer>
              <IconItem image={list_coloredImg} text={'list mode'} />
            </IconItemContainer>
            <Styles.P2>
              When list mode is active items in your basket will display in the
              form of a list.
            </Styles.P2>
            <Styles.P2>
              When you will add dishes or savedList to your basket you can see
              their items by clicking on button (show details/show more).
            </Styles.P2>
            <IconItemContainer>
              <IconItem image={edit_coloredImg} text={'edit mode'} />
            </IconItemContainer>
            <Styles.P2>
              After chenge list mode to edit mode you'll be able to add, remove
              and increse value of products.
            </Styles.P2>
            <div style={{ padding: '0 30px' }}>
              <IconItemContainer>
                <IconItem image={add_coloredImg} text={'Increse value'} />
              </IconItemContainer>

              <Styles.P2>increases the value of an item.</Styles.P2>

              <IconItemContainer>
                <IconItem
                  image={remove_coloredImg}
                  text={'Remove item/Decrese value'}
                />
              </IconItemContainer>

              <Styles.P2>
                If items value is bigger than 2 you can decrese its value, when
                1 you will remove item from basket.
              </Styles.P2>

              <Styles.P2>
                If you haven't pushed list to history yet you will have to make
                decision, push to history or skip and continue editing, We
                recommanded to click skip only if you add wrong item or value to
                basket and push to history before make shopping its important to
                colecting data to use smart list in future.
              </Styles.P2>
            </div>
            <IconItemContainer>
              <IconItem image={save_coloredImg} text={'save'} />
            </IconItemContainer>

            <Styles.P2>
              When basket isn't empty you can push basket list to history.
              Creating stories regularly is essential to proper operation of the
              Shopper helper.
            </Styles.P2>

            <Styles.P2>
              You can not edit history, only deleteing is possible so if you
              forget to add items delete history and create new immediately.
            </Styles.P2>
          </Styles.SectionContainer>
          <Styles.EmptyDivForMenuSpace id="Shop" />
          <Styles.SectionContainer>
            <Styles.SectionTitle>Shop</Styles.SectionTitle>
            <IconItemContainer>
              <IconItem image={groceries_coloredImg} text={''} />
              <IconItem image={products_coloredImg} text={''} />
              <IconItem image={dishes_coloredImg} text={''} />
              <IconItem image={lists_coloredImg} text={'Categories'} />
            </IconItemContainer>
            <Styles.P2>
              When Clicked You will see items list enabling adding items to
              basket or increse value if item is allready in basket.
            </Styles.P2>
            <IconItemContainer>
              <IconItem image={history_coloredImg} text={'history'} />
            </IconItemContainer>
            <Styles.P2>
              It's place when you can watch and delete purchase history.{' '}
            </Styles.P2>
          </Styles.SectionContainer>
          <Styles.EmptyDivForMenuSpace id="Helper" />
          <Styles.SectionContainer>
            <Styles.SectionTitle>Helper</Styles.SectionTitle>
            <IconItemContainer>
              <IconItem image={search_coloredImg} text={'smart list'} />
            </IconItemContainer>

            <Styles.P2>
              You can generate smart shopping list based on your history data.
              And sort them from the most likely.
            </Styles.P2>

            <Styles.P2>
              If you will push history correctly and regulary smart list will be
              helpful and highly effective assuming your needs are stable.
            </Styles.P2>

            <Styles.P2>
              Number close to items name show the following information:
            </Styles.P2>
            <Styles.P3>
              - When Create smart list based on Bought most times(you can change
              in settings) this value shows how many times item is in history.
            </Styles.P3>
            <Styles.P3>
              - If smart list based on Time Intervals he first check did is at
              least 2 history with this item if check is correct he check time
              difference between every purchase. Then he calculates the average
              in days. Last he subtracts days average from how many days have
              passed since the last purchase.
            </Styles.P3>

            <Styles.P3>
              So if you buy Bread on average every 2 days and 3 days passed from
              last buy nubmer will be 1.
            </Styles.P3>

            <Styles.P3>
              And if you for example buy ham on average every 6 days and 2 days
              only passed the number will be -4.
            </Styles.P3>
          </Styles.SectionContainer>
          <Styles.EmptyDivForMenuSpace id="Settings" />
          <Styles.SectionContainer>
            <Styles.SectionTitle>Settings</Styles.SectionTitle>
            <IconItemContainer>
              <IconItem
                image={shopHelper_coloredImg}
                text={'Smart list settings'}
              />
            </IconItemContainer>
            <Styles.P2>
              You can change the way that EI sort your smart list .
            </Styles.P2>
          </Styles.SectionContainer>
          <Styles.EmptyDivForMenuSpace id="Route" />
          <Styles.SectionContainer>
            <Styles.SectionTitle>Fastest route</Styles.SectionTitle>

            <IconItemContainer>
              <IconItem image={route_coloredImg} text={'Route'} />
            </IconItemContainer>
            <Styles.P2>
              Section is still in production! When ready you will be able to:
            </Styles.P2>

            <Styles.P3>
              - creating the arrangement of products in your store.
            </Styles.P3>
            <Styles.P3>
              - downloading created stores from another users.
            </Styles.P3>
            <Styles.P3>
              - creating the fastest route based on store data.
            </Styles.P3>
          </Styles.SectionContainer>
        </Styles.SectionsContainer>
        <ScrollTop value={400} />
      </Styles2.MainPageWrapper>
    </>
  )
}
export default MainPage
