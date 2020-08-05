import { ICategoryResponse, fetchAllCategories } from '../api/Category'
import { Store } from '../utils/Store'

// actions
export const FETCH_ALL_CATEGORIES = 'Category/FETCH_ALL' as const
export const ADD_ONE_Category = 'Category/ADD_ONE' as const

// connect store and actions
export class CategoryStore extends Store<ICategoryResponse[]> {
  actions = {
    [FETCH_ALL_CATEGORIES]: this.fetchAllCategories,
  }

  constructor(initData?: ICategoryResponse[]) {
    super(initData || null)
  }

  async fetchAllCategories() {
    const [fetchedCategorys, fetchError] = await fetchAllCategories()
    if (fetchError) {
      return console.error(fetchError)
    }

    return fetchedCategorys
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case FETCH_ALL_CATEGORIES:
        this._data = [...result]
        break
    }

    // window.dispatchEvent(
    //   new CustomEvent('storeupdated', { detail: { Category: this.data } })
    // )
  }
}
