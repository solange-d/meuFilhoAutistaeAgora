import { CalendarEvent } from '@/types/types';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchGoogleCalendarEvents } from '../../Service/googleCalendarService';
import { Colors } from '../../constants/Colors';
import DistanceSlider from '../components/DistanceSlider';

export default function CalendarView() {
  const [events, setEvents] = useState<(CalendarEvent & { distance: string })[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [radius, setRadius] = useState(50);

  useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);

    const allEvents = await fetchGoogleCalendarEvents();
    const now = new Date();

    const filteredEvents = await Promise.all(
      allEvents.map(async (event: CalendarEvent) => {
        if (!event.location) return null;

        const eventDate = event.start?.dateTime
          ? new Date(event.start.dateTime)
          : new Date(`${event.start.date}T23:59:59`);

        if (eventDate.getTime() < now.getTime()) return null;

        try {
          const geo = await Location.geocodeAsync(event.location);
          if (!geo.length) return null;

          const dist = getDistance(
            { latitude: loc.coords.latitude, longitude: loc.coords.longitude },
            { latitude: geo[0].latitude, longitude: geo[0].longitude }
          );

          if (radius === 0 || dist <= radius * 1000) {
            return {
              ...event,
              distance: (dist / 1000).toFixed(1) + ' km',
            };
          }
        } catch (e) {
          return null;
        }
        return null;
      })
    );

    setEvents(filteredEvents.filter(Boolean));
  })();
}, [radius]);


  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.summary}</Text>
      <Text>{item.start?.dateTime?.replace('T', ' ').substring(0, 16) || item.start?.date}</Text>
      <Text>{item.location}</Text>
      <Text>Distância: {item.distance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventos próximos</Text>
      <Text style={styles.filter}>Defina o raio de distância dos eventos de interesse:</Text>

      <DistanceSlider value={radius} onValueChange={setRadius} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, backgroundColor: Colors.background },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12, color: Colors.textPrimary },
  filter: { fontSize: 16, textAlign: 'left', padding: 16, color: Colors.textPrimary },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
});
