import { CountrySwagger } from 'src/countries/swaggers/country.swagger';

export const AddressSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    unit_number: {
      type: 'string',
      example: '82 Floor 4',
    },
    street_number: {
      type: 'string',
      example: '12A',
    },
    street_name: {
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
    postal_code: {
      type: 'string',
      example: '880012',
    },
    is_default: {
      type: 'string',
      example: false,
    },
    fk_country_id: {
      type: 'number',
      example: 1,
    },
    fk_user_id: {
      type: 'number',
      example: 1,
    },
    country: CountrySwagger,
  },
};
