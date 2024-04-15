import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Key } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Pokemon, PokemonAbility } from './types'

const PokeCard = ({ item }: Pokemon) => {
    const { data } = useQuery({
        queryKey: ['abilities', item.name],
        queryFn: () =>
            fetch(item.url).then((res) => res.json())
    })

    return (
        <View>
            <Text style={styles.pokeName}>{item.name}</Text>
            <View style={styles.card}>
                <Image
                    source={{
                        uri: `${data?.sprites?.front_default}`
                    }}
                    style={styles.cardImage}
                />
                <View style={styles.cardBody}>
                    <Text style={styles.cardLabel}>Abilities:</Text>
                    <View>{data?.abilities?.map((ability:PokemonAbility, i: Key) => {
                        return <Text style={styles.ability} key={i}>{ability?.ability?.name}</Text>
                    })}</View>
                </View>
            </View>
        </View>
    )
}
export default PokeCard;

const styles = StyleSheet.create({
    pokeName: {
        textTransform: 'capitalize',
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 12
    },
    card: {
        borderRadius: 6,
        marginVertical: 12,
        marginHorizontal: 12,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    cardImage: {
        height: 210,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: '#F8B6B4',
    },
    cardBody: {
        flex: 1,
        flexGrow: 1,
        padding: 12,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        backgroundColor: '#F37572',
    },
    cardLabel: {
        color: '#F9F6F6',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    ability: {
        textTransform: 'capitalize',
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
})