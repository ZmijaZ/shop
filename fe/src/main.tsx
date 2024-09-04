import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </ApolloProvider>
)
