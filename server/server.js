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
        <link rel="stylesheet" type="text/css" href="//localhost:8082/lib/main.min.css" />
      </head>
      <body>
        <div id="root">loading</div>
        <script>
          //window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          var SCRM = {
            url:function(){

            }
          },
          GLOBAL_INFO = {
            userinfo:{
                ID:""
            }
          }
        </script>
        <script src="//cdn.bootcss.com/react/0.14.7/react.min.js"></script>
        <script src="//cdn.bootcss.com/react/0.14.7/react-dom.min.js"></script>
        <script src="//cdn.bootcss.com/immutable/3.8.1/immutable.min.js"></script>
        <script src="//localhost:8082/lib/main.js"></script>
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
