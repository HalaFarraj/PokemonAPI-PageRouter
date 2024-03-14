/* eslint-disable @next/next/no-img-element */
import { POWER_ICON } from '@/pages'
import styles from './listCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const types: { [key: string]: string } = {
    fire: 'firePower',
    water: 'waterPower',
    normal: 'normalPower',
    bug: 'bugPower',
    grass: 'grassPower'
}

export const ListCard = ({ index, data, pokemonId }: {
    index: number
    pokemonId: string
    data: {
        [key: string]: any
    }
}) => {
    return (
        <Link href={`/${pokemonId}`}>
            <div className={`${styles.cardContainer} ${styles[data.type]}`}>
                <div className={styles.indexPowerWrapper}>
                    <div className={styles.indexWrapper}>
                        <Image
                            alt="pokeball"
                            src={'/pokeball.png'}
                            height={25}
                            width={25}
                        />
                        <p className={styles.indexNumber}>
                            #{index}
                        </p>
                    </div>
                    <div className={`${styles.powerWrapper} ${styles[types[data.type]]} `}>
                        <Image
                            alt="pokeball"
                            src={POWER_ICON[data.type]}
                            height={25}
                            width={25}
                        />
                        <p className={styles.powerType}>
                            {data.type}
                        </p>
                    </div>
                </div>
                <div className={styles.characterWrapper}>
                    <img
                        alt="pokeball"
                        src={data.image}
                        height={65}
                        width={65}
                    />
                </div>
                <p className={styles.pokeName}>
                    {data.name}
                </p>
            </div>
        </Link>
    )
}

export default ListCard
