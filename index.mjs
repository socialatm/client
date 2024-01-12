import 'dotenv/config'
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

// Start the server
const server = createServer({
  key: key,
  cert: cert
}, app).listen(process.env.OPP_PORT)

console.log(`Server listening on port: ${process.env.OPP_PORT}`);
