---
'@fuels/react': minor
---

Add `useSendTransaction` hook that allows developers to easily send a transaction.

```tsx
const { sendTransaction } = useSendTransaction();

// [...]

const transactionRequest = new ScriptTransactionRequest({}); // Or any other tx request
sendTransaction({
  address: 'fuel1zs7l8ajg0qgrak3jhhmq3xf3thd8stu535gj7p5fye2578yccjyqcgja3z',
  transaction,
});
```
