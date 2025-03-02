import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyA-D2XHRS-JaGnxK4YnNVMl_P4pYLd2GZo',
    appId: '1:336410207621:web:c54068a419fc21c5a7d0ec',
    messagingSenderId: '336410207621',
    projectId: 'rctdriver-aa95a',
    authDomain: 'rctdriver-aa95a.firebaseapp.com',
    storageBucket: 'rctdriver-aa95a.firebasestorage.app',
    measurementId: 'G-YZVBJTQ8C8',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDA_dXIfPnkji1BQpWnFmjV8c5MMHBOzBo',
    appId: '1:336410207621:android:a3646df5bab118aba7d0ec',
    messagingSenderId: '336410207621',
    projectId: 'rctdriver-aa95a',
    storageBucket: 'rctdriver-aa95a.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAXli4JHYarcLEP3i_gRJwCdMo-Av1ghU4',
    appId: '1:336410207621:ios:a81c0262f585bc00a7d0ec',
    messagingSenderId: '336410207621',
    projectId: 'rctdriver-aa95a',
    storageBucket: 'rctdriver-aa95a.firebasestorage.app',
    iosBundleId: 'com.ridy.taxi.driver',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyAXli4JHYarcLEP3i_gRJwCdMo-Av1ghU4',
    appId: '1:336410207621:ios:de6f8f878dff60c0a7d0ec',
    messagingSenderId: '336410207621',
    projectId: 'rctdriver-aa95a',
    storageBucket: 'rctdriver-aa95a.firebasestorage.app',
    iosBundleId: 'com.gotaxi.taxi.driverFlutter',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyA-D2XHRS-JaGnxK4YnNVMl_P4pYLd2GZo',
    appId: '1:336410207621:web:3c53f5d051b6a4f5a7d0ec',
    messagingSenderId: '336410207621',
    projectId: 'rctdriver-aa95a',
    authDomain: 'rctdriver-aa95a.firebaseapp.com',
    storageBucket: 'rctdriver-aa95a.firebasestorage.app',
    measurementId: 'G-NCGPNBLBEV',
  );
}
