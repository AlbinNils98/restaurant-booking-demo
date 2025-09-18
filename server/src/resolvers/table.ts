import { TABLE_TTL_SECONDS } from '@/constants/constants';
import { Table } from '@/generated/graphql';

export const tableResolvers = {
  Table: {
    removalDate: (table: Table) => {
      return table.removedAt
        ? new Date(table.removedAt.getTime() + TABLE_TTL_SECONDS * 1000)
        : null;
    },
  },
};