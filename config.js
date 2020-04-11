import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'

const config = {
  link: new HttpLink({
    uri: 'https://gl-poc.herokuapp.com//v1/graphql', // <- Configure GraphQL Server URL (must be absolute)
  })
}

export default withData(config)