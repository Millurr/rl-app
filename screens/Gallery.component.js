import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Dimensions,
    FlatList,
    InteractionManager,
    TouchableHighlight,
    Modal,
    Alert
} from 'react-native';
import firebase from '../db/firebase';
import NavBar from './Layouts/NavBar.component';
import ImageZoom from 'react-native-image-pan-zoom';

const admin = false

const rootRef = firebase
    .database()
    .ref();
const imagesRef = rootRef.child('images')

const window = Dimensions.get('window');

export default function GalleryScreen({navigation}) {

    const [images,
        setImages] = useState([]);
    const [url,
        setUrl] = useState('');
    const [modalVisible,
        setModalVisible] = useState(false);

    const getList = () => {
        imagesRef.on('value', (childSnapshot) => {
            const images = [];

            childSnapshot.forEach((doc) => {
                images.push({
                    key: doc.key,
                    url: doc
                        .toJSON()
                        .url
                });

                setImages(images);
            });
        });
    }

    useEffect(() => {
        getList();
    });

    const setModal = () => {
      setModalVisible(!modalVisible);
    }

    return (
        <View style={styles.container}>
            <NavBar title={'Gallery'} navigation={navigation}/> 
            {/* this is what displays the images in full screen after one has been clicked */}
            {/* <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                setModal()
            }}
                supportedOrientations={['portrait', 'landscape']}>

                <View
                    style={{
                    backgroundColor: '#000000',
                    flex: 1
                }}>
                    <ImageZoom
                        cropWidth={Dimensions
                        .get('window')
                        .width}
                        cropHeight={Dimensions
                        .get('window')
                        .height}
                        imageWidth={window.width}
                        imageHeight={window.height}
                        enableSwipeDown={true}
                        minScale={1}
                        maxScale={4}
                        onSwipeDown=
                        {()=> { setModal() }}
                        swipeDownThreshold={100}>
                        <Image
                            style={{
                            width: 100 + '%',
                            height: 100 + '%'
                        }}
                            source={{
                            uri: getImage()
                        }}
                            resizeMode="contain"/>
                    </ImageZoom>
                </View>
                <View
                    style={{
                    position: 'absolute',
                    width: window.width,
                    bottom: 0,
                    flex: 1
                }}>
                    <Text
                        style={{
                        fontSize: 16,
                        alignSelf: 'center',
                        color: '#FFFFFF',
                        marginBottom: 2
                    }}>swipe down to close</Text>

                    <Icon
                        name='md-arrow-dropdown-circle'
                        style={{
                        alignSelf: 'center',
                        color: '#FFF'
                    }}/>
                </View>
            </Modal> */}
            {/*
                    This page needs an image grid, or carousel
                */}
            <FlatList
                numColumns={2}
                data={images}
                renderItem={({item, index}) => (
                // <TouchableHighlight
                //     onPress=
                //     {()=> { setImage(item.url) 
                //             setModal() }}>
                    <Image
                        style={styles.img}
                        source={{
                        uri: item.url
                    }}/>
                // {/* </TouchableHighlight> */}
            )}
                keyExtractor={(item, index) => index.toString()}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    gridItm: {},
    img: {
        width: window.width / 2,
        height: window.height / 3
    }
});
