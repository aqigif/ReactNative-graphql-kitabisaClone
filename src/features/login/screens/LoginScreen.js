import React, { memo, useState, useMemo, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ToastAndroid, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../queries';
import { AuthContext } from '../../../navigations/navigations';
import { Root, Toast } from 'popup-ui'
import AntIcon from 'react-native-vector-icons/AntDesign'

const LoginScreen = ({ navigation }) => {
  const [loginFunc, result] = useMutation(LOGIN,{
    onCompleted(data) {
      onSuccess(data)
    },
    onError(error) {
      onFailed(error)
    }
  });
  const { signIn } = React.useContext(AuthContext);

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      await loginFunc({
        variables:{email: email.value, password: password.value},
        pollInterval:200000,
      })
    }
  };

  const onSuccess = async (data) => {
    if (data) {
      Keyboard.dismiss()
      Toast.show({
        title: 'Login success',
        text: 'Welcome to Mejik Foundation',
        color: '#2ecc71',
        timing: 2000,
        icon: <AntIcon name='check' size={25} color='#fff' />
      })
      await AsyncStorage.setItem('@token', data?.login?.token);
      await AsyncStorage.setItem('@id', data?.login?.user?.id);
      const token = await AsyncStorage.getItem('@token');
      signIn(token)
    }
  }
  
  const onFailed = async(error) => {
    if(error){
      Keyboard.dismiss()
      Toast.show({
        title: 'Login Error',
        text: 'Email or Password was incorrect',
        color: '#e74c3c',
        icon: <AntIcon name='close' size={25} color='#fff' />
      })
    }
  }
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Home')} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => {}}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
