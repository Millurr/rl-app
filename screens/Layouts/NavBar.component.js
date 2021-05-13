import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    SafeAreaView,
    TouchableHighlight,
    Platform,
    Dimensions,
    ScrollView
} from 'react-native';
import {
    Button,
    Icon,
    Container,
    Header,
    Content,
    Left,
    Right
} from 'native-base';

export default function NavBar({title, navigation}) {

    return (
        <View style={styles.navBar}>
            {/* This is the hamburger icon */}
            <Left>
                <Icon
                    style={styles.navBarIcon}
                    name="menu"
                    onPress={() => navigation.openDrawer()}/>
            </Left>

            {/* Text in the middle of the header */}

            <Text style={styles.navBarHeader}>
                {title.toUpperCase()}
            </Text>

            <Right></Right>
        </View>
    )
}

const styles = StyleSheet.create({
    //this styles the header
    navBar: {
        flexDirection: 'row',
        backgroundColor: '#184a6d',
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    //this styles the hamburger icon
    navBarIcon: {
        color: '#FFFFFF',
        textAlign: 'center',
        width: 50
    },
    //this styles the text inside the header
    navBarHeader: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: Platform.OS === 'android'
            ? 'serif'
            : 'Baskerville-Bold'
    }
});