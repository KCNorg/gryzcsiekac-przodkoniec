import React, { useState, useEffect } from "react";
import {
StyleSheet,
Text,
View,
Image,
TouchableOpacity,
Modal,
ScrollView,
SafeAreaView
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

type Elder = {
name: string;
distance: string;
requests: string;
date: string;
image: string;
latitude: number;
longitude: number;
};

const elderData: Elder[] = [
{
  name: "Jan Kowalski",
  distance: "0 km",
  requests: "Zakupy spożywcze",
  date: "2023-10-01",
  image: "https://images.unsplash.com/photo-1534954553104-88cb75be7648?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  latitude: 50.0647,
  longitude: 19.945,
},
{
  name: "Anna Nowak",
  distance: "0 km",
  requests: "Pomoc w sprzątaniu",
  date: "2023-10-02",
  image: "https://images.unsplash.com/photo-1534954553104-88cb75be7648?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  latitude: 50.0747,
  longitude: 19.955,
},
{
  name: "Piotr Wiśniewski",
  distance: "0 km",
  requests: "Wizyta towarzyska",
  date: "2023-10-03",
  image: "https://images.unsplash.com/photo-1534954553104-88cb75be7648?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  latitude: 50.0747,
  longitude: 19.935,
},
{
  name: "Piotr TEst",
  distance: "0 km",
  requests: "Wizyta towarzyska",
  date: "2023-10-03",
  image: "https://images.unsplash.com/photo-1534954553104-88cb75be7648?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  latitude: 50.0647,
  longitude: 19.935,
},
{
  name: "Piotr Marek",
  distance: "0 km",
  requests: "Wizyta towarzyska",
  date: "2023-10-03",
  image: "https://images.unsplash.com/photo-1534954553104-88cb75be7648?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  latitude: 50.0547,
  longitude: 19.935,
},
];

export default function Page() {
const [sortBy, setSortBy] = useState<"date" | "distance">("date");
const [modalVisible, setModalVisible] = useState(false);
const [selectedPerson, setSelectedPerson] = useState<Elder | null>(null);
const [location, setLocation] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | null>(null);
  const [initialRegion, setInitialRegion] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | null>(null);
useEffect(() => {
  (async () => {
    // Request foreground permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    console.log("XD")
    // Get current location
    let currentLocation = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    setLocation(region);
    setInitialRegion(region); // Store initial region
  })();
}, []);

const mapRef = React.useRef<MapView | null>(null);

const centerMapOnPerson = (elder: Elder) => {
  if (mapRef.current) {
    console.log("Centering map on:", elder);
    mapRef.current.animateToRegion({
      latitude: elder.latitude,
      longitude: elder.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }
  setSelectedPerson(elder);
};

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  console.log("Calculating distance");
  console.log(lat1, lon1, lat2, lon2);
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const handleMapPress = () => {
  console.log("Map clicked");
  if (initialRegion) {
    setLocation(initialRegion); // Reset map to initial region
  }
};

const sortedData = elderData
  .map((elder) => ({
    ...elder,
    distance: location
      ? calculateDistance(
          location.latitude,
          location.longitude,
          elder.latitude,
          elder.longitude
        ).toFixed(2) + " km"
      : "0 km",
  }))
  .sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortBy === "distance") {
      return parseFloat(a.distance) - parseFloat(b.distance);
    }
    return 0;
  });

return (
  <SafeAreaView  style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.0647,
          longitude: 19.945,
          latitudeDelta: 0.10,
          longitudeDelta: 0.10,
        }}
        region={location || {
          latitude: 50.0647,
          longitude: 19.945,
          latitudeDelta: 0.10,
          longitudeDelta: 0.10,
        }}
        onPress={handleMapPress} // Detect map clicks
        showsUserLocation={true}
        ref = {mapRef}
      >
        {sortedData.map((elder, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: elder.latitude,
              longitude: elder.longitude,
            }}
            onPress={() => {
              setSelectedPerson(elder)
              centerMapOnPerson(elder)
            }}
          >
            <View style={styles.customMarker}>
              <Image
              source={{ uri: elder.image }}
              style={[
                styles.markerImage,
                selectedPerson?.name === elder.name && styles.selectedMarkerImage,
              ]}
              />
            </View>
          </Marker>
        ))}
        {/* {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Twoja lokalizacja"
            pinColor="blue"
          >
            <View style={styles.customMarker}>
              <Image
              source={{ uri: "https://plus.unsplash.com/premium_photo-1664391651999-3e9a1cb09a9d?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
              style={[
                styles.yourLocalisation
              ]}
              />
            </View>
          </Marker>
        )} */}
      </MapView>

      {/* Lista */}
      <ScrollView persistentScrollbar={true}
  style={styles.list}
  keyboardShouldPersistTaps="handled"
  alwaysBounceVertical={false}>
          {sortedData.map((elder, index) => (
         <TouchableOpacity
         key={index}
         style={[
           styles.block,
           selectedPerson?.name === elder.name && styles.selectedBlock,
         ]}
         onPress={() => centerMapOnPerson(elder)}
       >
            <Image source={{ uri: elder.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{elder.name}</Text>
              <Text style={styles.distance}>Odległość: {elder.distance}</Text>
              <Text style={styles.requests}>Prośba: {elder.requests}</Text>
              <Text style={styles.date}>Data: {elder.date}</Text>
            </View>
            {selectedPerson?.name === elder.name && (
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Zatwierdź</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
map: {
  flex: 1,
  width: "100%",
},
list: {
  flex: 1,
  padding: 16,
  backgroundColor: "#fff",
},
customMarker: {
  alignItems: "center",
},
confirmButton: {
  padding: 8,
  backgroundColor: "#007BFF",
  borderRadius: 4,
},
confirmButtonText: {
  color: "#fff",
  fontSize: 14,
},
markerImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: "#007BFF",
},
yourLocalisation: {
  width: 60,
  height: 60,
  borderRadius: 30,
  borderWidth: 4,
  borderColor: "red",
},
selectedMarkerImage: {
  width: 70,
  height: 70,
  borderRadius: 35,
  borderWidth: 2,
  borderColor: "yellow",
},
block: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 16,
  padding: 12,
  borderRadius: 8,
  backgroundColor: "#f4f4f4",
},
selectedBlock: {
  backgroundColor: "#d0e8ff",
},
image: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginRight: 12,
},
textContainer: {
  flex: 1,
},
name: {
  fontSize: 16,
  fontWeight: "bold",
},
distance: {
  fontSize: 14,
  color: "#555",
},
requests: {
  fontSize: 14,
  color: "#555",
},
date: {
  fontSize: 12,
  color: "#888",
},
});
