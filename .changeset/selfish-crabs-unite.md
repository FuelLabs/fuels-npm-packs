---
'@fuels/react': minor
---

Provide consistent return types across Fuel hooks, for an easier typed experience.
Every query hook will now return a `null` value if the query is not available, instead of `undefined`.

### Examples
```tsx
const { wallet } = useWallet(); // wallet is Wallet | null
const { network } = useNetwork(); // network is Network | null
// and so on... Every query hook will return T | null
```