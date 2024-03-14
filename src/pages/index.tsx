import ListCard from "@/components/listCard";
import styles from '../styles/index.module.css'
import { Inter } from "next/font/google"; // Corrected import statement

const inter = Inter({ subsets: ["latin"] });

export const POWER_ICON: { [key: string]: string } = {
  grass: '/grass.png',
  bug: '/bug.png',
  water: '/water.png',
  fire: '/fire.png',
  normal: '/normal.png'
}

function getPokemonID(uri: string) {
  const idPart = (uri.split('/').slice(-2)[0]);
  const pokemonID = idPart.match(/\d+/)?.[0];
  return pokemonID;
}

export async function getStaticProps() {
  try {
    let pokemons: any[] = []
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    const data = await response.json();
    const slicedData = data.results;
    for (let poke of slicedData) {
      const detailsResponse = await fetch(poke.url)
      const detailsData = await detailsResponse.json()
      const dataObj = {
        name: detailsData.name,
        url: poke.url,
        image: detailsData.sprites.front_shiny,
        type: detailsData.types[0].type.name,
      }

      pokemons.push(dataObj)
    }

    return {
      props: {
        pokemonsData: pokemons
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pokemonsData: []
      }
    };
  }
}


export default function Home({ pokemonsData }: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className} pageWrapper`}
    >
      <div className={styles.gridWrapper}>
        {pokemonsData.map((pokemon: any, index: number) => {
          const id = getPokemonID(pokemon.url)
          return (<ListCard key={index} pokemonId={id || ''} data={pokemon} index={index + 1} />)
        }
        )
        }
      </div>
    </main>
  )
}
