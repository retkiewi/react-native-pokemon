import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DexScreen from './src/screens/DexScreen';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import DetailsScreen from './src/screens/DetailsScreen';
import { StoreProvider } from 'easy-peasy';
import FavouritePokemonStore from './src/state/FavouritePokemonStore';

const Stack = createNativeStackNavigator()

const apolloClient = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemonspecies: {
            keyArgs: ['$pokemonId'],
            merge(acc = [], next) {
              return [...acc, ...next]
            }
          },
        },
      },
    },
  }),
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider store={FavouritePokemonStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Dex' component={DexScreen} />
            <Stack.Screen name='Details' component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </ApolloProvider>
  );
}
