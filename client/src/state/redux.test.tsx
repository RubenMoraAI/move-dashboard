import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import globalReducer, { InitialStateTypes } from '@/state';
import { createNoopStorage, makeStore } from './redux';

const mockStore = configureStore({ reducer: globalReducer });

const TestComponent = () => {
  return <div>Mock Store is Working</div>;
};

describe('StoreProvider with Mock Store', () => {
  it('renders children correctly with a mock store', () => {
    render(
      <Provider store={mockStore}>
        <TestComponent />
      </Provider>
    );

    expect(screen.getByText('Mock Store is Working')).toBeInTheDocument();
  });
});
describe('createNoopStorage', () => {
  it('should return null when getItem is called', async () => {
    const storage = createNoopStorage();
    const result = await storage.getItem('key');
    expect(result).toBeNull();
  });

  it('should return the value when setItem is called', async () => {
    const storage = createNoopStorage();
    const value = 'value';
    const result = await storage.setItem('key', value);
    expect(result).toBe(value);
  });

  it('should return undefined when removeItem is called', async () => {
    const storage = createNoopStorage();
    const result = await storage.removeItem('key');
    expect(result).toBeUndefined();
  });
});
describe('makeStore', () => {
  it('should create a store with the correct reducers', () => {
    const store = makeStore();
    const state: { global: InitialStateTypes; api: any } = store.getState();
    expect(state.global).toBeDefined();
  });

  it('should have the correct middleware', () => {
    const store = makeStore();
    const middleware = store.dispatch;
    expect(middleware).toHaveLength(1); 
  });

  it('should handle actions correctly', () => {
    const store = makeStore();
    const action = { type: 'test/action' };
    store.dispatch(action);
    store.dispatch(action);
    const state = store.getState();
    expect(state).toBeDefined();
  });
});
