import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CowListScreen from '../screens/CowListScreen';
import CowFormScreen from '../screens/CowFormScreen';
import CowDetailScreen from '../screens/CowDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="CowList" component={CowListScreen} options={{ title: 'Cow Catalog' }} />
      <Stack.Screen name="CowForm" component={CowFormScreen} options={{ title: 'Add New Cow' }} />
      <Stack.Screen name="CowDetail" component={CowDetailScreen} options={{ title: 'Cow Details' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
