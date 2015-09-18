var getBabelRelayPlugin = require('babel-relay-plugin')
// FIXME: provide correct schema.json
var schema = require('./schema.json')

module.exports = getBabelRelayPlugin(schema.data)
