import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({
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
    padding: 20,
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
  map: {
    height: '100%',
    width: '100%',
  },
})


export default function App() {
  const sheetRef = useRef(null);

  const renderContent = () => (
      <View style={styles.panel}>
        <Image style={styles.map} source={require('./assets/map-bg.jpg')}/>
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

