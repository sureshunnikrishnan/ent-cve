import kuzu from 'kuzu';
import path from 'path';
import fs from 'fs';

// Define database path - storing in the data directory
const DB_PATH = path.resolve(__dirname, '../../../data/cve.db');

// Ensure data directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create a singleton database instance
let db: kuzu.Connection | null = null;

/**
 * Initialize the Kuzu database connection
 */
export function initKuzuDB(): kuzu.Connection {
  if (!db) {
    // Using console.error for logging that is allowed by ESLint config
    console.error(`Initializing KuzuDB at ${DB_PATH}`);
    const dbObj = new kuzu.Database(DB_PATH);
    db = new kuzu.Connection(dbObj);
  }
  return db;
}

/**
 * Get the Kuzu database instance
 */
export function getKuzuDB(): kuzu.Connection {
  if (!db) {
    return initKuzuDB();
  }
  return db;
}

/**
 * Execute a Kuzu query
 */
export async function executeQuery(
  query: string,
  _params?: Record<string, unknown>
): Promise<unknown> {
  const dbInstance = getKuzuDB();
  try {
    return await dbInstance.query(query);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Initialize database schema if needed
 */
export async function initializeSchema(): Promise<void> {
  const dbInstance = getKuzuDB();

  try {
    // Check if database is initialized by running a simple query
    await dbInstance.query('RETURN 1');
    console.error('Database connection successful');

    // Add schema initialization queries here if needed
    // For example:
    // await dbInstance.run(`CREATE NODE TABLE IF NOT EXISTS CVE (
    //   id STRING PRIMARY KEY,
    //   description STRING,
    //   severity STRING,
    //   published_date DATE
    // )`);
  } catch (error) {
    console.error('Error initializing database schema:', error);
    throw error;
  }
}
