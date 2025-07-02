import { CalendarEvent } from '@/types/types';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fetchGoogleCalendarEvents } from '../../Service/googleCalendarService';
import DistanceSlider from '../components/DistanceSlider';

export default function CalendarView() {
  const [events, setEvents] = useState<(CalendarEvent & { distance: string })[]>([]);
  const [radius, setRadius] = useState(50);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>(null);

  const getEventDate = (event: CalendarEvent) => {
    if (event.start?.dateTime) return new Date(event.start.dateTime);
    if ((event.start as any)?.date) return new Date((event.start as any).date + 'T23:59:59');
    return null;
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

        const allEvents = await fetchGoogleCalendarEvents();
        const now = new Date();

        const geoCache = new Map<string, { latitude: number; longitude: number }>();

        const validEvents = allEvents.filter((event: CalendarEvent) => {
          const eventDate = getEventDate(event);
          return event.location && eventDate && eventDate.getTime() >= now.getTime();
        });

        const processedEvents = await Promise.all(
          validEvents.map(async (event: CalendarEvent) => {
            try {
              if (!event.location) return null;

              let geo = geoCache.get(event.location);
              if (!geo) {
                const geoResult = await Location.geocodeAsync(event.location);
                if (!geoResult.length) return null;
                geo = {
                  latitude: geoResult[0].latitude,
                  longitude: geoResult[0].longitude,
                };
                geoCache.set(event.location, geo);
              }

              const dist = getDistance(
                { latitude: loc.coords.latitude, longitude: loc.coords.longitude },
                geo
              );

              if (radius === 0 || dist <= radius * 1000) {
                return {
                  ...event,
                  distance: (dist / 1000).toFixed(1) + ' km',
                };
              }
            } catch {
              return null;
            }
            return null;
          })
        );

        setEvents(processedEvents.filter(Boolean) as any);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    loadEvents();
  }, [radius]);

  const renderItem = ({ item }: { item: CalendarEvent & { distance: string } }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.summary}</Text>
      <Text>{item.start?.dateTime?.replace('T', ' ').substring(0, 16) || (item.start as any)?.date}</Text>
      <Text>{item.location}</Text>
      <Text>Distância: {item.distance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventos próximos</Text>
      <Text style={styles.filter}>Defina o raio de distância dos eventos de interesse:</Text>

      <DistanceSlider value={radius} onValueChange={setRadius} />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum evento encontrado.</Text>
          }
        />
      )}
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
  title: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  empty: { textAlign: 'center', marginTop: 20, color: Colors.textPrimary },
});
