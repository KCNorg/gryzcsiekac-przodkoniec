import React from 'react';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { get_order, update_order } from '@/services/order_service';
import { get_user } from '@/services/user_service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from '@/components/Loader';
import { CATEGORY_MAP } from '@/constants/Categories';
import { format, parseISO } from 'date-fns';

const VolunteerScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: orderData, isLoading: isOrderLoading } = useQuery({
    queryKey: ['order', parseInt(id)],
    queryFn: async () => await get_order(parseInt(id)),
  });

  const seniorId = orderData?.senior_id;
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', seniorId],
    queryFn: async () => await get_user(seniorId),
    enabled: !!seniorId,
  });

  const mutation = useMutation({
    mutationFn: async () => await update_order(parseInt(id), { status: 'accepted' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['order', parseInt(id)]);
    },
  });

  const handleAcceptOrder = () => {
    mutation.mutate();
  };

  if (isOrderLoading || isUserLoading) {
    return <Loader />;
  }

  const { name, icon } = CATEGORY_MAP[orderData.category];
  const address = userData?.address;

  const parseDescription = () => {
    if (orderData?.category === 'groceries') {
      return (
        <>
          <Text style={styles.title}>Lista zakupów</Text>
          {orderData?.description?.data.map((item: any) => (
            <View key={item.id} style={styles.section}>
              <Text style={styles.label}>{item.text}</Text>
            </View>
          ))}
        </>
      );
    }
    return <Text style={styles.label}>{JSON.stringify(orderData?.description)}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Proszący</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Imię i nazwisko:</Text>
          <Text style={styles.value}>{userData?.first_name} {userData?.last_name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Numer telefonu:</Text>
          <Text style={styles.value}>{userData?.phone_number}</Text>
        </View>
        <View style={styles.section}>
          <Image source={{ uri: userData?.image_url }} style={styles.image} />
        </View>
        <Text style={styles.title}>Szczegóły Prośby</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Kategoria:</Text>
          <Text style={styles.value}>{name} {icon}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Adres:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Kiedy:</Text>
          <Text style={styles.value}>{format(parseISO(orderData?.valid_since ?? ""), "Pp")}</Text>
        </View>
        <View style={styles.section}>
          {parseDescription()}
        </View>
        <Button title="Przyjmij" onPress={handleAcceptOrder} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default VolunteerScreen;