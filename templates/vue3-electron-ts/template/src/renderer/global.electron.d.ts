interface ElectronAPI {
  sendMessage(message: string): void
}

export declare global {
  interface Window {
    electron: ElectronAPI
  }
}
