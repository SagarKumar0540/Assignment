import React, { useCallback, useEffect, useState, useRef, memo, JSX } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDebounce } from '../../hooks/debounce';

export interface PaginatedFlatListState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
  cachedPages: { [key: number]: T[] };
}

export interface PaginatedFlatListProps<T> {
  fetchData: (skip: number) => Promise<void>;
  state: PaginatedFlatListState<T>;
  renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
  ListEmptyComponent?: () => JSX.Element; 
  ListHeaderComponent?: () => JSX.Element;
  itemHeight?: number;
  pageSize?: number;
}

const PaginatedFlatList = memo(
  <T,>({
    fetchData,
    state,
    renderItem,
    keyExtractor,
    ListEmptyComponent,
    ListHeaderComponent,
    itemHeight,
    pageSize = 10,
  }: PaginatedFlatListProps<T>) => {
    const { data=[], loading=false, error=null, hasMore=false, skip=0, cachedPages = {} } = state;
    const [refreshing, setRefreshing] = useState(false);
    const isFetchingRef = useRef(false);
    const flatListRef = useRef<FlatList>(null);
    const scrollOffsetRef = useRef(0);

    
    const debouncedFetch = useDebounce(async(skipValue: number) => {
      if (!isFetchingRef.current) {
        isFetchingRef.current = true;
       await fetchData(skipValue).finally(() => {
          isFetchingRef.current = false;
        });
      }
    }, 300);

    
    useEffect(() => {
      if (!Object.keys(cachedPages).length && !loading && !isFetchingRef.current) {
        debouncedFetch(0);
      }
    }, [debouncedFetch, cachedPages, loading]);

    
    const loadMore = useCallback(() => {
      if (!loading && hasMore && !isFetchingRef.current) {
        const nextSkip = skip + pageSize;
        if (!cachedPages[nextSkip]) {
          debouncedFetch(nextSkip);
        }
      }
    }, [debouncedFetch, loading, hasMore, skip, cachedPages, pageSize]);

    const onRefresh = useCallback(async () => {
      if (!isFetchingRef.current) {
        setRefreshing(true);
        const currentOffset = scrollOffsetRef.current;
        await fetchData(0).finally(() => {
          setRefreshing(false);
          if (flatListRef.current && currentOffset > 0) {
            flatListRef.current.scrollToOffset({
              offset: currentOffset,
              animated: false,
            });
          }
        });
      }
    }, [fetchData]);


    const onScroll = useCallback(
      (event: { nativeEvent: { contentOffset: { y: number } } }) => {
        scrollOffsetRef.current = event.nativeEvent.contentOffset.y;
      },
      []
    );

   
    const getItemLayout = itemHeight
      ? (_: any, index: number) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })
      : undefined;

    
    const renderFooter = useCallback(() => {
      if (!loading || refreshing) return null;
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    }, [loading, refreshing]);

    
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      );
    }

    return (
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        initialNumToRender={pageSize}
        maxToRenderPerBatch={pageSize}
        windowSize={11}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        onScroll={onScroll}
        scrollEventThrottle={16}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 0,
        }}
      />
    );
  }
);

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    flexGrow: 1,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default PaginatedFlatList;