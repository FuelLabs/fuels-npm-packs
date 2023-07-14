# @fuels/changeset

## 0.0.3

### Patch Changes

- 🐞 Fix: Change eslint plugin project to @fuels/eslint-plugin to be able to load as `plugin:@fuels/base`
  Feat: Add custom configurations on eslint plugin to be able to handle different types of projects with the same plugin
  Fix: prettier configuration to be our default
  To use the base configuration you can extends like this:
  ```json
  {
    "extends": ["plugin:@fuels/base"]
  }
  ```
  You also provide a configuration for NextJS projects:
  ```json
  {
    "extends": ["plugin:@fuels/next"]
  }
  ```
  Or you can pick some specific configuration:
  ````json
  {
  "extends": [
  "plugin:@fuels/typescript",
  "plugin:@fuels/react",
  "plugin:@fuels/jest"
  ]
  }
  ```, by [@pedronauck](https://github.com/pedronauck) (See [#5](https://github.com/FuelLabs/fuels-npm-packs/pull/5))
  ````

## 0.0.2

### Patch Changes

- create fuels common packages, by [@pedronauck](https://github.com/pedronauck) (See [#1](https://github.com/FuelLabs/fuels-npm-packs/pull/1))

## 0.0.2

### Patch Changes

- create fuels common packages, by [@pedronauck](https://github.com/pedronauck) (See [#1](https://github.com/FuelLabs/fuels-npm-packs/pull/1))
