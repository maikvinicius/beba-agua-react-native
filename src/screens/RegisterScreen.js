import React from 'react';
import {
    Platform,
    KeyboardAvoidingView,
    Dimensions,
    AsyncStorage,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class RegisterScreen extends React.Component {

    state = {
        kg: ""
    }

    async componentDidMount() {
        this.animation.play();

        try {
            const value = await AsyncStorage.getItem('@BebaAgua:personKg');
            if (value !== null) {
                this.props.navigation.navigate('MainScreen')
            }
        } catch (error) {
            console.log(error)
        }

    }

    saveData = async () => {
        try {
            await AsyncStorage.setItem('@BebaAgua:personKg', this.state.kg);

            Alert.alert(
                'Parabéns',
                'Seus KGs foram salvos com sucesso, seja bem vinda!',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('MainScreen') },
                ],
                { cancelable: false }
            )
        } catch (error) {
            console.log(error);
        }
    };

    render() {

        const { kg } = this.state;

        return (
            <SafeAreaView style={styles.screenWidthHeight}>
                <KeyboardAvoidingView
                    behavior={Platform.Os == "ios" ? "padding" : "height"}
                    style={styles.screenWidthHeight}>
                    <View style={styles.container}>
                        <LottieView
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={styles.animation}
                            source={require('../../assets/weight.json')}
                            autoSize={false}
                        />
                        <View style={styles.box}>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                placeholder={"Digite a quantidade de KG que você possui!"}
                                placeholderTextColor={"#000"}
                                value={kg}
                                onChangeText={value => this.setState({ kg: value })}
                            />
                            <TouchableOpacity style={styles.button} onPress={() => this.saveData()}>
                                <Text style={styles.buttonTitle}>cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    animation: {
        width: '100%',
        height: 250
    },
    box: {
        width: '100%',
        paddingLeft: 36,
        paddingRight: 36
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        height: 54,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        width: '100%',
        height: 34,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    screenWidthHeight: {
        width: windowWidth,
        height: windowHeight
    }
});
