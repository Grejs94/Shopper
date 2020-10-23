import React from 'react'

import API from 'API'

import { HistoryParentCategoryList } from './components'
import * as Styles from './styles'

const HistoryContent = () => {
  const useHistory = API.useHistory()

  const useGroceriesCategories = API.useGroceriesCategories()
  const useProductsCategories = API.useProductsCategories()
  const dishesCategories = API.UseDishesCategory()
  const useSavedListsCategories = API.useSavedListsCategories()

  const [mutate_DELETE_DeleteHistory] = API.useDeleteHistory()

  if (
    useHistory.isError ||
    useGroceriesCategories.isError ||
    useProductsCategories.isError ||
    dishesCategories.isError ||
    useSavedListsCategories.isError
  ) {
    return 'Fetching date error...'
  } else if (
    useHistory.isLoading ||
    useGroceriesCategories.isLoading ||
    useProductsCategories.isLoading ||
    dishesCategories.isLoading ||
    useSavedListsCategories.isLoading
  ) {
    return 'Loading date...'
  } else if (
    useHistory.isSuccess &&
    useGroceriesCategories.isSuccess &&
    useProductsCategories.isSuccess &&
    dishesCategories.isSuccess &&
    useSavedListsCategories.isSuccess
  ) {
    const showWhenEmpty = (
      <Styles.Message>Your purchase history is empty!</Styles.Message>
    )

    if (useHistory.data.length < 1) {
      return showWhenEmpty
    }

    const CreateHistoryElement = useHistory.data.map(
      ({ groceries, products, dishes, savedLists, id, DateToShow }) => {
        return (
          <Styles.Wrapper key={id}>
            <div>
              <Styles.Date>{DateToShow}</Styles.Date>
              <Styles.Button
                onClick={() =>
                  mutate_DELETE_DeleteHistory({
                    id: id,
                  })
                }
              >
                Delete from history
              </Styles.Button>
            </div>

            <HistoryParentCategoryList
              parentsTitle="Groceries"
              itemsList={groceries}
              filtredCategories={useGroceriesCategories.data}
            />
            <Styles.EmptyDivToSpace />
            <HistoryParentCategoryList
              parentsTitle="Products"
              itemsList={products}
              filtredCategories={useProductsCategories.data}
            />
            <Styles.EmptyDivToSpace />
            <HistoryParentCategoryList
              parentsTitle="Dishes"
              itemsList={dishes}
              filtredCategories={dishesCategories.data}
            />
            <Styles.EmptyDivToSpace />
            <HistoryParentCategoryList
              parentsTitle="SavedList"
              itemsList={savedLists}
              filtredCategories={useSavedListsCategories.data}
            />
          </Styles.Wrapper>
        )
      },
    )

    return CreateHistoryElement
  }
}

export default HistoryContent
