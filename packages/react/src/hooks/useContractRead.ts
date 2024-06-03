import { Contract, type Address, type JsonAbi, type Provider } from "fuels";
import type { FunctionNames, InputsForFunctionName } from "src/types";

import { useNamedQuery } from "../core/useNamedQuery";
import { QUERY_KEYS } from "../utils";

type ContractData<
	TAbi extends JsonAbi
> = {
	address: Address;
	abi: TAbi;
	provider: Provider;
};

type ContractReadProps<
	TAbi extends JsonAbi,
	TFunctionName extends FunctionNames<TAbi>,
> = {
	contract: Contract | ContractData<TAbi>;
	functionName: TFunctionName;
	args: InputsForFunctionName<TAbi, TFunctionName>;
};

export const useContractRead = <
	TAbi extends JsonAbi,
	TFunctionName extends FunctionNames<TAbi>,
>({
	functionName,
	args,
	contract: _contract,
}: ContractReadProps<TAbi, TFunctionName>) => {
  const isContractData = 'abi' in _contract && 'address' in _contract;
  const { abi, address, provider } = (_contract as ContractData<TAbi>) ?? {};
	const isValid = isContractData ? (!!abi && !!address && !!provider) : !!_contract;
	const chainId = _contract?.provider?.getChainId();

	return useNamedQuery("contract", {
		queryKey: QUERY_KEYS.contract(
			(isContractData ? address?.toString() : _contract?.id?.toString()),
			chainId,
			args?.toString(),
		),
		queryFn: async () => {
			if (!isValid) {
				throw new Error(
					"Contract or address, abi and provider are required to read the contract",
				);
			}
			if (typeof chainId !== "number") {
				throw new Error("ChainId is required to read the contract");
			}
			const contract = (_contract as Contract) || new Contract(address, abi, provider); 

			if (!contract?.functions?.[functionName]) {
				throw new Error(`Function ${functionName || ""} not found on contract`);
			}

			const wouldWriteToStorage =
				contract.functions[functionName].isReadOnly?.() !== undefined
					? !contract.functions[functionName].isReadOnly()
					: Object.values(contract.interface.functions)
							.find((f) => f.name === functionName)
							?.attributes?.find((attr) => attr.name === "storage")
							?.arguments?.includes("write");

			if (wouldWriteToStorage) {
				throw new Error(
					"Methods that write to storage should not be called with useContractRead",
				);
			}

			return args !== undefined
				? contract.functions[functionName](args)
				: contract.functions[functionName]();
		},
		enabled: isValid,
	});
};
