import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';

// after confirmation, the user was added to the
// cognito group associated with the tenant
async function fetchUserInfo(setTenant) {
  // get the access token of the signed in user
  const {accessToken} = await Auth.currentSession();
  // get the tenant from the top of the cognito groups list
  const cognitogroups = accessToken.payload['cognito:groups'];
  const tenant = cognitogroups[0];
  setTenant(tenant);
}

const App = withAuthenticator(() => {
  const [tenant, setTenant] = useState('');
  useEffect(() => {
    fetchUserInfo(setTenant);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            AWS Amplify Multi-Tenancy Example
          </Text>
          <Text style={styles.sectionDescription}>Your tenant is {tenant}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});

export default App;
