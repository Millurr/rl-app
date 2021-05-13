import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    SectionList
} from 'react-native';
import NavBar from './Layouts/NavBar.component';
import { format } from 'date-fns';
import _ from 'lodash';

import firebase from '../db/firebase';

//getting references to points in the database
const rootRef = firebase
    .database()
    .ref();
const contactRef = rootRef
    .child('contacts')
    .orderByChild('date');

const SectionListItem = ({event}) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#9ca8bc'
    }}>
      <Text style={styles.eventTxt}>
        {event.event}
      </Text>
      <View style={{backgroundColor: '#4d788c', height: 1, margin: 4, marginLeft: 20, marginRight: 10}}>
      </View>
    </View>
  )
}

const SectionHeader = ({section}) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#2b6187'
    }}>
      <Text style={styles.eventHeader}>
        {format(new Date(section.date), "MMMM do")}
      </Text>
    </View>
  )
}

export default function EventsScreen({navigation}) {
    const [contacts,
        setContacts] = useState([]);

    useEffect(() => {
        contactRef.on('value', (childSnapshot) => {
            let localCont = []

            //iterates through the database for each variable
            childSnapshot.forEach((doc) => {
                var x
                for (x in doc.toJSON().events) {
                    localCont.push({
                        key: doc.key,
                        event: doc
                            .toJSON()
                            .events[x],
                        date: doc
                            .toJSON()
                            .date
                    })
                }
            })

            localCont = _.groupBy(localCont, d => d.date)

            localCont = _.reduce(localCont, (acc, next, index) => {
                acc.push({date: index, data: next})
                return acc
            }, [])

            setContacts(Object.values(localCont))
        })
    }, [])

    return (
        <View style={styles.container}>
          <NavBar title={'Events'} navigation={navigation} />
          <SectionList
            renderItem={({item, index}) => {
              return (
                <SectionListItem event={item} />
              );
            }}
            renderSectionHeader={({section, index}) => {
              return (
                <SectionHeader section={section} />
              );
            }}
            sections={contacts}
            keyExtractor={(item, index) => index}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
    },
    eventTxt: {
        fontSize: 17,
        alignSelf: 'center',
        color: '#ffffff',
        paddingVertical: 16,
        fontFamily: Platform.OS === 'android'
            ? 'serif'
            : 'Baskerville-Bold'
    },
    eventHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        margin: 20,
        fontFamily: Platform.OS === 'android'
            ? 'serif'
            : 'Baskerville-Bold'
    }
});