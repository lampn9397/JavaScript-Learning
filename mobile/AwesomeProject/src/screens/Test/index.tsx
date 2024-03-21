import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { images } from '../../assets';
import Test from '../../components/Test';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import routes from '../../constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function TestScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const [state, setState] = React.useState({
        inputText: '',
        inputFocus: false,
    })

    return (
        <View style={styles.container}>
            <Text style={{
                backgroundColor: "green",
                color: "red",
                lineHeight: 50
            }}>
                Open up App.js to start working on your app!
            </Text>
            <Image source={images.icon} style={{
                height: 30,
                width: 30,
            }} />
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: state.inputFocus ? "red" : "#d9d9d9",
                    borderRadius: 4,
                    height: 50
                }}
                onChangeText={(text) => setState((prevState) => ({ ...prevState, inputText: text }))}
                value={state.inputText}
                onFocus={() => { setState((prevState) => ({ ...prevState, inputFocus: true })) }}
                onBlur={() => { setState((prevState) => ({ ...prevState, inputFocus: false })) }}
                placeholder='tri'
            />
            <Text>{state.inputText}</Text>
            <Button
                title='click me'
                onPress={() => Alert.alert("hello", state.inputText)}
            />
            <Button
                title='go to LoginScreen'
                onPress={() => navigation.navigate(routes.LoginScreen, {
                    userName: state.inputText
                })}
            />
            <StatusBar style="auto" />
            <Test />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
