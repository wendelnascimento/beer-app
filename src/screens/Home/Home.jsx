import React, { useState, useEffect } from 'react';

import SearchBar from '../../components/SearchBar';
import useDebounce from '../../hooks/useDebounce';

import { Wrapper, Title, Subtitle } from './styles';

const Home = () => {
  const [searchAddress, setSearchAddress] = useState('');

  const debouncedSearchAddress = useDebounce(searchAddress, 300);

  const handleResponse = async (response) => {
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    if (debouncedSearchAddress) {
      const fetchAddress = async () => {
        /* Here we try to get user position to send and get the nearest location,
           otherwise we use Brazil bounding box
        */
        await navigator.geolocation.getCurrentPosition(
          async (position) => {
            const response = await fetch(
              `https://places.ls.hereapi.com/places/v1/autosuggest?apiKey=6_ZHx-iYqM1ZmBT3IYc8igRwr8xRB4Yn3hz5rMWxNvk&at=${position.coords.latitude},${position.coords.longitude}&q=${debouncedSearchAddress}`,
            );
            await handleResponse(response);
          },
          async () => {
            const response = await fetch(
              `https://places.ls.hereapi.com/places/v1/autosuggest?apiKey=6_ZHx-iYqM1ZmBT3IYc8igRwr8xRB4Yn3hz5rMWxNvk&in=-73.9872354804,-33.7683777809,-34.7299934555,5.24448639569&q=${debouncedSearchAddress}`,
            );
            await handleResponse(response);
          },
        );
      };
      fetchAddress();
    }
  }, [debouncedSearchAddress]);

  const handleChange = (event) => setSearchAddress(event.currentTarget.value);

  return (
    <Wrapper>
      <Title>Beer App</Title>
      <Subtitle>Digite seu endereço abaixo para ver as melhores cervejas em sua região</Subtitle>
      <SearchBar onChange={handleChange} value={searchAddress} />
    </Wrapper>
  );
};

export default Home;
