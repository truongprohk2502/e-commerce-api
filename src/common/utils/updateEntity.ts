import { EntitySchema } from 'typeorm';

export const updateEntity = (entity: any, dto: any) => {
  for (let key in dto) {
    if (key in entity) {
      entity[key] = dto[key];
    }
  }
};
