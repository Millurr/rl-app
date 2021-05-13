import React from 'react';
import {
    StyleSheet,
    Dimensions,
    Platform,
    Image,
    Linking
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Body,
    Footer,
    Icon
} from 'native-base'
import {createDrawerNavigator, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Amenities from './screens/Amenities.component';
import Gallery from './screens/Gallery.component';
import GeneralInfo from './screens/GeneralInfo.component';
import Events from './screens/Events.component';
import Home from './screens/Home.component';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContentOptions={{
                inactiveTintColor: 'white',
                activeTintColor: '#051119',
                labelStyle: {
                    fontFamily: Platform.OS === 'android'
                        ? 'serif'
                        : 'Baskerville-Bold',
                    fontSize: .04 * Dimensions
                        .get('window')
                        .width
                }
            }}
                drawerPosition='left'
                drawerStyle={styles.drawerStyle}
                drawerContent={(props) => <CustomDrawerContentComponent {...props}/>}>
                <Drawer.Screen name="Home" component={Home}/>
                <Drawer.Screen name="Gallery" component={Gallery}/>
                <Drawer.Screen name="Amenities" component={Amenities}/>
                <Drawer.Screen name="General Info" component={GeneralInfo}/>
                <Drawer.Screen name="Events" component={Events}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const pressCall = () => {
    const url = 'tel://+19855206600';
    Linking.openURL(url);
}

const pressMail = () => {
    const url = 'mailto:info@reunionlakerv.com';
    Linking.openURL(url);
}

const pressMap = () => {
    const url = Platform.select({ios: 'http://maps.apple.com/?ll=30.4848417,-90.3344392', android: 'geo:30.4848417,-90.3344392'})
    Linking.openURL(url)
}

//view style changes the settings of the upper part of drawer menu
const CustomDrawerContentComponent = (props) => (

    <Container>
        <Header
            style={{
            height: 175,
            backgroundColor: '#184a6d',
            borderBottomColor: 'transparent'
        }}>
            <Body>
                <Image style={styles.drawerImage} source={require('./assets/logo-white.png')}/>
            </Body>
        </Header>
        <Content style={styles.drawerStyle}>
            <DrawerItemList{...props}/>
        </Content>
        <Footer
            style={{
            backgroundColor: '#184a6d',
            borderColor: 'transparent',
            justifyContent: 'space-around'
        }}>
            <Icon
                name='ios-call'
                onPress={() => pressCall()}
                style={{
                marginLeft: 3 + '%',
                marginTop: 3 + '%',
                color: 'white'
            }}/>
            <Icon
                name='md-mail'
                onPress={() => pressMail()}
                style={{
                marginLeft: 3 + '%',
                marginTop: 3 + '%',
                color: 'white'
            }}/>
            <Icon
                name='md-map'
                onPress={() => pressMap()}
                style={{
                marginLeft: 3 + '%',
                marginTop: 3 + '%',
                color: 'white'
            }}/>

        </Footer>
    </Container>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawerImage: {
        height: 45,
        width: 250
    },
    drawerStyle: {
        backgroundColor: '#184a6d',
        marginTop: 0
    }
});