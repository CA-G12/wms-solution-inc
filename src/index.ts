import http from 'http'
import app from './app'
import { sequelize as dbConnection } from './db/connection'

const port = 3000

const server = http.createServer(app)

dbConnection
  .sync()
  .then(() =>
    server.listen(port, () => console.log(`app is running on prot: ${port}`))
  )
  .catch(console.log)
