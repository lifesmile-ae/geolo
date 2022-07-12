import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/reducers';
import storage from './sync_storage';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(reducers, bindMiddleware([thunkMiddleware]));
  } else {
    const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'nextjs',
      whitelist: [
        'addcartItem',
        'siteCurrency',
        'shippingAddress',
        'wishListItems',
        'customer',
        'cartValue',
      ],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducers);

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    );

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
