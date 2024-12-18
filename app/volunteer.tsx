import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { get_orders } from "@/services/order_service";
import { get_users } from "@/services/user_service";
import { Order } from "@/types/order";
import { format, parseISO } from "date-fns";
import { CATEGORY_MAP } from "@/constants/Categories";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type OrderWithLocation = Order & {
  latitude: number;
  longitude: number;
};

export default function VolunteerView() {
  const { data: ordersData } = useQuery({
    queryKey: ["all_orders"],
    queryFn: async () => await get_orders(),
  });
  const { data: usersData } = useQuery({
    queryKey: ["all_users"],
    queryFn: async () => await get_users(),
  });

  const [sortBy, setSortBy] = useState<"date" | "distance">("date");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  useEffect(() => {
    (async () => {
      // Request foreground permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };
      setLocation(region);
      setInitialRegion(region); // Store initial region
    })();
  }, []);

  const mapRef = React.useRef<MapView | null>(null);

  const centerMapOnPerson = (person: User) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: person.latitude ?? 0,
        longitude: person.longitude ?? 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    setSelectedPerson(person ?? null);
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
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
    if (initialRegion) {
      setLocation(initialRegion); // Reset map to initial region
    }
  };

  const sortedData = ordersData
    ?.map((order) => {
      const user = usersData?.find((user) => user.id === order.senior_id);
      const distance = location
        ? calculateDistance(
            location.latitude,
            location.longitude,
            user?.latitude ?? 0,
            user?.longitude ?? 0
          )
        : 0;
      return {
        ...user,
        ...order,
        distance,
      };
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(a.valid_since ?? 0).getTime() -
          new Date(b.valid_since ?? 0).getTime()
        );
      }
      if (sortBy === "distance") {
        return a.distance - b.distance;
      }
      return 0;
    });

  return (
    <SafeAreaView style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.0647,
          longitude: 19.945,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        region={
          location || {
            latitude: 50.0647,
            longitude: 19.945,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }
        }
        onPress={handleMapPress} // Detect map clicks
        showsUserLocation={true}
        ref={mapRef}
      >
        {sortedData &&
          sortedData
            .filter(
              (data) =>
                !(
                  data.id !== selectedPerson?.id
                )
            )
            .map((data, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: data.latitude ?? 0,
                  longitude: data.longitude ?? 0,
                }}
                onPress={() => {
                  setSelectedPerson((data as User) ?? null);
                  centerMapOnPerson(data as User);
                }}
              >
                <View style={styles.customMarker}>
                  <Image
                    source={{ uri: data.image_url ?? "" }}
                    style={[
                      styles.markerImage,
                      selectedPerson?.id === data?.id &&
                        styles.selectedMarkerImage,
                    ]}
                  />
                </View>
              </Marker>
            ))}
      </MapView>
      <ScrollView
        persistentScrollbar={true}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
      >
        {sortedData &&
          sortedData.map((data, index) => {
            // @ts-ignore
            const { name, icon } = CATEGORY_MAP[data.category];

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.block,
                  selectedPerson?.id === data?.id && styles.selectedBlock,
                ]}
                onPress={() => centerMapOnPerson(data as User)}
              >
                <Image
                  source={{ uri: data.image_url ?? "" }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>
                    {(data.first_name ?? "") + " " + (data.last_name ?? "")}
                  </Text>
                  <Text style={styles.textSmall}>
                    Odległość: {data.distance.toFixed(2) + " km"}
                  </Text>
                  <Text style={styles.textSmall}>
                    Prośba: {name} {icon}
                  </Text>
                  <Text style={styles.textSmall}>
                    Kiedy: {data.valid_since && format(parseISO(data.valid_since) , "Pp")}
                  </Text>
                </View>
                {selectedPerson?.id === data.id && (
                  <Link href={`/volunteer/${data.id}`} asChild>
                    <TouchableOpacity>
                      <Ionicons
                        name="eye-outline"
                        size={32}
                        color={"#0080ff"}
                      />
                    </TouchableOpacity>
                  </Link>
                )}
              </TouchableOpacity>
            );
          })}
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
    padding: 8,
    backgroundColor: "#fff",
  },
  customMarker: {
    alignItems: "center",
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#3b82f6",
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
    borderColor: "#10b981",
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 16,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
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
    gap: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 14,
    color: "#4b5563",
  },
});
