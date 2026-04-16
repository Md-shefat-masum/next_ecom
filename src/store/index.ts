import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  cartReducer,
  categoryReducer,
  brandReducer,
  collectionReducer,
  productReducer,
  checkoutReducer,
  wishlistReducer,
  compareReducer,
  reviewReducer,
  orderReducer,
  accountReducer,
  notificationReducer,
  configReducer,
  searchReducer,
  blogReducer,
  modalReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    brand: brandReducer,
    collection: collectionReducer,
    product: productReducer,
    checkout: checkoutReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    review: reviewReducer,
    order: orderReducer,
    account: accountReducer,
    notification: notificationReducer,
    config: configReducer,
    search: searchReducer,
    blog: blogReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
