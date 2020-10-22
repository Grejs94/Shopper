import React from 'react'

import { useSelector } from 'react-redux'

import { EditModeList } from 'components'

import API from 'API'
import { selectCategory } from 'features/category/categorySlice'

const ScrollToParentCategory = ({ category }) => {
  const div = document.querySelector(`#${category}`)

  if (!!div) {
    // console.log(div);
    div.scrollIntoView()
  }
}

function ElementsPage() {
  // { isError, isLoading, isSuccess, data }
  const useGroceres = API.useGroceres()
  const useGroceriesCategories = API.useGroceriesCategories()
  const useProducts = API.useProducts()
  const useProductsCategories = API.useProductsCategories()
  const dishes = API.UseDishes()
  const dishesCategories = API.UseDishesCategory()
  const savedList = API.useSavedList()
  const useSavedListsCategories = API.useSavedListsCategories()

  const category = useSelector(selectCategory)

  if (
    useGroceres.isError ||
    useGroceriesCategories.isError ||
    useProducts.isError ||
    useProductsCategories.isError ||
    dishes.isError ||
    dishesCategories.isError ||
    savedList.isError ||
    useSavedListsCategories.isError
  ) {
    return 'Fetching date error...'
  } else if (
    useGroceres.isLoading ||
    useGroceriesCategories.isLoading ||
    useProducts.isLoading ||
    useProductsCategories.isLoading ||
    dishes.isLoading ||
    dishesCategories.isLoading ||
    savedList.isLoading ||
    useSavedListsCategories.isLoading
  ) {
    return 'Loading date...'
  } else if (
    useGroceres.isSuccess &&
    useGroceriesCategories.isSuccess &&
    useProducts.isSuccess &&
    useProductsCategories.isSuccess &&
    dishes.isSuccess &&
    dishesCategories.isSuccess &&
    savedList.isSuccess &&
    useSavedListsCategories.isSuccess
  ) {
    ScrollToParentCategory({ category })

    return (
      <div>
        <EditModeList
          parentsTitle="Groceries"
          itemsList={useGroceres.data}
          filtredCategories={useGroceriesCategories.data}
          variant="shop"
        />
        <EditModeList
          parentsTitle="Products"
          itemsList={useProducts.data}
          filtredCategories={useProductsCategories.data}
          variant="shop"
        />
        <EditModeList
          parentsTitle="Dishes"
          itemsList={dishes.data}
          filtredCategories={dishesCategories.data}
          variant="shop"
        />
        <EditModeList
          parentsTitle="SavedList"
          itemsList={savedList.data}
          filtredCategories={useSavedListsCategories.data}
          variant="shop"
        />
      </div>
    )
  }
}

export default ElementsPage
