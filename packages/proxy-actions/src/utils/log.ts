// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debug(...args: any) {
  if (process.env.DEBUG) {
    console.log(...args);
  }
}
