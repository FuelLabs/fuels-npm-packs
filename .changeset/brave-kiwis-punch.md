---
'@fuels/react': minor
---

If provided Abi is declared with `as const`, hook will dynamically infer possible method names, as well as the arguments quantity and types for a selected method.

Example using a [Counter Fuel Contract](https://github.com/FuelLabs/fuel-connectors/blob/c791674953271df0c4b93c2991698fc5fcde6514/examples/react-app/src/types/contracts/factories/CounterAbi__factory.ts#L16):

<img width="871" alt="Screenshot 2024-06-02 at 00 10 08" src="https://github.com/FuelLabs/fuels-npm-packs/assets/3487334/3e80ea56-2b73-4165-8cbd-0cd087f0a5c8">

Arguments type inference example:
<img width="615" alt="Screenshot 2024-06-02 at 00 12 25" src="https://github.com/FuelLabs/fuels-npm-packs/assets/3487334/31a4bc5d-6aae-4d96-baab-df6ef60f8ffe">

```JS
  const { contract } = useContractRead({
    address,
    abi: counterAbi,
    provider: fuelProvider,
    functionName: 'get_count',
    args: undefined,
  });
```

```JS
const { contract } = useContractRead({
    contract: _contract,
    functionName: 'get_count',
    args: undefined,
  });
```
