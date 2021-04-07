import { useQuery } from 'react-query';
import { UrlProps } from '../types';
import { fetcher } from '../API/fetcher/fetcher';
import { useAppSelector } from './reduxHooks';

const useProductsFetch = (queryURL: UrlProps, currentPage: number) => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data: productsResponse, isError: isProductsError, isFetching, refetch: productsRefetch } = useQuery(
    'products fetch',
    () =>
      fetcher('/products', 'get', { authorization: userAuthID! }, undefined, {
        price: [queryURL!.priceMin, queryURL!.priceMax],
        rate: [queryURL!.ratingMin, queryURL!.ratingMax],
        records: queryURL?.results,
        ...(queryURL?.name ? { name: queryURL.name } : null),
        ...(queryURL?.category ? { category: queryURL.category as any } : null),
        page: currentPage,
        limit: 100,
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
      cacheTime: 5000,
    },
  );
  return { productsResponse, isProductsError, isFetching, productsRefetch };
};

export default useProductsFetch;
