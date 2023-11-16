/**
 * The function compare default from xstate uses === what for objects
 * like BN, Bytes that are commonly used on fuel applications because the state
 * to be updated, causing performance issues.
 * The approach suggested by the xsate is to use shallowEqual function, but this
 * only compares on level objects, tht in our case also triggers state changes
 * as BN, Address, and Bytes are also objects.
 * For our use cases we can use JSON.stringify to compare objects, as the order
 * of properties in most cases is the same. And it's more performatic than
 * deepEqual functions.
 * 
 * Reference: https://xstate.js.org/docs/packages/xstate-react/#api
 * Why use JSON https://www.mattzeunert.com/2016/01/28/javascript-deep-equal.html
 *
 * @param a 
 * @param b 
 * @returns if objects are different
 */
export function deepCompare(a: unknown, b: unknown) {
    if (typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}
