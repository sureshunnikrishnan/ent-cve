export * from './kuzu';

// Re-export commonly used functions with simpler names
import { getKuzuDB, executeQuery, initializeSchema } from './kuzu';

export const db = {
  get: getKuzuDB,
  query: executeQuery,
  initialize: initializeSchema,
};
