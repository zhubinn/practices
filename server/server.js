/**
 * Created by c on 16/3/21.
 */
import path from 'path'
import Express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

const app = new Express()
const port = 8081

app.use((req, res) => {
    // Compile an initial state
    const initialState = {}

    // Create a new Redux store instance
    //const store = createStore(rootReducer, initialState)

    // Render the component to a string
    //const html = renderToString(
    //    <Provider store={store}>
    //        <App />
    //    </Provider>
    //)
    const html = ''

    // Grab the initial state from our Redux store
    //const finalState = store.getState()

    // Send the rendered page back to the client
    //res.send(renderFullPage(html, finalState))
    if (req.headers.api) {
        res.sendFile(__dirname + '/www/data.html')
    } else {
        res.send(renderFullPage())
    }
})

function renderFullPage(html, initialState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>loading</title>
      </head>
      <body>
        <div id="root">loading</div>
        <script>
          //window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="http://localhost:8082/main.js"></script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
})
