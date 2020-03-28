import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const waterlist = [
    { id: 100, title: '100ml' },
    { id: 150, title: '150ml' },
    { id: 240, title: '240ml' },
    { id: 250, title: '250ml' },
    { id: 300, title: '300ml' },
    { id: 400, title: '400ml' },
    { id: 500, title: '500ml' },
    { id: 600, title: '600ml' },
    { id: 700, title: '700ml' },
    { id: 800, title: '800ml' },
    { id: 1000, title: '1000ml' },
]

export default class MainScren extends React.Component {

    state = {
        personKg: 0,
        quantityWaterDrink: 0
    }

    async componentDidMount() {
        this.animation.play();
        try {
            const value = await AsyncStorage.getItem('@BebaAgua:personKg');
            if (value !== null) {
                this.setState({ personKg: Number(value) })
            } else {
                this.props.navigation.navigate('RegisterScreen')
                console.log("Valor de KG veio nulo!!!!")
            }

            const quantity = await AsyncStorage.getItem('@BebaAgua:quantityWaterDrink');
            if (quantity !== null) {
                this.setState({ quantityWaterDrink: Number(quantity) })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async drankWater(quantity) {
        try {
            const total = this.state.quantityWaterDrink + quantity;
            await AsyncStorage.setItem('@BebaAgua:quantityWaterDrink', String(total));
            this.setState({ quantityWaterDrink: total })
        } catch (error) {
            console.log(error);
        }
    }

    async resetDrank() {
        try {
            await AsyncStorage.setItem('@BebaAgua:quantityWaterDrink', String("0"));
            this.setState({ quantityWaterDrink: 0 })
            Alert.alert(
                'Parabéns',
                'Seu dia foi resetado com sucesso!',
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: true }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async resetAll() {
        try {
            AsyncStorage.clear();
            this.props.navigation.navigate('RegisterScreen')
        } catch (error) {
            console.log(error);
        }
    }

    returnTotalDrank() {
        const total = this.state.quantityWaterDrink / 1000;
        if (total < 1) {
            return `${this.state.quantityWaterDrink} ml`
        }
        else if (total == 1) {
            return `${total} litro`
        } else {
            return `${total} litros`
        }
    }

    render() {

        const { personKg } = this.state;

        return (
            <ScrollView>
                <SafeAreaView style={styles.screenWidthHeight}>
                    <View style={styles.container}>
                        <LottieView
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={styles.animation}
                            source={require('../../assets/drink.json')}
                            autoSize={false}
                        />
                        <View style={{ width: '100%', flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ textAlign: 'left' }
                            } >
                                Quantidade de KG: {personKg}
                            </Text>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => this.resetAll()}>
                                <Text style={{ fontWeight: 'bold', color: '#1EB1F5' }}>
                                    resetar
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.qtdTitle}>Quantidade de água em litros:</Text>
                        <Text style={styles.text}>
                            {(personKg * 35) / 1000} / dia
                        </Text>
                        <Text style={styles.qtdTitle}>Quantidade de água que tomou no dia:</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ textAlign: 'left' }
                            } >
                                {this.returnTotalDrank()}
                            </Text>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => this.resetDrank()}>
                                <Text style={{ fontWeight: 'bold', color: '#1EB1F5' }}>
                                    resetar
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.qtdTitle}>Informe o que bebeu:</Text>

                        <View style={{ height: 100, marginTop: 20 }}>
                            <FlatList
                                data={waterlist}
                                renderItem={
                                    ({ item }) => (
                                        <TouchableOpacity onPress={() => this.drankWater(item.id)}>
                                            <View style={styles.waterObj}>
                                                <Image
                                                    source={require('../../assets/water.png')}
                                                    style={styles.imageWater}
                                                />
                                                <Text>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                keyExtractor={item => String(item.id)}
                                style={{ flex: 1 }}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    animation: {
        width: '100%',
        height: 250,
        marginBottom: 30,
    },
    screenWidthHeight: {
        width: windowWidth,
        height: windowHeight
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingLeft: 32,
        paddingRight: 32
    },
    text: {
        width: '100%',
        textAlign: 'left',
        marginBottom: 10
    },
    qtdTitle: {
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    imageWater: {
        width: 50,
        height: 50,
    },
    waterObj: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        width: 100,
        height: 90,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#F5F5F5'
    }
});
