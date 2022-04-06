# EmiSwap Interface

This repository contains EmiSwap Interface originally forked from Mooniswap.

## Accessing the EmiSwap Interface

To access the EmiSwap Interface visit [emiswap.com](https://emiswap.com/).

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the oracle environment(optional)

1. install kubectl — https://kubernetes.io/ru/docs/tasks/tools/install-kubectl/
2. get to choose namespaces

```bash
kubectl get ns
```

3. get to choose service

```bash
kubectl -n {namespace} get svc
```

example

```bash
kubectl -n emiswap-oracle-feature-es-412-api-report-export-app get svc /// emiswap-oracle    10.233.23.164   <none>  3000/TCP   4d18h
```

3. proxy service

```bash
kubectl port-forward -n {namesspace} svc/{service} 9002:{service_port}
```

example

```bash
kubectl port-forward -n emiswap-oracle-feature-es-412-api-report-export-app svc/emiswap-oracle 9002:3000
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g.
   `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"`

Note that the interface only works on main net where all contracts are deployed. The interface will
not work on other networks.

#### Contributions

**Please open all pull requests against the `production` branch.** CI checks will run against all
PRs.

#### License

This program is free software: you can redistribute it and / or modify it under the terms of the GNU
General Public License as published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not,
see <https://www.gnu.org/licenses/>.

#### Contact us

Copyright © 2021, [EmiSwap](https://emiswap.com/).

Released under GNU General Public License v3.0 
