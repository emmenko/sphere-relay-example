import fs from 'fs'
import path from 'path'
import SphereClient from 'sphere-node-sdk'
// import { introspectionQuery } from 'graphql/utilities'
import introspectionQuery from './introspection-query'

const client = SphereClient.create({
  auth: {
    credentials: {
      projectKey: process.env.SPHERE_PROJECT_KEY,
      clientId: process.env.SPHERE_CLIENT_ID,
      clientSecret: process.env.SPHERE_CLIENT_SECRET
    }
  },
  request: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'relay-example'
    }
  }
})
const body = JSON.stringify({
  query: introspectionQuery
})

client.graphql.query(body)
.then(({ body }) => {
  console.log(body)
  fs.writeFileSync(
    path.join(__dirname, '../schema.json'),
    JSON.stringify(body, null, 2)
  )
  console.log('Schema saved as `schema.json`')
})
.catch(error => console.error(error))
