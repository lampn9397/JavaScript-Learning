
import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';

interface ParamList {
    userName: string
}

export default function LoginScreen() {

    const route = useRoute<RouteProp<ParamList>>()

    const [state, setState] = React.useState({
    })

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Username'
                value={route.params.userName}
            />
            <TextInput
                placeholder='Password'
            />
        </View>
    );
}

