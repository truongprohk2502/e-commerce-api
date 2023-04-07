import { CountrySwagger } from 'src/countries/swaggers/country.swagger';

export const AddressSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    unitNumber: {
      type: 'string',
      example: '82 Floor 4',
    },
    streetNumber: {
      type: 'string',
      example: '12A',
    },
    streetName: {
      type: 'string',
      example: 'Hill Road',
    },
    city: {
      type: 'string',
      example: 'Los Angeles',
    },
    region: {
      type: 'string',
      example: 'California',
    },
    postalCode: {
      type: 'string',
      example: '880012',
    },
    isDefault: {
      type: 'string',
      example: false,
    },
    country: CountrySwagger,
  },
};
