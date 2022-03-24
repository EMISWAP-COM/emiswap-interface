declare module global {
  interface AppWindow extends Window {
    env: any;
  }

  declare var window: AppWindow;
}

declare module '*.pdf';
