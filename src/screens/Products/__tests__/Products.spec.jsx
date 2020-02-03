import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';

import Products from '../Products';
import Loading from '../../../components/Loading';
import ProductsList from '../../../components/ProductsList';

import { CustomLink } from '../styles';

import { GET_POC_QUERY, GET_CATEGORIES_QUERY, GET_PRODUCTS_QUERY } from '../queries';

describe('Products', () => {
  const updateWrapper = async (wrapper, time = 0) => {
    await act(async () => {
      await new Promise((res) => setTimeout(res, time));
      await wrapper.update();
    });
  };

  const getPOCMock = {
    request: {
      query: GET_POC_QUERY,
      variables: {
        algorithm: 'NEAREST',
        now: '1970-01-01T00:00:00.000Z',
        lat: '-23.63356',
        long: '-46.69832',
      },
    },
    result: {
      data: {
        pocSearch: [
          {
            __typename: 'POC',
            id: '532',
            status: 'AVAILABLE',
            tradingName: 'Distribuidor de Treinamento',
            officialName: 'Distribuidor de Treinamento',
            deliveryTypes: [
              {
                __typename: 'POCDeliveryType',
                pocDeliveryTypeId: '1284',
                deliveryTypeId: '16',
                price: 0,
                title: 'RECEBER',
                subtitle: 'em até uma hora',
                active: true,
              },
              {
                __typename: 'POCDeliveryType',
                pocDeliveryTypeId: '1286',
                deliveryTypeId: '17',
                price: 0,
                title: 'RETIRAR',
                subtitle: 'no parceiro',
                active: true,
              },
              {
                __typename: 'POCDeliveryType',
                pocDeliveryTypeId: '1285',
                deliveryTypeId: '18',
                price: 0,
                title: 'AGENDAR',
                subtitle: 'entregamos em outro dia',
                active: true,
              },
            ],
            paymentMethods: [
              {
                __typename: 'POCPaymentMethod',
                pocPaymentMethodId: '1292',
                paymentMethodId: '46',
                active: true,
                title: 'Crédito (Visa/Mastercard)',
                subtitle: 'Cartão de Crédito Visa/Master',
              },
              {
                __typename: 'POCPaymentMethod',
                pocPaymentMethodId: '1291',
                paymentMethodId: '47',
                active: true,
                title: 'Débito (Visa/Mastercard)',
                subtitle: 'Cartão de Débito Visa Electron/Maestro',
              },
              {
                __typename: 'POCPaymentMethod',
                pocPaymentMethodId: '1290',
                paymentMethodId: '48',
                active: true,
                title: 'Dinheiro',
                subtitle: 'Vou pagar com dinheiro',
              },
            ],
            pocWorkDay: [
              {
                __typename: 'POCWorkDay',
                weekDay: 1,
                active: true,
                workingInterval: [
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '09:10:00',
                    closingTime: '23:59:00',
                  },
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '00:00:00',
                    closingTime: '02:00:00',
                  },
                ],
              },
              {
                __typename: 'POCWorkDay',
                weekDay: 3,
                active: true,
                workingInterval: [
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '09:30:00',
                    closingTime: '23:59:00',
                  },
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '00:00:00',
                    closingTime: '02:00:00',
                  },
                ],
              },
              {
                __typename: 'POCWorkDay',
                weekDay: 6,
                active: true,
                workingInterval: [
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '09:55:00',
                    closingTime: '23:59:00',
                  },
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '00:00:00',
                    closingTime: '04:00:00',
                  },
                ],
              },
              {
                __typename: 'POCWorkDay',
                weekDay: 0,
                active: true,
                workingInterval: [
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '09:00:00',
                    closingTime: '23:59:00',
                  },
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '00:00:00',
                    closingTime: '04:00:00',
                  },
                ],
              },
              {
                __typename: 'POCWorkDay',
                weekDay: 2,
                active: true,
                workingInterval: [
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '00:00:00',
                    closingTime: '02:00:00',
                  },
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '09:20:00',
                    closingTime: '23:59:00',
                  },
                ],
              },
              {
                __typename: 'POCWorkDay',
                weekDay: 4,
                active: true,
                workingInterval: [
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '00:00:00',
                    closingTime: '02:00:00',
                  },
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '09:40:00',
                    closingTime: '23:59:00',
                  },
                ],
              },
              {
                __typename: 'POCWorkDay',
                weekDay: 5,
                active: true,
                workingInterval: [
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '00:00:00',
                    closingTime: '02:00:00',
                  },
                  {
                    __typename: 'POCWorkingInterval',
                    openingTime: '09:50:00',
                    closingTime: '23:59:00',
                  },
                ],
              },
            ],
            address: {
              __typename: 'POCAddress',
              address1: 'Rua Américo Brasiliense',
              address2: null,
              number: '1781',
              city: 'São Paulo',
              province: 'SP',
              zip: '01457005',
              coordinates: '{"type": "Point", "coordinates": [-46.703635899999995, -23.6305321]}',
            },
            phone: {
              __typename: 'POCPhone',
              phoneNumber: '1143272169',
            },
          },
        ],
      },
    },
  };

  const getCategoriesMock = {
    request: {
      query: GET_CATEGORIES_QUERY,
    },
    result: {
      data: {
        allCategory: [
          {
            title: 'Cervejas',
            id: '94',
            __typename: 'Category',
          },
          {
            title: 'Destilados',
            id: '95',
            __typename: 'Category',
          },
          {
            title: 'Vinhos',
            id: '92',
            __typename: 'Category',
          },
          {
            title: 'Sem álcool',
            id: '96',
            __typename: 'Category',
          },
          {
            title: 'Petiscos',
            id: '97',
            __typename: 'Category',
          },
          {
            title: 'Outros',
            id: '98',
            __typename: 'Category',
          },
        ],
      },
    },
  };

  const getProductsMock = {
    request: {
      query: GET_PRODUCTS_QUERY,
      variables: {
        id: '532',
        search: '',
      },
    },
    result: {
      data: {
        poc: {
          id: '532',
          products: [
            {
              id: '8868',
              title: 'Skol 269ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8868_205f958d-2e51-48a3-b4d5-a2998765571a.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8502',
                  price: 2.09,
                  inventoryItemId: '80149',
                  shortDescription: null,
                  title: 'Skol 269ml - Unidade',
                  published: null,
                  volume: '0,00269',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8869',
              title: 'Skol 269ml - Pack com 15 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/products/8503.png',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8503',
                  price: 31.35,
                  inventoryItemId: '80151',
                  shortDescription: null,
                  title: 'Skol 269ml - Pack com 15 Unidades',
                  published: null,
                  volume: '0,04035',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8877',
              title: 'Brahma 269ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8511',
                  price: 1.99,
                  inventoryItemId: '80139',
                  shortDescription: null,
                  title: 'Brahma 269ml - Unidade',
                  published: null,
                  volume: '0,00269',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8878',
              title: 'Brahma 269ml - Pack com 15 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008878_03ce3fab-0a5c-4e83-ac4a-8371370e92c5.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8512',
                  price: 29.85,
                  inventoryItemId: '80140',
                  shortDescription: null,
                  title: 'Brahma 269ml - Pack com 15 Unidades',
                  published: null,
                  volume: '0,04035',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8880',
              title: 'Brahma 350ml - Pack com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8880_47d948bc-eaa5-44b2-a443-d9bbb07bc43e.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8514',
                  price: 27.48,
                  inventoryItemId: '80143',
                  shortDescription: null,
                  title: 'Brahma 350ml - Pack com 12 Unidades',
                  published: null,
                  volume: '0,042',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8946',
              title: 'Budweiser 350ml - Caixa com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008946_df1f1e8c-3207-48fe-9d75-6894b11030c3.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8580',
                  price: 44.28,
                  inventoryItemId: '80159',
                  shortDescription: null,
                  title: 'Budweiser 350ml - Caixa com 12 Unidades',
                  published: null,
                  volume: '0,042',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8945',
              title: 'Budweiser 350ml  - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008945_0c8915c4-f78e-4c00-927d-6cd045dd1203.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8579',
                  price: 3.69,
                  inventoryItemId: '80158',
                  shortDescription: null,
                  title: 'Budweiser 350ml  - Unidade',
                  published: null,
                  volume: '0,0035',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8948',
              title: 'Stella Artois 275ml - Pack com 6 unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008948_c04c82d7-6c1d-4f59-9e12-a33b5fecee47.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8582',
                  price: 22.74,
                  inventoryItemId: '80331',
                  shortDescription: null,
                  title: 'Stella Artois 275ml - Pack com 6 unidades',
                  published: null,
                  volume: '0,0165',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8947',
              title: 'Stella Artois 275ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008947_7e57513b-d574-4e91-919c-446c7b1c84fb.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8581',
                  price: 3.79,
                  inventoryItemId: '80162',
                  shortDescription: null,
                  title: 'Stella Artois 275ml - Unidade',
                  published: null,
                  volume: '0,00275',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8942',
              title: 'Budweiser 343ml - Pack com 6 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008942_0078bead-7ee6-44ea-b875-a758010383e4.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8576',
                  price: 17.94,
                  inventoryItemId: '80161',
                  shortDescription: null,
                  title: 'Budweiser 343ml - Pack com 6 Unidades',
                  published: null,
                  volume: '0,02058',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8941',
              title: 'Budweiser 343ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008941_0829bcb0-0596-453a-b6bc-b55fc89a4280.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8575',
                  price: 2.99,
                  inventoryItemId: '80160',
                  shortDescription: null,
                  title: 'Budweiser 343ml - Unidade',
                  published: null,
                  volume: '0,00343',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8954',
              title: 'Corona Extra 355ml - Pack com 6 unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008954_642d8655-a9e5-423d-bcd3-eb4fddd0a6e7.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8588',
                  price: 35.94,
                  inventoryItemId: '80165',
                  shortDescription: null,
                  title: 'Corona Extra 355ml - Pack com 6 unidades',
                  published: null,
                  volume: '0,0213',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8953',
              title: 'Corona Extra 355ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008953_4dbfb5ac-3c8b-4a1d-ad5c-c3ab66c98554.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8587',
                  price: 5.99,
                  inventoryItemId: '80164',
                  shortDescription: null,
                  title: 'Corona Extra 355ml - Unidade',
                  published: null,
                  volume: '0,00355',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8907',
              title: 'Antarctica Original 300ml - Caixa com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008907_f085f483-5ab6-4ca4-96b2-f73f23644596.jpg',
                  __typename: 'ProductImage',
                },
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008907_f085f483-5ab6-4ca4-96b2-f73f23644596.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8541',
                  price: 35.88,
                  inventoryItemId: '80176',
                  shortDescription: null,
                  title: 'Antarctica Original 300ml - Caixa com 12 Unidades',
                  published: null,
                  volume: '0,036',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9250',
              title: 'Guaraná Antarctica 2L - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009250_e61f334b-b120-4985-b4d9-083c2c4ad15b.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8884',
                  price: 6.99,
                  inventoryItemId: '80332',
                  shortDescription: null,
                  title: 'Guaraná Antarctica 2L - Unidade',
                  published: null,
                  volume: '0,02',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8879',
              title: 'Brahma 350ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8879_57e93ce2-f7d3-4544-a838-68095a04281c.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8513',
                  price: 2.29,
                  inventoryItemId: '80142',
                  shortDescription: null,
                  title: 'Brahma 350ml - Unidade',
                  published: null,
                  volume: '0,0035',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8870',
              title: 'Skol 350ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8870_543a3afb-3076-4471-a13d-c7b107deb881.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8504',
                  price: 15,
                  inventoryItemId: '80155',
                  shortDescription: null,
                  title: 'Skol 350ml - Unidade',
                  published: null,
                  volume: '0,0035',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8906',
              title: 'Antarctica Original 300ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008906_4db198be-3022-434c-accf-0a1f32708860.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8540',
                  price: 2.99,
                  inventoryItemId: '80177',
                  shortDescription: null,
                  title: 'Antarctica Original 300ml - Unidade',
                  published: null,
                  volume: '0,003',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8909',
              title: 'Serramalte 300ml - Caixa com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008909_12d5ab07-2b00-4047-970b-04e6423332e7.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8543',
                  price: 37.68,
                  inventoryItemId: '80174',
                  shortDescription: null,
                  title: 'Serramalte 300ml - Caixa com 12 Unidades',
                  published: null,
                  volume: '0,036',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8908',
              title: 'Serramalte 300ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008908_7884ccb2-f07c-40f7-afdf-50ba9b3cd06f.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8542',
                  price: 3.14,
                  inventoryItemId: '80175',
                  shortDescription: null,
                  title: 'Serramalte 300ml - Unidade',
                  published: null,
                  volume: '0,003',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8966',
              title: 'Skol Beats Senses 269ml - Pack com 8 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008966_27938e9b-945d-46a6-b72f-df7e724ac280.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8600',
                  price: 36.8,
                  inventoryItemId: '80154',
                  shortDescription: null,
                  title: 'Skol Beats Senses 269ml - Pack com 8 Unidades',
                  published: null,
                  volume: '0,02152',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8965',
              title: 'Skol Beats Senses 269ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008965_e6db7d9c-be12-46fe-a962-27a4e318405b.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8599',
                  price: 4.6,
                  inventoryItemId: '80156',
                  shortDescription: null,
                  title: 'Skol Beats Senses 269ml - Unidade',
                  published: null,
                  volume: '0,00269',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9071',
              title: 'Norteña 960ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009071_059728c8-3a65-4c45-9fe1-087016d10d0e.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8705',
                  price: 15.99,
                  inventoryItemId: '80166',
                  shortDescription: null,
                  title: 'Norteña 960ml - Unidade',
                  published: null,
                  volume: '0,0096',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9200',
              title: 'Brahma Zero 350ml - Caixa com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009200_e1dfc4bf-3301-4fa1-a9d0-bc991c3c7cd2.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8834',
                  price: 36,
                  inventoryItemId: '80147',
                  shortDescription: null,
                  title: 'Brahma Zero 350ml - Caixa com 12 Unidades',
                  published: null,
                  volume: '0,042',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9199',
              title: 'Brahma Zero 350ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009199_7630efb7-4025-448d-ad4b-5b1569d82562.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8833',
                  price: 3,
                  inventoryItemId: '80146',
                  shortDescription: null,
                  title: 'Brahma Zero 350ml - Unidade',
                  published: null,
                  volume: '0,0035',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9256',
              title: 'Guaraná Antarctica Zero 2L - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009256_bf628721-1eab-4ee4-95dc-7969cc965005.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8890',
                  price: 6.99,
                  inventoryItemId: '80182',
                  shortDescription: null,
                  title: 'Guaraná Antarctica Zero 2L - Unidade',
                  published: null,
                  volume: '0,02',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9213',
              title: 'Guaraná 350ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009213_a853c411-ec4b-476f-96e0-ee7b88870559.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8847',
                  price: 2.49,
                  inventoryItemId: '80183',
                  shortDescription: null,
                  title: 'Guaraná 350ml - Unidade',
                  published: null,
                  volume: '0,0035',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9072',
              title: 'Quilmes 970ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009072_c46cdca8-e8c0-471a-8f9c-0a426c3be111.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8706',
                  price: 15.99,
                  inventoryItemId: '80167',
                  shortDescription: null,
                  title: 'Quilmes 970ml - Unidade',
                  published: null,
                  volume: '0,0097',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8961',
              title: 'Skol Beats Secret 269ml - unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008961_775f8cf6-caa8-4d71-bec8-2f546cc67ad4.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8595',
                  price: 4.6,
                  inventoryItemId: '80150',
                  shortDescription: null,
                  title: 'Skol Beats Secret 269ml - unidade',
                  published: null,
                  volume: '0,00269',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8962',
              title: 'Skol Beats Secret 269ml - Caixa com 8 unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008962_943a1e7f-0038-40eb-b689-9c536610872e.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8596',
                  price: 36.8,
                  inventoryItemId: '80157',
                  shortDescription: null,
                  title: 'Skol Beats Secret 269ml - Caixa com 8 unidades',
                  published: null,
                  volume: '0,02152',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9214',
              title: 'Guaraná 350ml - Pack com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009214_9e6b60c7-b7f2-47d0-aecd-bb702a9a07b0.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8848',
                  price: 29.88,
                  inventoryItemId: '80185',
                  shortDescription: null,
                  title: 'Guaraná 350ml - Pack com 12 Unidades',
                  published: null,
                  volume: '0,042',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9060',
              title: 'Hoegaarden 300ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009060_21945bef-9c45-426a-bd75-82c2445a6ee3.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8694',
                  price: 8.2,
                  inventoryItemId: '80179',
                  shortDescription: null,
                  title: 'Hoegaarden 300ml - Unidade',
                  published: null,
                  volume: '0,0033',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9325',
              title: 'H2OH Limão 500ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009325_b930d64f-3a8f-4bdb-9cd8-2ef06aa830a2.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8959',
                  price: 3.19,
                  inventoryItemId: '80310',
                  shortDescription: null,
                  title: 'H2OH Limão 500ml - Unidade',
                  published: null,
                  volume: '0,005',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8981',
              title: 'Brahma Malzbier 350ml - Caixa com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008981_e905fb39-9d3e-437b-b6ab-25d636d283e8.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8615',
                  price: 44.28,
                  inventoryItemId: '80145',
                  shortDescription: null,
                  title: 'Brahma Malzbier 350ml - Caixa com 12 Unidades',
                  published: null,
                  volume: '0,0426',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8980',
              title: 'Brahma Malzbier 350ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008980_71565771-37f1-4f8f-b46b-1ec8b91ebd4a.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8614',
                  price: 3.69,
                  inventoryItemId: '80144',
                  shortDescription: null,
                  title: 'Brahma Malzbier 350ml - Unidade',
                  published: null,
                  volume: '0,0035',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9232',
              title: 'Guaraná Zero 350ml - Pack com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009232_fd73f2c1-8398-4f66-bea7-22fa6927d7da.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8866',
                  price: 29.88,
                  inventoryItemId: '80181',
                  shortDescription: null,
                  title: 'Guaraná Zero 350ml - Pack com 12 Unidades',
                  published: null,
                  volume: '0,042',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9231',
              title: 'Guaraná Zero 350ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009231_4f387d0e-7cab-423c-8e73-de6d45f54c8b.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8865',
                  price: 2.49,
                  inventoryItemId: '80180',
                  shortDescription: null,
                  title: 'Guaraná Zero 350ml - Unidade',
                  published: null,
                  volume: '0,0035',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8970',
              title: 'Skol Beats Spirit 269ml - Pack com 8 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008970_d44e8bd4-e089-4687-adc6-11cdb89e5306.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8604',
                  price: 36.8,
                  inventoryItemId: '80153',
                  shortDescription: null,
                  title: 'Skol Beats Spirit 269ml - Pack com 8 Unidades',
                  published: null,
                  volume: '0,02152',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8969',
              title: 'Skol Beats Spirit 269ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008969_70427375-d82b-47dc-89ce-8c3ff5f837b4.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8603',
                  price: 4.6,
                  inventoryItemId: '80152',
                  shortDescription: null,
                  title: 'Skol Beats Spirit 269ml - Unidade',
                  published: null,
                  volume: '0,00269',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9056',
              title: 'Leffe Blonde 330ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009056_0f1edb1e-b2ee-48af-a4fa-145ca1bd61e0.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8690',
                  price: 14.9,
                  inventoryItemId: '80335',
                  shortDescription: null,
                  title: 'Leffe Blonde 330ml - Unidade',
                  published: null,
                  volume: '0,0033',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas Especiais & Importadas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8936',
              title: 'Stella Artois 990ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/572959e31a74f.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8570',
                  price: 6.99,
                  inventoryItemId: '80163',
                  shortDescription: null,
                  title: 'Stella Artois 990ml - Unidade',
                  published: null,
                  volume: '0,0099',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9318',
              title: 'Gatorade Uva 500ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009318_d9144cb2-39f7-4e07-b5f5-4c18ff4ae8ed.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8952',
                  price: 4.49,
                  inventoryItemId: '80308',
                  shortDescription: null,
                  title: 'Gatorade Uva 500ml - Unidade',
                  published: null,
                  volume: '0,005',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9405',
              title: 'Camisinha Olla 3 un.',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009405_43a71fd3-7ba5-4e26-b84c-e3088e663637.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9039',
                  price: 11.9,
                  inventoryItemId: '80339',
                  shortDescription: null,
                  title: 'Camisinha Olla 3 un.',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para festas & churrascos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9359',
              title: 'Copo Plástico 300ml',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009359_ba6b7b62-da76-4a8c-9618-c41ae32403bd.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8993',
                  price: 11.9,
                  inventoryItemId: '80343',
                  shortDescription: null,
                  title: 'Copo Plástico 300ml',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para festas & churrascos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9537',
              title: 'Vinho Chileno Tinto Seco Merlot Garrafa 750ml',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009537_f9ba8b41-3e7d-4d68-b8bd-eec7d1d63d5d.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9171',
                  price: 54.9,
                  inventoryItemId: '80297',
                  shortDescription: '',
                  title: 'Vinho Chileno Tinto Seco Merlot Garrafa 750ml',
                  published: null,
                  volume: '0,0075',
                  volumeUnit: null,
                  description: '',
                  subtitle: 'Vinhos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9543',
              title: 'Vinho Chileno Branco Chardonnay 750ml',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009543_adf61e69-b97e-4938-a659-b4fdb30d428b.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9177',
                  price: 54.9,
                  inventoryItemId: '80295',
                  shortDescription: '',
                  title: 'Vinho Chileno Branco Chardonnay 750ml',
                  published: null,
                  volume: '0,0075',
                  volumeUnit: null,
                  description: '',
                  subtitle: 'Vinhos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9540',
              title: 'Vinho Chileno Tinto Seco Reservado Carmenere Garrafa 750ml',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/products/9174.png',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9174',
                  price: 54.9,
                  inventoryItemId: '80298',
                  shortDescription: '',
                  title: 'Vinho Chileno Tinto Seco Reservado Carmenere Garrafa 750ml',
                  published: null,
                  volume: '0,0075',
                  volumeUnit: null,
                  description: '',
                  subtitle: 'Vinhos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9541',
              title: 'Vinho Chileno Tinto Seco Reservado Cabernet Sauvignon 750ml',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/products/9175.png',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9175',
                  price: 54.9,
                  inventoryItemId: '80340',
                  shortDescription: '',
                  title: 'Vinho Chileno Tinto Seco Reservado Cabernet Sauvignon 750ml',
                  published: null,
                  volume: '0,0075',
                  volumeUnit: null,
                  description: '',
                  subtitle: 'Vinhos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9457',
              title: 'Torcida Pimenta Mexicana',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009457_afca9fbf-301b-4629-a68c-c2222efa9d01.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9091',
                  price: 5.5,
                  inventoryItemId: '80345',
                  shortDescription: null,
                  title: 'Torcida Pimenta Mexicana',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para matar a fome',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9407',
              title: 'Doritos Queijo Nacho 55g',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009407_91c56ba0-0fe4-4ee5-a3e7-938ce2f13367.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9041',
                  price: 7.5,
                  inventoryItemId: '80336',
                  shortDescription: null,
                  title: 'Doritos Queijo Nacho 55g',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para matar a fome',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9414',
              title: 'Ruffles Original 57g',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009414_91d2e756-8b3b-4363-ba91-2c8c8b82eeef.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9048',
                  price: 7.5,
                  inventoryItemId: '80347',
                  shortDescription: null,
                  title: 'Ruffles Original 57g',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para matar a fome',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9449',
              title: 'Ovinhos de Amendoim Elma Chips',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009449_edc8f58d-8943-4c17-8b94-10dc60608b09.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9083',
                  price: 9.9,
                  inventoryItemId: '80341',
                  shortDescription: null,
                  title: 'Ovinhos de Amendoim Elma Chips',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para matar a fome',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9447',
              title: 'Amendoim Japonês Elma Chips',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/5722613fb7a48.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9081',
                  price: 11.9,
                  inventoryItemId: '80344',
                  shortDescription: null,
                  title: 'Amendoim Japonês Elma Chips',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: null,
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9428',
              title: 'Pringles Original',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009428_adc57e3c-1279-4498-82dc-ce26cadb8dc6.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9062',
                  price: 29.9,
                  inventoryItemId: '80349',
                  shortDescription: null,
                  title: 'Pringles Original',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para matar a fome',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9456',
              title: 'Torcida Cebola',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009456_ea34eda0-71fe-4d41-9c8c-460475206a3e.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9090',
                  price: 5.5,
                  inventoryItemId: '80306',
                  shortDescription: null,
                  title: 'Torcida Cebola',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Destaques & Promoções',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9468',
              title: 'Pipoca Sabor Natural - 100g',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009468_0eef7058-71b7-4c31-b8a3-473d62f0f710.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9102',
                  price: 5.5,
                  inventoryItemId: '80301',
                  shortDescription: null,
                  title: 'Pipoca Sabor Natural - 100g',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para matar a fome',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9470',
              title: 'Pipoca Sabor Manteiga - 100g',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009470_6aeaf4f0-4a58-407c-b651-2f779efd582a.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9104',
                  price: 5.5,
                  inventoryItemId: '80302',
                  shortDescription: null,
                  title: 'Pipoca Sabor Manteiga - 100g',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para matar a fome',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8790',
              title: 'Halls Extra Forte',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8790_5373dae3-0c77-4d63-90aa-c1d4204b11a0.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-06-06T14:01:42',
                  productVariantId: '8424',
                  price: 4.5,
                  inventoryItemId: '80128',
                  shortDescription: 'a',
                  title: 'Halls Extra Forte',
                  published: null,
                  volume: '5',
                  volumeUnit: null,
                  description: 'b',
                  subtitle: 'Outros',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9339',
              title: 'Saco de Gelo em Cubos - 2kg',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009339_d3162348-c1f7-4dc0-95d0-0bca8e14ab06.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8973',
                  price: 9.9,
                  inventoryItemId: '80311',
                  shortDescription: null,
                  title: 'Saco de Gelo em Cubos - 2kg',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para festas & churrascos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9350',
              title: 'Carvão Vegetal 2,5kg',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009350_98d837ac-e98d-49a4-8e5c-b01cda3f6960.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8984',
                  price: 23.9,
                  inventoryItemId: '80305',
                  shortDescription: null,
                  title: 'Carvão Vegetal 2,5kg',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para festas & churrascos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8795',
              title: 'Halls Melancia',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008795_64d5ebab-e133-4c1d-bb3c-e87a1b7c6a04.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8429',
                  price: 4.5,
                  inventoryItemId: '80131',
                  shortDescription: null,
                  title: 'Halls Melancia',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Balas & Doces',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9400',
              title: 'Baralho Copag 139 Azul ou Vermelho',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009400_ccab5d33-c0d0-4488-a608-7130beaad63c.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9034',
                  price: 18.9,
                  inventoryItemId: '80346',
                  shortDescription: null,
                  title: 'Baralho Copag 139 Azul ou Vermelho',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para festas & churrascos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '9402',
              title: 'Isqueiro Bic Pequeno',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009402_5641a94f-2165-44e3-96f5-1d76e627c898.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '9036',
                  price: 6.5,
                  inventoryItemId: '80348',
                  shortDescription: null,
                  title: 'Isqueiro Bic Pequeno',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Para festas & churrascos',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
            {
              id: '8794',
              title: 'Halls Cereja',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008794_99b661be-1619-4deb-a938-857456f4189a.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8428',
                  price: 4.5,
                  inventoryItemId: '80130',
                  shortDescription: null,
                  title: 'Halls Cereja',
                  published: null,
                  volume: '0',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Balas & Doces',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
          ],
          __typename: 'POC',
        },
      },
    },
  };

  const getProductsMockSearch = {
    request: {
      query: GET_PRODUCTS_QUERY,
      variables: {
        id: '532',
        search: 'Skol',
      },
    },
    result: {
      data: {
        poc: {
          id: '532',
          products: [
            {
              id: '8868',
              title: 'Skol 269ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8868_205f958d-2e51-48a3-b4d5-a2998765571a.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8502',
                  price: 2.09,
                  inventoryItemId: '80149',
                  shortDescription: null,
                  title: 'Skol 269ml - Unidade',
                  published: null,
                  volume: '0,00269',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
          ],
          __typename: 'POC',
        },
      },
    },
  };

  const getProductsMockSearchCategory = {
    request: {
      query: GET_PRODUCTS_QUERY,
      variables: {
        id: '532',
        categoryId: '94',
        search: '',
      },
    },
    result: {
      data: {
        poc: {
          id: '532',
          products: [
            {
              id: '8868',
              title: 'Skol 269ml - Unidade',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8868_205f958d-2e51-48a3-b4d5-a2998765571a.jpg',
                  __typename: 'ProductImage',
                },
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8502',
                  price: 2.09,
                  inventoryItemId: '80149',
                  shortDescription: null,
                  title: 'Skol 269ml - Unidade',
                  published: null,
                  volume: '0,00269',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Cervejas',
                  components: [],
                  __typename: 'ProductVariant',
                },
              ],
              __typename: 'Product',
            },
          ],
          __typename: 'POC',
        },
      },
    },
  };

  const mocks = [getPOCMock, getProductsMock, getCategoriesMock];

  // using this mock we can make all dates at the time 0
  beforeEach(() => {
    const mockedDate = new Date(2020, 11, 10, 0, 0, 0, 0);
    const originalDate = Date;

    mockedDate.setTime(0);

    global.Date = jest.fn(() => mockedDate);
    global.Date.now = originalDate.now;
    global.Date.setDate = originalDate.setDate;
  });

  it('should render', () => {
    shallow(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/list',
            search: 'lat=-23.63356&long=-46.69832&address=Rua%20Américo%20Brasiliense',
          },
        ]}
      >
        <MockedProvider mocks={[]}>
          <Products />
        </MockedProvider>
      </MemoryRouter>,
    );
  });

  it('should render loading state', async () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/list',
            search: 'lat=-23.63356&long=-46.69832&address=Rua%20Américo%20Brasiliense',
            key: 'testKey',
          },
        ]}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <Products />
        </MockedProvider>
      </MemoryRouter>,
    );

    await updateWrapper(wrapper);

    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it('should render error state', async () => {
    const newPOCMock = { ...getPOCMock, error: new Error() };

    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/list',
            search: 'lat=-23.63356&long=-46.69832&address=Rua%20Américo%20Brasiliense',
            key: 'testKey',
          },
        ]}
      >
        <MockedProvider
          mocks={[newPOCMock, getCategoriesMock, getProductsMock]}
          addTypename={false}
        >
          <Products />
        </MockedProvider>
      </MemoryRouter>,
    );

    await updateWrapper(wrapper);

    expect(
      wrapper
        .find('h3')
        .first()
        .text(),
    ).toBe('Ocorreu um um erro ao encontrar os produtos selecionados, tente novamente.');
  });

  it('should render final state', async () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/list',
            search: 'lat=-23.63356&long=-46.69832&address=Rua%20Américo%20Brasiliense',
            key: 'testKey',
          },
        ]}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <Products />
        </MockedProvider>
      </MemoryRouter>,
    );

    await updateWrapper(wrapper);

    expect(wrapper.find(ProductsList)).toHaveLength(0);

    await act(async () => {
      await wait(200);
      wrapper.update();
    });

    expect(wrapper.find(ProductsList)).toHaveLength(1);
    expect(wrapper.find(ProductsList).prop('products').length).toBe(64);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update list if we type on SearchBar', async () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/list',
            search: 'lat=-23.63356&long=-46.69832&address=Rua%20Américo%20Brasiliense',
            key: 'testKey',
          },
        ]}
      >
        <MockedProvider mocks={mocks.concat(getProductsMockSearch)} addTypename={false}>
          <Products />
        </MockedProvider>
      </MemoryRouter>,
    );

    await updateWrapper(wrapper);

    await act(async () => {
      await wait(200);
      wrapper.update();
    });

    wrapper.find('input').simulate('change', { target: { value: 'Skol' } });

    await act(async () => {
      await wait(400);
      wrapper.update();
    });

    expect(wrapper.find(ProductsList).prop('products').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update list after selecting category', async () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/list',
            search: 'lat=-23.63356&long=-46.69832&address=Rua%20Américo%20Brasiliense',
            key: 'testKey',
          },
        ]}
      >
        <MockedProvider mocks={mocks.concat(getProductsMockSearchCategory)} addTypename={false}>
          <Products />
        </MockedProvider>
      </MemoryRouter>,
    );

    await updateWrapper(wrapper);

    await act(async () => {
      await wait(200);
      wrapper.update();
    });

    wrapper
      .find('CategoriesList button')
      .at(1)
      .simulate('click');

    await act(async () => {
      await wait(100);
      wrapper.update();
    });

    expect(wrapper.find(ProductsList).prop('products')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('does have a link to the address page', async () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/list',
            search: 'lat=-23.63356&long=-46.69832&address=Rua%20Américo%20Brasiliense',
            key: 'testKey',
          },
        ]}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <Products />
        </MockedProvider>
      </MemoryRouter>,
    );

    await updateWrapper(wrapper);

    expect(wrapper.find(CustomLink).prop('to')).toBe('/');
  });
});
