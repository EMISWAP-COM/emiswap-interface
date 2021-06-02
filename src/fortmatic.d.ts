declare module 'fortmatic' {
  export class Provider {}

  export class Fortmatic {
    constructor(apiKey: string, chainId?: string) {}

    getProvider(): Provider;
  }

  export = Fortmatic;
}
