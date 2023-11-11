export type AppServerResponse<T> =
  | {
      data: T;
      errors: undefined;
    }
  | { data: undefined; errors: unknown };
