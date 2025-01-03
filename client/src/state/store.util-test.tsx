import React from 'react';
import  { ReactNode } from 'react'; 
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit'; 
import { api } from './api';

export function setupStore() {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];


interface WrapperProps {
  children: ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}
