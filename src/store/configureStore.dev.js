/**
 * Created by c on 16/3/21.
 */
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import Immutable from 'immutable'
import isPlainObject from 'lodash/isPlainObject'
import rootReducer from 'reducers'

const stateTransformer = states => {
    let finalStates = {}
    for(let key in states) {
        if (!states.hasOwnProperty(key))
            continue

        const state = states[key]

        if (Immutable.Iterable.prototype.isPrototypeOf(state) && typeof state.toObject === 'function') {
            finalStates[key] = state.toObject()
        } else if (isPlainObject(state)) {
            finalStates[key] = stateTransformer(state)
        }
    }
    return JSON.stringify(finalStates)
}

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk, createLogger({ stateTransformer })),
        window.devToolsExtension()
    ))

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
