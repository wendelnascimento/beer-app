import React, { useState, useEffect } from 'react';

import BaseLayout from '../../layouts/BaseLayout';
import SearchBar from '../../components/SearchBar';
import AddressList from '../../components/AddressList';
import useDebounce from '../../hooks/useDebounce';

import { Wrapper, Subtitle, SearchBarContainer } from './styles';

const Home = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const debouncedSearchAddress = useDebounce(searchAddress, 300);

  const handleResponse = async (response) => {
    const json = await response.json();
    setAddresses(json.results);
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    if (debouncedSearchAddress) {
      const fetchAddress = async () => {
        setLoading(true);

        /* Here we try to get user position to send and get the nearest location,
           otherwise we use Brazil bounding box
        */
        await navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://places.ls.hereapi.com/places/v1/autosuggest?apiKey=6_ZHx-iYqM1ZmBT3IYc8igRwr8xRB4Yn3hz5rMWxNvk&at=${position.coords.latitude},${position.coords.longitude}&q=${debouncedSearchAddress}`,
              );
              if (!response.ok) {
                throw Error();
              }
              await handleResponse(response);
            } catch (err) {
              handleError();
            }
          },
          async () => {
            try {
              const response = await fetch(
                `https://places.ls.hereapi.com/places/v1/autosuggest?apiKey=6_ZHx-iYqM1ZmBT3IYc8igRwr8xRB4Yn3hz5rMWxNvk&in=-73.9872354804,-33.7683777809,-34.7299934555,5.24448639569&q=${debouncedSearchAddress}`,
              );
              if (!response.ok) {
                throw Error();
              }
              await handleResponse(response);
            } catch (err) {
              handleError();
            }
          },
        );
      };
      fetchAddress();
    } else {
      setAddresses([]);
    }
  }, [debouncedSearchAddress]);

  const handleChange = (event) => {
    setSearchAddress(event.currentTarget.value);
    setError(false);
  };

  return (
    <BaseLayout>
      <Wrapper>
        <Subtitle>Digite seu endereço abaixo para ver as melhores cervejas em sua região</Subtitle>
        <SearchBarContainer>
          <SearchBar
            onChange={handleChange}
            value={searchAddress}
            loading={loading}
            error={error}
          />
          <AddressList addresses={addresses} />
        </SearchBarContainer>
      </Wrapper>
    </BaseLayout>
  );
};

export default Home;
