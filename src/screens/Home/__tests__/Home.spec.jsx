import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'fetch-mock';
import wait from 'waait';

import Home from '../Home';
import BaseLayout from '../../../layouts/BaseLayout';
import SearchBar from '../../../components/SearchBar';
import AddressList from '../../../components/AddressList';

describe('<Home />', () => {
  const getAddresses = {
    results: [
      {
        title: 'Rua Pedro Américo',
        highlightedTitle: '<b>Rua</b> Pedro <b>Américo</b>',
        vicinity: 'República<br/>Sao Paulo-SP<br/>01045-010',
        highlightedVicinity: 'República<br/>Sao Paulo-SP<br/>01045-010',
        position: [-23.542049, -46.64241],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.64241, -23.542049, -46.641731, -23.54147],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStQZWRybytBbSVDMyVBOXJpY287bGFuZz1wdDtsYXQ9LTIzLjU0MjA0OTQwNzk1ODk4NDtsb249LTQ2LjY0MjQxMDI3ODMyMDMxO3N0cmVldD1SdWErUGVkcm8rQW0lQzMlQTlyaWNvO2NpdHk9U2FvK1BhdWxvO3Bvc3RhbENvZGU9MDEwNDUtMDEwO2NvdW50cnk9QlJBO2Rpc3RyaWN0PVJlcCVDMyVCQWJsaWNhO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNjQyNDEwMjc4MzIwMzElMkMtMjMuNTQyMDQ5NDA3OTU4OTg0JTJDLTQ2LjY0MTczMTI2MjIwNzAzJTJDLTIzLjU0MTQ2OTU3Mzk3NDYxJnJhbms9MA?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStQZWRybytBbSVDMyVBOXJpY287bGFuZz1wdDtsYXQ9LTIzLjU0MjA0OTQwNzk1ODk4NDtsb249LTQ2LjY0MjQxMDI3ODMyMDMxO3N0cmVldD1SdWErUGVkcm8rQW0lQzMlQTlyaWNvO2NpdHk9U2FvK1BhdWxvO3Bvc3RhbENvZGU9MDEwNDUtMDEwO2NvdW50cnk9QlJBO2Rpc3RyaWN0PVJlcCVDMyVCQWJsaWNhO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE',
        distance: 1380,
      },
      {
        title: 'Rua Américo de Campos',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> de Campos',
        vicinity: 'Liberdade<br/>Sao Paulo-SP<br/>01506-010',
        highlightedVicinity: 'Liberdade<br/>Sao Paulo-SP<br/>01506-010',
        position: [-23.55724, -46.63652],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.63652, -23.55724, -46.634129, -23.557119],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rZGUrQ2FtcG9zO2xhbmc9cHQ7bGF0PS0yMy41NTcyMzk1MzI0NzA3MDM7bG9uPS00Ni42MzY1MjAzODU3NDIxOTtzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytkZStDYW1wb3M7Y2l0eT1TYW8rUGF1bG87cG9zdGFsQ29kZT0wMTUwNi0wMTA7Y291bnRyeT1CUkE7ZGlzdHJpY3Q9TGliZXJkYWRlO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNjM2NTIwMzg1NzQyMTklMkMtMjMuNTU3MjM5NTMyNDcwNzAzJTJDLTQ2LjYzNDEyODU3MDU1NjY0JTJDLTIzLjU1NzExOTM2OTUwNjgzNiZyYW5rPTE?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rZGUrQ2FtcG9zO2xhbmc9cHQ7bGF0PS0yMy41NTcyMzk1MzI0NzA3MDM7bG9uPS00Ni42MzY1MjAzODU3NDIxOTtzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytkZStDYW1wb3M7Y2l0eT1TYW8rUGF1bG87cG9zdGFsQ29kZT0wMTUwNi0wMTA7Y291bnRyeT1CUkE7ZGlzdHJpY3Q9TGliZXJkYWRlO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE',
        distance: 787,
      },
      {
        title: 'Rua Américo Brasiliense',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> <b>Brasiliense</b>',
        vicinity: 'Santo Amaro<br/>Sao Paulo-SP<br/>04715-003',
        highlightedVicinity: 'Santo Amaro<br/>Sao Paulo-SP<br/>04715-003',
        position: [-23.63356, -46.69832],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.701382, -23.635981, -46.694321, -23.63176],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIzLjYzMzU2O2xvbj0tNDYuNjk4MzI7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7Y2l0eT1TYW8rUGF1bG87cG9zdGFsQ29kZT0wNDcxNS0wMDM7Y291bnRyeT1CUkE7ZGlzdHJpY3Q9U2FudG8rQW1hcm87c3RhdGU9U2FvK1BhdWxvO3N0YXRlQ29kZT1TUDtjYXRlZ29yeUlkPXN0cmVldC1zcXVhcmU7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTk0MDAtMDQwMQ;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNzAxMzgxNjgzMzQ5NjElMkMtMjMuNjM1OTgwNjA2MDc5MSUyQy00Ni42OTQzMjA2Nzg3MTA5NCUyQy0yMy42MzE3NTk2NDM1NTQ2ODgmcmFuaz0y?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIzLjYzMzU2O2xvbj0tNDYuNjk4MzI7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7Y2l0eT1TYW8rUGF1bG87cG9zdGFsQ29kZT0wNDcxNS0wMDM7Y291bnRyeT1CUkE7ZGlzdHJpY3Q9U2FudG8rQW1hcm87c3RhdGU9U2FvK1BhdWxvO3N0YXRlQ29kZT1TUDtjYXRlZ29yeUlkPXN0cmVldC1zcXVhcmU7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTk0MDAtMDQwMQ',
        distance: 10389,
      },
      {
        title: 'Rua Santo Américo',
        highlightedTitle: '<b>Rua</b> Santo <b>Américo</b>',
        vicinity: 'Vila Sônia<br/>Sao Paulo-SP<br/>05629-020',
        highlightedVicinity: 'Vila Sônia<br/>Sao Paulo-SP<br/>05629-020',
        position: [-23.60409, -46.7278],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.728432, -23.60503, -46.726898, -23.602949],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStTYW50bytBbSVDMyVBOXJpY287bGFuZz1wdDtsYXQ9LTIzLjYwNDA5O2xvbj0tNDYuNzI3ODtzdHJlZXQ9UnVhK1NhbnRvK0FtJUMzJUE5cmljbztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA1NjI5LTAyMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1WaWxhK1MlQzMlQjRuaWE7c3RhdGU9U2FvK1BhdWxvO3N0YXRlQ29kZT1TUDtjYXRlZ29yeUlkPXN0cmVldC1zcXVhcmU7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTk0MDAtMDQwMQ;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNzI4NDMxNzAxNjYwMTU2JTJDLTIzLjYwNTAzMDA1OTgxNDQ1MyUyQy00Ni43MjY4OTgxOTMzNTkzNzUlMkMtMjMuNjAyOTQ5MTQyNDU2MDU1JnJhbms9Mw?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStTYW50bytBbSVDMyVBOXJpY287bGFuZz1wdDtsYXQ9LTIzLjYwNDA5O2xvbj0tNDYuNzI3ODtzdHJlZXQ9UnVhK1NhbnRvK0FtJUMzJUE5cmljbztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA1NjI5LTAyMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1WaWxhK1MlQzMlQjRuaWE7c3RhdGU9U2FvK1BhdWxvO3N0YXRlQ29kZT1TUDtjYXRlZ29yeUlkPXN0cmVldC1zcXVhcmU7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTk0MDAtMDQwMQ',
        distance: 10202,
      },
      {
        title: 'Rua Américo Ribeiro',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> Ribeiro',
        vicinity: 'Cursino<br/>Sao Paulo-SP<br/>04130-050',
        highlightedVicinity: 'Cursino<br/>Sao Paulo-SP<br/>04130-050',
        position: [-23.603701, -46.620232],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.620232, -23.604139, -46.615608, -23.603701],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rUmliZWlybztsYW5nPXB0O2xhdD0tMjMuNjAzNzAwNjM3ODE3MzgzO2xvbj0tNDYuNjIwMjMxNjI4NDE3OTc7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rUmliZWlybztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA0MTMwLTA1MDtjb3VudHJ5PUJSQTtkaXN0cmljdD1DdXJzaW5vO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNjIwMjMxNjI4NDE3OTclMkMtMjMuNjA0MTM5MzI4MDAyOTMlMkMtNDYuNjE1NjA4MjE1MzMyMDMlMkMtMjMuNjAzNzAwNjM3ODE3MzgzJnJhbms9NA?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rUmliZWlybztsYW5nPXB0O2xhdD0tMjMuNjAzNzAwNjM3ODE3MzgzO2xvbj0tNDYuNjIwMjMxNjI4NDE3OTc7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rUmliZWlybztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA0MTMwLTA1MDtjb3VudHJ5PUJSQTtkaXN0cmljdD1DdXJzaW5vO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE',
        distance: 5953,
      },
      {
        title: 'Rua Américo Samarone',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> Samarone',
        vicinity: 'Sacomã<br/>Sao Paulo-SP<br/>04284-000',
        highlightedVicinity: 'Sacomã<br/>Sao Paulo-SP<br/>04284-000',
        position: [-23.6118, -46.60383],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.604622, -23.61484, -46.600201, -23.604481],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rU2FtYXJvbmU7bGFuZz1wdDtsYXQ9LTIzLjYxMTg7bG9uPS00Ni42MDM4MztzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytTYW1hcm9uZTtjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA0Mjg0LTAwMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1TYWNvbSVDMyVBMztzdGF0ZT1TYW8rUGF1bG87c3RhdGVDb2RlPVNQO2NhdGVnb3J5SWQ9c3RyZWV0LXNxdWFyZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTQwMC0wNDAx;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNjA0NjIxODg3MjA3MDMlMkMtMjMuNjE0ODM5NTUzODMzMDA4JTJDLTQ2LjYwMDIwMDY1MzA3NjE3JTJDLTIzLjYwNDQ4MDc0MzQwODIwMyZyYW5rPTU?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rU2FtYXJvbmU7bGFuZz1wdDtsYXQ9LTIzLjYxMTg7bG9uPS00Ni42MDM4MztzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytTYW1hcm9uZTtjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA0Mjg0LTAwMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1TYWNvbSVDMyVBMztzdGF0ZT1TYW8rUGF1bG87c3RhdGVDb2RlPVNQO2NhdGVnb3J5SWQ9c3RyZWV0LXNxdWFyZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTQwMC0wNDAx',
        distance: 7538,
      },
      {
        title: 'Rua Américo Vespucci',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> Vespucci',
        vicinity: 'Vila Prudente<br/>Sao Paulo-SP<br/>03135-010',
        highlightedVicinity: 'Vila Prudente<br/>Sao Paulo-SP<br/>03135-010',
        position: [-23.57922, -46.58108],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.583809, -23.584379, -46.578369, -23.57406],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rVmVzcHVjY2k7bGFuZz1wdDtsYXQ9LTIzLjU3OTIyO2xvbj0tNDYuNTgxMDg7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rVmVzcHVjY2k7Y2l0eT1TYW8rUGF1bG87cG9zdGFsQ29kZT0wMzEzNS0wMTA7Y291bnRyeT1CUkE7ZGlzdHJpY3Q9VmlsYStQcnVkZW50ZTtzdGF0ZT1TYW8rUGF1bG87c3RhdGVDb2RlPVNQO2NhdGVnb3J5SWQ9c3RyZWV0LXNxdWFyZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTQwMC0wNDAx;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNTgzODA4ODk4OTI1NzglMkMtMjMuNTg0Mzc5MTk2MTY2OTkyJTJDLTQ2LjU3ODM2OTE0MDYyNSUyQy0yMy41NzQwNjA0NDAwNjM0NzcmcmFuaz02?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rVmVzcHVjY2k7bGFuZz1wdDtsYXQ9LTIzLjU3OTIyO2xvbj0tNDYuNTgxMDg7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rVmVzcHVjY2k7Y2l0eT1TYW8rUGF1bG87cG9zdGFsQ29kZT0wMzEzNS0wMTA7Y291bnRyeT1CUkE7ZGlzdHJpY3Q9VmlsYStQcnVkZW50ZTtzdGF0ZT1TYW8rUGF1bG87c3RhdGVDb2RlPVNQO2NhdGVnb3J5SWQ9c3RyZWV0LXNxdWFyZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTQwMC0wNDAx',
        distance: 6948,
      },
      {
        title: 'Rua Américo Alves Pereira Filho',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> Alves Pereira Filho',
        vicinity: 'Morumbi<br/>Sao Paulo-SP<br/>05688-000',
        highlightedVicinity: 'Morumbi<br/>Sao Paulo-SP<br/>05688-000',
        position: [-23.61151, -46.706],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.708382, -23.61282, -46.7034, -23.61113],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQWx2ZXMrUGVyZWlyYStGaWxobztsYW5nPXB0O2xhdD0tMjMuNjExNTE7bG9uPS00Ni43MDY7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rQWx2ZXMrUGVyZWlyYStGaWxobztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA1Njg4LTAwMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1Nb3J1bWJpO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNzA4MzgxNjUyODMyMDMlMkMtMjMuNjEyODE5NjcxNjMwODYlMkMtNDYuNzAzMzk5NjU4MjAzMTI1JTJDLTIzLjYxMTEyOTc2MDc0MjE4OCZyYW5rPTc?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQWx2ZXMrUGVyZWlyYStGaWxobztsYW5nPXB0O2xhdD0tMjMuNjExNTE7bG9uPS00Ni43MDY7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rQWx2ZXMrUGVyZWlyYStGaWxobztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA1Njg4LTAwMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1Nb3J1bWJpO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE',
        distance: 8971,
      },
      {
        title: 'Rua Ministro Américo Marco Antônio',
        highlightedTitle: '<b>Rua</b> Ministro <b>Américo</b> Marco Antônio',
        vicinity: 'Alto de Pinheiros<br/>Sao Paulo-SP<br/>05442-040',
        highlightedVicinity: 'Alto de Pinheiros<br/>Sao Paulo-SP<br/>05442-040',
        position: [-23.54726, -46.69674],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.69825, -23.548679, -46.695992, -23.54623],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStNaW5pc3RybytBbSVDMyVBOXJpY28rTWFyY28rQW50JUMzJUI0bmlvO2xhbmc9cHQ7bGF0PS0yMy41NDcyNjtsb249LTQ2LjY5Njc0O3N0cmVldD1SdWErTWluaXN0cm8rQW0lQzMlQTlyaWNvK01hcmNvK0FudCVDMyVCNG5pbztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA1NDQyLTA0MDtjb3VudHJ5PUJSQTtkaXN0cmljdD1BbHRvK2RlK1BpbmhlaXJvcztzdGF0ZT1TYW8rUGF1bG87c3RhdGVDb2RlPVNQO2NhdGVnb3J5SWQ9c3RyZWV0LXNxdWFyZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTQwMC0wNDAx;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNjk4MjQ5ODE2ODk0NTMlMkMtMjMuNTQ4Njc5MzUxODA2NjQlMkMtNDYuNjk1OTkxNTE2MTEzMjglMkMtMjMuNTQ2MjMwMzE2MTYyMTEmcmFuaz04?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStNaW5pc3RybytBbSVDMyVBOXJpY28rTWFyY28rQW50JUMzJUI0bmlvO2xhbmc9cHQ7bGF0PS0yMy41NDcyNjtsb249LTQ2LjY5Njc0O3N0cmVldD1SdWErTWluaXN0cm8rQW0lQzMlQTlyaWNvK01hcmNvK0FudCVDMyVCNG5pbztjaXR5PVNhbytQYXVsbztwb3N0YWxDb2RlPTA1NDQyLTA0MDtjb3VudHJ5PUJSQTtkaXN0cmljdD1BbHRvK2RlK1BpbmhlaXJvcztzdGF0ZT1TYW8rUGF1bG87c3RhdGVDb2RlPVNQO2NhdGVnb3J5SWQ9c3RyZWV0LXNxdWFyZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw7cGRzQ2F0ZWdvcnlJZD05MDAtOTQwMC0wNDAx',
        distance: 5483,
      },
      {
        title: 'Rua Américo Brasiliense',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> <b>Brasiliense</b>',
        vicinity: 'Centro<br/>São Bernardo do Campo-SP<br/>09715-020',
        highlightedVicinity: 'Centro<br/>São Bernardo do Campo-SP<br/>09715-020',
        position: [-23.71304, -46.54996],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.552841, -23.71323, -46.548229, -23.712749],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIzLjcxMzA0O2xvbj0tNDYuNTQ5OTY7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7Y2l0eT1TJUMzJUEzbytCZXJuYXJkbytkbytDYW1wbztwb3N0YWxDb2RlPTA5NzE1LTAyMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1DZW50cm87c3RhdGU9U2FvK1BhdWxvO3N0YXRlQ29kZT1TUDtjYXRlZ29yeUlkPXN0cmVldC1zcXVhcmU7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTk0MDAtMDQwMQ;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNTUyODQxMTg2NTIzNDQlMkMtMjMuNzEzMjMwMTMzMDU2NjQlMkMtNDYuNTQ4MjI5MjE3NTI5MyUyQy0yMy43MTI3NDk0ODEyMDExNzImcmFuaz05?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIzLjcxMzA0O2xvbj0tNDYuNTQ5OTY7c3RyZWV0PVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7Y2l0eT1TJUMzJUEzbytCZXJuYXJkbytkbytDYW1wbztwb3N0YWxDb2RlPTA5NzE1LTAyMDtjb3VudHJ5PUJSQTtkaXN0cmljdD1DZW50cm87c3RhdGU9U2FvK1BhdWxvO3N0YXRlQ29kZT1TUDtjYXRlZ29yeUlkPXN0cmVldC1zcXVhcmU7c291cmNlU3lzdGVtPWludGVybmFsO3Bkc0NhdGVnb3J5SWQ9OTAwLTk0MDAtMDQwMQ',
        distance: 19995,
      },
      {
        title: 'Rua Américo Brasiliense',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> <b>Brasiliense</b>',
        vicinity: 'Santa Paula<br/>São Caetano do Sul-SP<br/>09520-030',
        highlightedVicinity: 'Santa Paula<br/>São Caetano do Sul-SP<br/>09520-030',
        position: [-23.61524, -46.5656],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-46.565601, -23.61644, -46.565578, -23.61404],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIzLjYxNTI0O2xvbj0tNDYuNTY1NjtzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytCcmFzaWxpZW5zZTtjaXR5PVMlQzMlQTNvK0NhZXRhbm8rZG8rU3VsO3Bvc3RhbENvZGU9MDk1MjAtMDMwO2NvdW50cnk9QlJBO2Rpc3RyaWN0PVNhbnRhK1BhdWxhO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDYuNTY1NjAxMzQ4ODc2OTUlMkMtMjMuNjE2NDM5ODE5MzM1OTM4JTJDLTQ2LjU2NTU3ODQ2MDY5MzM2JTJDLTIzLjYxNDA0MDM3NDc1NTg2JnJhbms9MTA?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIzLjYxNTI0O2xvbj0tNDYuNTY1NjtzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytCcmFzaWxpZW5zZTtjaXR5PVMlQzMlQTNvK0NhZXRhbm8rZG8rU3VsO3Bvc3RhbENvZGU9MDk1MjAtMDMwO2NvdW50cnk9QlJBO2Rpc3RyaWN0PVNhbnRhK1BhdWxhO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE',
        distance: 10427,
      },
      {
        title: 'Brasiliense',
        highlightedTitle: '<b>Brasiliense</b>',
        vicinity: 'Rua Américo Brasiliense, 1815<br/>Santo Amaro<br/>São Paulo-SP<br/>04715-004',
        highlightedVicinity:
          '<b>Rua</b> <b>Américo</b> <b>Brasiliense</b>, 1815<br/>Santo Amaro<br/>São Paulo-SP<br/>04715-004',
        position: [-23.63036, -46.7039],
        category: 'restaurant',
        categoryTitle: 'Restaurant',
        href:
          'https://places.ls.hereapi.com/places/v1/places/076xjxn4-b38182e12655036f60d13df6ad04da39;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmcmFuaz0xMQ?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'place',
        id: '076xjxn4-b38182e12655036f60d13df6ad04da39',
        distance: 10418,
      },
      {
        title: 'Rua Américo Brasiliense',
        highlightedTitle: '<b>Rua</b> <b>Américo</b> <b>Brasiliense</b>',
        vicinity: 'Cambuí<br/>Campinas-SP<br/>13025-230',
        highlightedVicinity: 'Cambuí<br/>Campinas-SP<br/>13025-230',
        position: [-22.89681, -47.0501],
        category: 'street-square',
        categoryTitle: 'Street or Square',
        bbox: [-47.052898, -22.89761, -47.047291, -22.89607],
        href:
          'https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIyLjg5NjgxO2xvbj0tNDcuMDUwMTtzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytCcmFzaWxpZW5zZTtjaXR5PUNhbXBpbmFzO3Bvc3RhbENvZGU9MTMwMjUtMjMwO2NvdW50cnk9QlJBO2Rpc3RyaWN0PUNhbWJ1JUMzJUFEO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmYmJveD0tNDcuMDUyODk4NDA2OTgyNDIlMkMtMjIuODk3NjA5NzEwNjkzMzYlMkMtNDcuMDQ3MjkwODAyMDAxOTUlMkMtMjIuODk2MDcwNDgwMzQ2NjgmcmFuaz0xMg?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'address',
        id:
          'loc-dmVyc2lvbj0xO3RpdGxlPVJ1YStBbSVDMyVBOXJpY28rQnJhc2lsaWVuc2U7bGFuZz1wdDtsYXQ9LTIyLjg5NjgxO2xvbj0tNDcuMDUwMTtzdHJlZXQ9UnVhK0FtJUMzJUE5cmljbytCcmFzaWxpZW5zZTtjaXR5PUNhbXBpbmFzO3Bvc3RhbENvZGU9MTMwMjUtMjMwO2NvdW50cnk9QlJBO2Rpc3RyaWN0PUNhbWJ1JUMzJUFEO3N0YXRlPVNhbytQYXVsbztzdGF0ZUNvZGU9U1A7Y2F0ZWdvcnlJZD1zdHJlZXQtc3F1YXJlO3NvdXJjZVN5c3RlbT1pbnRlcm5hbDtwZHNDYXRlZ29yeUlkPTkwMC05NDAwLTA0MDE',
        distance: 83878,
      },
      {
        title: 'R. Américo Brasiliense, 1672',
        highlightedTitle: 'R. <b>Américo</b> <b>Brasiliense,</b> 1672',
        vicinity: 'Rua Américo Brasiliense, 1664<br/>Santo Amaro<br/>São Paulo-SP<br/>04715-005',
        highlightedVicinity:
          'Rua Américo Brasiliense, 1664<br/>Santo Amaro<br/>São Paulo-SP<br/>04715-005',
        position: [-23.63091, -46.70254],
        category: 'public-transport',
        categoryTitle: 'Public Transit',
        href:
          'https://places.ls.hereapi.com/places/v1/places/076q9wpy-5e8d34326fae0f02e9c1b14c3b3f3769;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmcmFuaz0xMw?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'place',
        id: '076q9wpy-5e8d34326fae0f02e9c1b14c3b3f3769',
        distance: 10386,
      },
      {
        title: 'Bar E Restaurante Brasiliense',
        highlightedTitle: 'Bar E Restaurante <b>Brasiliense</b>',
        vicinity: 'Rua Américo Brasiliense, 2018<br/>Santo Amaro<br/>São Paulo-SP<br/>04715-005',
        highlightedVicinity:
          '<b>Rua</b> <b>Américo</b> <b>Brasiliense</b>, 2018<br/>Santo Amaro<br/>São Paulo-SP<br/>04715-005',
        position: [-23.62914, -46.70551],
        category: 'restaurant',
        categoryTitle: 'Restaurant',
        href:
          'https://places.ls.hereapi.com/places/v1/places/076aabd1-d2be9184708203f106aae388a724158b;context=Zmxvdy1pZD1lMGYyZGQ4NC1hOWM4LTViYWUtOWE0ZC03NmYxYjYxMTU2YjJfMTU4MDUxMzQxNzI2NF82MTQ3XzIzNjAmcmFuaz0xNA?app_id=AHOINEBL9xEcwJrmXYfN&app_code=E9v4vSZatK65k2kykuR0SQ',
        type: 'urn:nlp-types:place',
        resultType: 'place',
        id: '076aabd1-d2be9184708203f106aae388a724158b',
        distance: 10408,
      },
    ],
  };

  afterEach(fetchMock.reset);

  it('does render properly', () => {
    shallow(<Home />);
  });

  it('matches stored snapshot', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Home />
      </MemoryRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('containes BaseLayout component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(wrapper.contains(BaseLayout)).toBe(true);
  });

  it('containes SearchBar component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(wrapper.contains(SearchBar)).toBe(true);
  });

  it('containes AddressList component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(wrapper.contains(AddressList)).toBe(true);
  });

  it('has a loading state', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    fetchMock.mock(
      {
        url: 'https://places.ls.hereapi.com/places/v1/autosuggest',
        query: {
          apiKey: '6_ZHx-iYqM1ZmBT3IYc8igRwr8xRB4Yn3hz5rMWxNvk',
          at: '51.1,45.3',
          q: 'Rua Américo Brasiliense',
        },
        method: 'GET',
      },
      {
        status: 200,
        body: getAddresses,
      },
      {
        delay: 600,
      },
    );

    wrapper.find('input').simulate('change', { target: { value: 'Rua Américo Brasiliense' } });

    // Wait for the debounce to trigger
    await act(async () => {
      await wait(300);
    });

    wrapper.update();
    expect(wrapper.find(SearchBar).prop('loading')).toBe(true);
  });

  it('has false loading state after request if fullfiled', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    fetchMock.mock(
      {
        url: 'https://places.ls.hereapi.com/places/v1/autosuggest',
        query: {
          apiKey: '6_ZHx-iYqM1ZmBT3IYc8igRwr8xRB4Yn3hz5rMWxNvk',
          at: '51.1,45.3',
          q: 'Rua Américo Brasiliense',
        },
        method: 'GET',
      },
      {
        status: 200,
        body: getAddresses,
      },
    );

    wrapper.find('input').simulate('change', { target: { value: 'Rua Américo Brasiliense' } });

    // Wait for the debounce to trigger
    await act(async () => {
      await wait(300);
    });

    wrapper.update();
    expect(wrapper.find(SearchBar).prop('loading')).toBe(false);
  });
});
