import 'package:flutter_common/config/constants.dart';

import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  static final String serverUrl =
      dotenv.maybeGet('BASE_URL') ?? "http://${Constants.serverIp}/rider-api/";
  static final String gqlEndpoint = '${serverUrl}graphql';
  static bool isDemoMode = false; //Todo dotenv.maybeGet('DEMO_MODE') == 'true';
  static String appName = dotenv.maybeGet('APP_NAME') ?? "inToura";
  static String companyName = dotenv.maybeGet('COMPANY_NAME') ?? "inToura";
  static String firebaseMessagingVapidKey =
      dotenv.maybeGet('FIREBASE_MESSAGING_VAPID_KEY') ?? ""; //Todo
  static int placeSearchSearchRadius = 100000;
  static double desktopNavigationBarHeight = 96;
} //Todo all dotenv
