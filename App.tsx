import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback, ScrollView, Dimensions
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, {Marker} from 'react-native-maps'

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 50.4501;
const LONGITUDE = 30.5234;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  scrollview: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D64933'
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
})

export default function App() {
  const sheetRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })

  const renderContent = () => (
      <View style={styles.panel}>
        <View style={styles.container}>
          <MapView
              provider='google'
              style={StyleSheet.absoluteFill}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              initialRegion={region}
          >
            <Marker
                title="This is a title"
                description="This is a description"
                coordinate={region}
            />
          </MapView>
        </View>
      </View>
  );

  const renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle}/>
        </View>
      </View>
  )

  return (
      <View style={styles.container}>
        <BottomSheet
            ref={sheetRef}
            snapPoints={[500, 250, 250]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={1}
        />
        <TouchableWithoutFeedback onPress={() => {
          if (sheetRef.current !== null) {
            sheetRef.current.snapTo(0)
          }
        }}>
          <View><Text style={styles.message}>The map is on the bottom sheet. Click me.</Text></View>
        </TouchableWithoutFeedback>
      </View>

  );
}

