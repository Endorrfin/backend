import 'react-hot-toast';

declare module 'react-hot-toast' {
  interface ToastOptions {
    style?: React.CSSProperties;
  }
}
