/**
 * The function compare default from xstate uses ===
 * for all cases including objects what can cause issues
 * when comparing objects, with different references for values
 * like BN, Bytes that are commonly used on fuels because of this
 * we need to compare objects using JSON.stringify in our case shallowEqual
 * also not works as BN are classes and not objects.
 * 
 * Reference: https://xstate.js.org/docs/packages/xstate-react/#api
 *
 * @param a 
 * @param b 
 * @returns if objects are different
 */
export function compare(a: unknown, b: unknown) {
    if (typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}
