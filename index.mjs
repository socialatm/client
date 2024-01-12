import { createServer } from 'node:https'
import { readFileSync } from 'node:fs'
import express from 'express'

const app = express()

// Require the route files
import homeRoutes from './routes/home.mjs'
import contactRoutes from './routes/contact.mjs'

// Mount the routes 
app.use('/', homeRoutes);
app.use('/contact', contactRoutes);

const key = readFileSync(process.env.OPP_KEY)
const cert = readFileSync(process.env.OPP_CERT)

/**
 * Create an HTTPS server using the key, cert and app.
 * Listen on the port from OPP_PORT env var.
 * Log any errors starting the server.
 * Log a message when the server starts listening.
 */
const server = createServer(
  {
    key: key,
    cert: cert,
  },
  app
);

server.on("error", (err) => {
  console.error("Error starting server:", err)
});

server.listen(process.env.OPP_PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err)
  } else {
    console.log("Server listening on port:", process.env.OPP_PORT)
  }
})
