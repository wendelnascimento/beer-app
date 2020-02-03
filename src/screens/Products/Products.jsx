import React, {
  useMemo, useRef, useEffect, useState,
} from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import client from '../../apollo/apolloClient';

import useDebounce from '../../hooks/useDebounce';

import BaseLayout from '../../layouts/BaseLayout';
import ProductsList from '../../components/ProductsList';
import CategoriesList from '../../components/CategoriesList';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';

import { GET_POC_QUERY, GET_PRODUCTS_QUERY, GET_CATEGORIES_QUERY } from './queries';

import {
  Wrapper, Title, SearchContainer, CustomLink,
} from './styles';

const Products = () => {
  const [category, setCategory] = useState();
  const [search, setSearch] = useState('');

  const location = useLocation();

  const params = useMemo(() => queryString.parse(location.search), [location.search]);
  const date = useRef(new Date().toISOString());

  const debouncedSearch = useDebounce(search, 300);

  const { data = {}, loading, error } = useQuery(GET_POC_QUERY, {
    client,
    variables: {
      algorithm: 'NEAREST',
      now: date.current,
      lat: params.lat,
      long: params.long,
    },
  });

  const [
    getProducts,
    { data: productsData, loading: productsLoading, error: productsError },
  ] = useLazyQuery(GET_PRODUCTS_QUERY, {
    client,
  });

  const [
    getCategories,
    { data: categoriesData, loading: categoriesLoading, error: categoriesError },
  ] = useLazyQuery(GET_CATEGORIES_QUERY, {
    client,
  });

  useEffect(() => {
    if (data && data.pocSearch && data.pocSearch.length > 0) {
      getProducts({
        variables: {
          id: data.pocSearch[0].id,
          categoryId: category,
          search,
        },
      });
      getCategories();
    }
  }, [data]);

  useEffect(() => {
    if (productsData) {
      getProducts({
        variables: {
          id: data.pocSearch[0].id,
          categoryId: category,
          search: debouncedSearch,
        },
      });
    }
  }, [debouncedSearch]);

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    getProducts({
      variables: {
        id: data.pocSearch[0].id,
        categoryId,
        search,
      },
    });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const isLoading = loading || productsLoading || categoriesLoading;
  const hasError = error || productsError || categoriesError;

  return (
    <BaseLayout>
      {isLoading && <Loading />}
      <Wrapper>
        <SearchContainer>
          <h4>
            Entregar em:
            {' '}
            {params.address}
            {' - '}
            <CustomLink to="/">Alterar endereço</CustomLink>
          </h4>
          <SearchBar
            placeholder="Digite o nome do produto que deseja buscar"
            onChange={handleSearchChange}
            value={search}
          />
        </SearchContainer>
        {categoriesData && (
          <CategoriesList categories={categoriesData.allCategory} onSelect={handleCategoryChange} />
        )}
        <Title>Confira os produtos disponíveis</Title>
        {hasError && (
          <h2>Ocorreu um um erro ao encontrar os produtos selecionados, tente novamente.</h2>
        )}
        {productsData && <ProductsList products={productsData.poc.products} />}
      </Wrapper>
    </BaseLayout>
  );
};

export default Products;
