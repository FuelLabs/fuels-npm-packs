---
'@fuels/react': minor
---

- Add `useTransactionResult` hook to get a transaction that has been successfully mined.
- Create a type `UseNamedQueryParams` to allow overriding `select` function of TanStack Query and our custom `name` property.

### Basic usage with `select` function

```tsx
const { receipts } = useTransactionResult({
  txId: '0xd7ad974cdccac8b41132dfe1d2a4219a681af1865f0775f141c4d6201ee428d1',
  query: {
    name: 'receipts', // Or anything else (optional, default: 'transactionResult')
    select: (data) => data?.receipts || null,
  },
});
```
