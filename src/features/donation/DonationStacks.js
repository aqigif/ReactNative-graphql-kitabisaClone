import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BeneficiariesScreen from './screens/BeneficiariesScreen';
import DonateScreen from './screens/DonateScreen';

const DonationStack = createStackNavigator();

function DonationStackScreen() {
  return (
    <DonationStack.Navigator>
      <DonationStack.Screen name="Donation" component={BeneficiariesScreen} />
      <DonationStack.Screen name="Donating" component={DonateScreen} />
    </DonationStack.Navigator>
  );
}

export function DonationUnAuthStackScreen() {
  return (
    <DonationStack.Navigator>
      <DonationStack.Screen name="Beneficiaries" component={BeneficiariesScreen} />
    </DonationStack.Navigator>
  );
}

export default DonationStackScreen;