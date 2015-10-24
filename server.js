import path from 'path'
import express from 'express'
import webpack from 'webpack'
import config from './webpack.config'
import schema from './schema'

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use('/relay', express.static(
  path.join(__dirname, './node_modules/react-relay/dist')))

app.get('*', (req, res) => {
  console.log(req.url)
  res.sendFile(path.join(__dirname, './dist/index.html'))
})

app.listen(3001, 'localhost', (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.log('Listening at http://localhost:3001')
})
