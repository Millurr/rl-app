import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableHighlight,
    Platform,
    Dimensions,
    ScrollView
} from 'react-native';
import NavBar from './Layouts/NavBar.component';

const window = Dimensions.get("window");

export default function HomeScreen({navigation}) {

    const goToAmenities = () => {
        navigation.navigate("Amenities")
    }

    const goToEvents = () => {
        navigation.navigate("Events")
    }

    const goToGallery = () => {
        navigation.navigate("Gallery")
    }

    const goToGeneralInfo = () => {
        navigation.navigate("General Info")
    }

    return (
        <View style={styles.container}>
            <NavBar title={'Home'} navigation={navigation}/>

            <ScrollView>
                {/* Image header with description */}
                <ImageBackground 
                    style={styles.imgBackground}
                    resizeMode='cover'
                    source={require('../assets/lazyriver.png')}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.textStyle}>
                            {`Welcome to \n Reunion Lake\u00AE!`.toUpperCase()}
                        </Text>
                        <Text style={styles.welcomeText}>
                            {'Located right off I-12 in Robert,'}
                            {'\n Louisiana, Reunion Lake® is'}
                            {'\n the latest and greatest campground'}
                            {'\n that combines the outdoor fun of'}
                            {'\n a lakeside park with the high-end'}
                            {'\n amenities of a luxury resort. Family-'}
                            {'\n friendly, quiet, and conveniently-'}
                            {'\n located, you won\'t find a better getaway'}
                            {'\n anywhere else in the south.'}
                        </Text>
                    </View>
                </ImageBackground>

                {/* Start of the image grid */}
                <TouchableHighlight style={styles.gridItem} onPress={goToAmenities}>
                    <ImageBackground
                        style={[styles.gridItem, styles.gridItemImg]}
                        blurRadius={2}
                        source={require('./assets/pool.jpg')}
                    >
                        <View style={styles.overlayChild}>
                            <Text style={styles.gridItemText}>
                                {'Amenities'.toUpperCase()}
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>

                <TouchableHighlight style={styles.gridItem} onPress={goToEvents}>
                    <ImageBackground
                        style={[styles.gridItem, styles.gridItemImg]}
                        blurRadius={2}
                        source={require('./assets/lazyriver.jpg')}
                    >
                        <View style={styles.overlayChild}>
                            <Text style={styles.gridItemText}>
                                {'Events'.toUpperCase()}
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>

                <TouchableHighlight style={styles.gridItem} onPress={goToGallery}>
                    <ImageBackground
                        style={[styles.gridItem, styles.gridItemImg]}
                        blurRadius={2}
                        source={require('./assets/drone9.jpg')}
                    >
                        <View style={styles.overlayChild}>
                            <Text style={styles.gridItemText}>
                                {'Gallery'.toUpperCase()}
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>

                <TouchableHighlight style={styles.gridItem} onPress={goToGeneralInfo}>
                    <ImageBackground
                        style={[styles.gridItem, styles.gridItemImg]}
                        blurRadius={2}
                        source={require('./assets/drone14.jpg')}
                    >
                        <View style={styles.overlayChild}>
                            <Text style={styles.gridItemText}>
                                {'General Info'.toUpperCase()}
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    imgBackground: {
        width: window.width,
        marginTop: 0,
        marginBottom: 0,
        minHeight: window.height / 1.5
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(24, 74, 109, 0.8)',
        justifyContent: 'center'
    },
    overlayChild: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center'
    },
    textStyle: {
        color: "#FFFFFF",
        paddingTop: '10%',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: Platform.OS === 'android'
            ? 'serif'
            : 'Baskerville-Bold',
        fontSize: Platform.OS === 'android'
            ? 30
            : 35
    },
    container: {
        flex: 1,
        width: window.width,
        height: window.height
    },
    grid: {
        flex: 1
    },
    gridItem: {
        minHeight: window.height / 3,
        justifyContent: "center",
        marginTop: 3
    },
    gridItemImg: {
        width: window.width
    },
    gridItemText: {
        color: '#FFFFFF',
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: Platform.OS === 'android'
            ? 30
            : 32,
        paddingVertical: 10,
        fontFamily: Platform.OS === 'android'
            ? 'serif'
            : 'Baskerville-Bold'
    },
    welcomeText: {
        color: '#FFF',
        paddingHorizontal: 20,
        paddingTop: '05%',
        paddingBottom: '05%',
        lineHeight: .0375 * window.height,
        textAlign: 'center',
        fontFamily: Platform.OS === 'android'
            ? 'serif'
            : 'Baskerville',
        fontSize: .045 * window.width
    }
});