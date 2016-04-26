import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';

import authentication from '../middleware/authentication';
import constants from '../utils/constants';
import token from '../middleware/token';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const engine = filter(createEngine(constants.STORAGE_KEY), ['settings']);
  const storageMiddleware = storage.createMiddleware(engine);

  const createStoreWithMiddleware = applyMiddleware(
    token, // Should be passed before 'apiMiddleware'
    apiMiddleware,
    authentication,
    storageMiddleware
  )(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};
