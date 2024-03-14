/* eslint-disable @next/next/no-img-element */
import styles from '../styles/pokemonDetails.module.css'
import Image from 'next/image'
import { POWER_ICON } from '.'
import LinearProgress from '@mui/material/LinearProgress';
import { types } from '@/components/listCard';

export async function getStaticPaths() {
    const allPaths = []
    for (let i = 0; i < 20; i++) {
        allPaths.push({
            params: { pokeId: `${i + 1}` }
        })
    }
    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const { params } = context
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeId}/`)
    const data = await response.json()

    return {
        props: {
            pokeData: data
        }
    }
}

const COLORS: { [key: string]: string } = {
    FIRE: 'rgb(248 90 90 / 44%)',
    GRASS: '#6edfa198',
    BUG: '#70d39d',
    NORMAL: '#b1a6a6be',
    WATER: '#bbceef',
}


export default function PokemonDetails({ pokeData }: any) {
    const type: string = pokeData?.types[0].type.name.toUpperCase()

    const customStyles = {
        borderRadius: 10,
        overflow: 'hidden',
        height: 7,
        '& .MuiLinearProgress-bar': {
            backgroundColor: COLORS[type] || '#000000',
            borderRadius: 10,
        },
        backgroundColor: '#726969'
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.cardContainer}>
                <div className={`${styles.headerContainer}  ${styles[types[pokeData.types[0].type.name]]}`}>
                    <div className={styles.iconWrapper}>
                        <Image
                            alt="pokeball"
                            src={POWER_ICON[pokeData.types[0].type.name]}
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className={styles.heightWeightContainer}>
                        <p className={styles.styledText}>
                            Height : {pokeData.height}
                        </p>
                        <p className={styles.styledText}>
                            Weight : {pokeData.weight}
                        </p>
                    </div>
                </div>

                <div className={styles.detailsContainer}>
                    <div className={styles.ImageWrapper}>
                        <img
                            alt="pokeball"
                            src={pokeData.sprites.front_shiny}
                            height={100}
                            width={100}
                        />
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.nameDescriptionContainer}>
                            <h2 className={styles.nameHeading}>{pokeData.name}</h2>
                            <p>Lorem ipsum </p>
                        </div>
                        <div className={styles.abilitiesStatsContainer}>
                            <div className={styles.abilities}>
                                <h3 className={styles.title}>
                                    Abilities
                                </h3>
                                {
                                    pokeData.abilities.map((element: any, index: number) => (
                                        <p className={styles.ability} key={index}>
                                            {element.ability.name}
                                        </p>
                                    ))
                                }
                            </div>
                            <div className={styles.stats}>
                                <h3 className={styles.title}>
                                    Stats
                                </h3>
                                {
                                    pokeData.stats.map((element: any, index: number) => (
                                        <div className={styles.barWrapper} key={index}>
                                            <div className={styles.labelValueWrapper}>
                                                <p>{element.stat.name}</p>
                                                <p>{element.base_stat}</p>
                                            </div>
                                            <LinearProgress
                                                sx={customStyles}
                                                variant="determinate"
                                                value={element.base_stat} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
