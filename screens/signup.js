import React from 'react';
import SyncStorage from 'sync-storage';
import { createDrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation';
import { AppNavigator } from './screens';
import { AsyncStorage, FlatList, Image, Text, TouchableHighlight, 
  TouchableNativeFeedback, View } from "react-native";