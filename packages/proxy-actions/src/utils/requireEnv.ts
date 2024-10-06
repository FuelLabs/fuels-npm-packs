export function requireEnv<T extends string>(keys: T[]): { [K in T]: string } {
  const env = keys.reduce(
    (ret, key) => {
      if (!process.env[key]) {
        throw new Error(`Environment variable ${key} is required`);
      }
      ret[key] = process.env[key]!;
      return ret;
    },
    {} as { [K in T]: string },
  );
  return env;
}
