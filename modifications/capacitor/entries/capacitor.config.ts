import { CapacitorConfig } from '@capacitor/cli'
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard'

const config: CapacitorConfig = {
  appId: 'com.yourapp.app',
  appName: 'app',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
      style: KeyboardStyle.Default,
      resizeOnFullScreen: false
    },
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#ffffffff',
      splashFullScreen: true,
      splashImmersive: true
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  },
  ios: {
    scrollEnabled: false,
    allowsLinkPreview: false
  }
}

export default config
