import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'

import schema from '../schema'

graphql(schema, introspectionQuery)
.then(function (result) {
  if (result.errors)
    throw new Error(result.errors)

  fs.writeFileSync(
    path.join(__dirname, '../schema/schema.json'),
    JSON.stringify(result, null, 2)
  )
})
.catch(function (error) {
  throw new Error(error)
})
