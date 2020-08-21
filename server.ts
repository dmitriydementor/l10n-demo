import 'zone.js/dist/zone-node'

import { ngExpressEngine } from '@nguniversal/express-engine'
import * as express from 'express'
import { join } from 'path'

import { AppServerModule } from './src/main.server'
import { APP_BASE_HREF } from '@angular/common'
import { existsSync } from 'fs'
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens'
import { NgxRequest, NgxResponse } from '@gorniv/ngx-universal'
import * as compression from 'compression'
import * as cookieparser from 'cookie-parser'

// for debug
require('source-map-support').install()

// ssr DOM
const domino = require('domino')
import { readFileSync, readdirSync } from 'fs'

// index from browser build!
const DIST_FOLDER = join(process.cwd(), 'dist', 'browser')
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString()

// for mock global window by domino
const win = domino.createWindow(template)
global['window'] = win
Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        }
    },
})
global['document'] = win.document
global['CSS'] = null
global['event'] = null;// fix ERROR ReferenceError: event is not defined

global['atob'] = a => {
    return new Buffer(a, 'base64').toString('binary')
}

global['btoa'] = b => {
    return new Buffer(b).toString('base64')
}

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express()
    const indexHtml = existsSync(join(DIST_FOLDER, 'index.html')) ? 'index.html' : 'index'

    // redirects!
    const redirectowww = false
    const redirectohttps = false
    const wwwredirecto = true

    server.use((req, res, next) => {
        // for domain/index.html
        if (req.url === '/index.html') {
            res.redirect(301, 'https://' + req.hostname)
        }

        // check if it is a secure (https) request
        // if not redirect to the equivalent https url
        if (redirectohttps && req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
            // special for robots.txt
            if (req.url === '/robots.txt') {
                next()
                return
            }
            res.redirect(301, 'https://' + req.hostname + req.url)
        }

        // www or not
        if (redirectowww && !req.hostname.startsWith('www.')) {
            res.redirect(301, 'https://www.' + req.hostname + req.url)
        }

        // www or not
        if (wwwredirecto && req.hostname.startsWith('www.')) {
            const host = req.hostname.slice(4, req.hostname.length)
            res.redirect(301, 'https://' + host + req.url)
        }

        next()
    })

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine('html', ngExpressEngine({
        bootstrap: AppServerModule
    }))

    server.set('view engine', 'html')
    server.set('views', DIST_FOLDER)

    // Example Express Rest API endpoints
    // app.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get('*.*', express.static(DIST_FOLDER, { maxAge: '1y'}))

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        global['navigator'] = req['headers']['user-agent']

        const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto']
        res.render(indexHtml, {
            req,
            res,
            providers: [
                { provide: APP_BASE_HREF, useValue: req.baseUrl },
                // for http and cookies
                { provide: REQUEST, useValue: req },
                { provide: RESPONSE, useValue: res },
                // for cookie
                {
                    provide: NgxRequest,
                    useValue: req,
                },
                {
                    provide: NgxResponse,
                    useValue: res,
                },
                // for absolute path
                {
                    provide: 'ORIGIN_URL',
                    useValue: `${http}://${req.headers.host}`,
                },
            ]
        })
    })

    return server
}

function run() {
    const PORT = process.env.PORT || 4000

    const server = app()
    server.use(compression()) // gzip
    server.use(cookieparser()) // cokies

    server.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`)
    })
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
