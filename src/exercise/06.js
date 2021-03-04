// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [{ status, pokemon, error }, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.

  React.useEffect(() => {
    if (!pokemonName) return

    const getPokemonData = async () => {
      setState({ status: 'pending' })
      const pokemon = await fetchPokemon(pokemonName).catch(error => {
        setState({ status: 'rejected', error })
      })
      if (pokemon) setState({ status: 'resolved', pokemon })
    }

    getPokemonData()
  }, [pokemonName])

  if (status === 'rejected') throw error

  return status === 'idle' ? (
    'Submit a pokemon'
  ) : status === 'resolved' ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    <PokemonInfoFallback name={pokemonName} />
  )
}

const ErrorFallback = ({ error }) => (
  <div role="alert">
    There was an error:
    <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
  </div>
)

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
