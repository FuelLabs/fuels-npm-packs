---
'@fuels/react': minor
---

Created useContractRead hook to read contract data from a contract instance or from a contract id.
If provided Abi is declared with `as const`, hook will dynamically infer possible method names, as well as the arguments quantity and types for a selected method.
