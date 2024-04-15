import React, { ReactNode, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { SafeAreaView } from 'react-native-safe-area-context';
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import PokeCard from "./PokeCard";

import {
  PAGE_LIMIT,
  POKEMON_COUNT,
  SCROLL_INDEX
} from './constants';

const List = () => {
  const [page, setPage] = useState(0)
  const listViewRef = useRef<FlashList<any>>(null);

  const fetchPokemons = (page = 0) =>
    fetch(`${process.env.EXPO_PUBLIC_API}pokemon/?limit=${PAGE_LIMIT}&offset=${PAGE_LIMIT * page}`).then((res) => res.json())

  const { isPending, isError, error, data, isPlaceholderData } =
    useQuery({
      queryKey: ['pages', page],
      queryFn: () => fetchPokemons(page),
      placeholderData: keepPreviousData,
    })

  const renderItem = ({ item }: ListRenderItemInfo<any>) => {
    return <PokeCard item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {isPending ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <FlashList
            renderItem={renderItem}
            estimatedItemSize={300}
            data={data.results}
            ListEmptyComponent={() => <Text style={styles.title}>List is empty :(</Text>}
            ListHeaderComponent={() => <Text style={styles.title}>Pokemons</Text>}
            initialScrollIndex={SCROLL_INDEX}
            ref={listViewRef}
          />
        )}
        <View style={styles.bottomBox}>
          <TouchableOpacity disabled={page === 0} activeOpacity={0.3} onPress={() => {
            listViewRef?.current?.scrollToIndex({
              animated: true,
              index: SCROLL_INDEX,
            });
            setPage((old) => Math.max(old - 1, 0))
          }}>
            <View><Text style={styles.button}>Prev</Text></View>
          </TouchableOpacity>
          <Text style={styles.pageNum}>Page: {page + 1}</Text>
          <TouchableOpacity disabled={isPlaceholderData || page * PAGE_LIMIT + PAGE_LIMIT >= POKEMON_COUNT} activeOpacity={0.3} onPress={() => {
            if (!isPlaceholderData && page * PAGE_LIMIT < POKEMON_COUNT) {
              listViewRef.current?.scrollToIndex({
                animated: true,
                index: SCROLL_INDEX,
              });
              setPage((old) => old + 1)
            }
          }}>
            <View><Text style={styles.button}>Next</Text></View>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar />
    </SafeAreaView>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "white",
    alignItems: "stretch",
  },
  bottomBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor: "white",
    alignItems: "stretch",
    marginTop: 12,
  },
  pageNum: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center"
  },
  button: {
    height: 50,
    width: 150,
    padding: 2,
    backgroundColor: "#FCD259",
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 22,
  },
  title: {
    color: '#ef5350',
    fontSize: 26,
    fontWeight: 'bold',
    margin: 12
  },
});