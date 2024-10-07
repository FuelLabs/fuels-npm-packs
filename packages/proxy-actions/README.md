## Proxy Actions CLI

A CLI tool to execute actions on a proxy contract.

### Installation

```bash
npm install -g @fuels/proxy-cli
```

### Usage

```bash
fuels-proxy --help
```

### Help output

```
Usage: Proxy scripts [options] [command]

Scripts for interacting with the proxy contract

Options:
  -h, --help                   display help for command

Commands:
  balance [options]
  setImplementation [options]
  getImplementation [options]
  getOwnership [options]
  transferOwnership [options]
  transferSelf [options]
  help [command]               display help for command
```

For passing the provider URL and account key, you can use the environment variables `PROVIDER_URL` and `ACCOUNT_KEY` respectively.


### License

This package is licensed under the Apache 2.0 license.
