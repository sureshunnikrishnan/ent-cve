declare module 'kuzu' {
  // Native types from KuzuNative
  interface NodeDatabase {
    initAsync(callback: (err: Error | null) => void): void;
    initSync(): void;
    close(): void;
  }

  interface NodeQueryResult {
    resetIterator(): void;
    hasNext(): boolean;
    getNumTuples(): number;
    getNextAsync(callback: (err: Error | null, result: Record<string, unknown>) => void): void;
    getNextSync(): Record<string, unknown>;
    getColumnDataTypesAsync(callback: (err: Error | null, result: string[]) => void): void;
    getColumnDataTypesSync(): string[];
    getColumnNamesAsync(callback: (err: Error | null, result: string[]) => void): void;
    getColumnNamesSync(): string[];
    close(): void;
  }

  interface NodePreparedStatement {
    initAsync(callback: (err: Error | null) => void): void;
    initSync(): void;
  }

  // Type helper for handling QueryResult union types
  type QueryResultOrArray = QueryResult | QueryResult[];
  type QueryResultArray = QueryResult[];

  export class Database {
    constructor(
      databasePath: string,
      bufferManagerSize?: number,
      enableCompression?: boolean,
      readOnly?: boolean,
      maxDBSize?: number,
      autoCheckpoint?: boolean,
      checkpointThreshold?: number
    );
    init(): Promise<void>;
    initSync(): void;
    _getDatabase(): Promise<NodeDatabase>;
    _getDatabaseSync(): NodeDatabase;
    close(): Promise<void>;
    closeSync(): void;
    static getVersion(): string;
    static getStorageVersion(): string;
  }

  export class Connection {
    constructor(database: Database, numThreads?: number | null);
    init(): Promise<void>;
    initSync(): void;
    execute(
      preparedStatement: PreparedStatement,
      params?: Record<string, unknown>,
      progressCallback?: (
        pipelineProgress: number,
        numPipelinesFinished: number,
        numPipelines: number
      ) => void
    ): Promise<QueryResultOrArray>;
    executeSync(
      preparedStatement: PreparedStatement,
      params?: Record<string, unknown>
    ): QueryResultOrArray;
    prepare(statement: string): Promise<PreparedStatement>;
    prepareSync(statement: string): PreparedStatement;
    query(
      statement: string,
      progressCallback?: (
        pipelineProgress: number,
        numPipelinesFinished: number,
        numPipelines: number
      ) => void
    ): Promise<QueryResultOrArray>;
    querySync(statement: string): QueryResultOrArray;
    setMaxNumThreadForExec(numThreads: number): void;
    setQueryTimeout(timeoutInMs: number): void;
    close(): Promise<void>;
    closeSync(): void;
  }

  export class PreparedStatement {
    constructor(connection: Connection, preparedStatement: NodePreparedStatement);
    isSuccess(): boolean;
    getErrorMessage(): string;
  }

  export class QueryResult {
    constructor(connection: Connection, queryResult: NodeQueryResult);
    resetIterator(): void;
    hasNext(): boolean;
    getNumTuples(): number;
    getNext(): Promise<Record<string, unknown>>;
    getNextSync(): Record<string, unknown>;
    each(
      resultCallback: (row: Record<string, unknown>) => void,
      doneCallback: () => void,
      errorCallback: (err: Error) => void
    ): void;
    getAll(): Promise<Record<string, unknown>[]>;
    getAllSync(): Record<string, unknown>[];
    all(
      resultCallback: (rows: Record<string, unknown>[]) => void,
      errorCallback: (err: Error) => void
    ): void;
    getColumnDataTypes(): Promise<string[]>;
    getColumnDataTypesSync(): string[];
    getColumnNames(): Promise<string[]>;
    getColumnNamesSync(): string[];
    close(): void;
  }

  export const VERSION: string;
  export const STORAGE_VERSION: string;
}
