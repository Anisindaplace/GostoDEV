import { schema } from 'normalizr';

export default new schema.Entity('concerts', {}, {
  idAttribute: 'concertId',
});
