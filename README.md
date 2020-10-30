# Mooniswap Interface 

[![Tests](https://github.com/CryptoManiacsZone/mooniswap-interface/workflows/Tests/badge.svg)](https://github.com/CryptoManiacsZone/mooniswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

Mooniswap is next generation AMM (Automated Market Maker) protocol.

This repository contains Mooniswap Interface originally forked from Uniswap.

## Accessing the Mooniswap Interface
To access the Mooniswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/CryptoManiacsZone/mooniswap-interface/releases/latest), 
or visit [mooniswap.exchange](https://mooniswap.exchange/).


## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on mainent where all contracts are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

#### License

This program is free software: you can redistribute it and / or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 

See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

#### Contact us
- info@1inch.exchange

Copyright © 2020, 1inch limited.

Copyright © 2020, [Uniswap](https://uniswap.org/).

Released under GNU General Public License v3.0