import { Hono } from 'hono'
import { cors } from "hono/cors";
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'

import { auth } from '@/lib/auth';

const app = new Hono()

app.use(poweredBy())
app.use(etag(), logger())

app.use(
    "/api/auth/*",
    cors({
        origin: "http://localhost:3000",
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
    }),
);

app.get('/', (c) => { return c.text('Hello Hono!') })

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default {
    fetch: app.fetch,
    port: 4444,
}