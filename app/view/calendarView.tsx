import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { fetchGoogleCalendarEvents } from '../../Service/googleCalendarService';
import { Colors } from '@/constants/colors';
import { CalendarEvent } from '@/types/types';
import DistanceSlider from '../components/DistanceSlider';

interface CalendarEventWithCoords extends CalendarEvent {
  lat?: number;
  lon?: number;
  distance?: string;
  geocoded: boolean;
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEventWithCoords[]>([]);
  const [allEventsWithCoords, setAllEventsWithCoords] = useState<CalendarEventWithCoords[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [radius, setRadius] = useState(50);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const allEvents = await fetchGoogleCalendarEvents();

      const eventsWithCoords = await Promise.all(
        allEvents.map(async (event: CalendarEvent) => {
          if (!event.location) {
            return { ...event, geocoded: false };
          }
          try {
            const geo = await Location.geocodeAsync(event.location);
            if (geo.length > 0) {
              return {
                ...event,
                lat: geo[0].latitude,
                lon: geo[0].longitude,
                geocoded: true,
              };
            } else {
              console.warn(`Não foi possível geocodificar: ${event.location}`);
              return { ...event, geocoded: false };
            }
          } catch (error) {
            console.warn(`Erro ao geocodificar "${event.location}":`, error);
            return { ...event, geocoded: false };
          }
        })
      );

      setAllEventsWithCoords(eventsWithCoords);
    })();
  }, []);

  useEffect(() => {
  if (!location) return;

  const filtered = allEventsWithCoords.map((event) => {
    if (!event.geocoded || event.lat === undefined || event.lon === undefined) {
      // Se estiver no modo "todos os eventos", inclua mesmo sem geolocalização
      if (radius === 0) {
        return {
          ...event,
          distance: 'localização desconhecida',
        };
      }
      return null; // Senão, descarte
    }

    const dist = getDistance(
      { latitude: location.latitude, longitude: location.longitude },
      { latitude: event.lat, longitude: event.lon }
    );

    if (radius === 0 || dist <= radius * 1000) {
      return {
        ...event,
        distance: (dist / 1000).toFixed(1) + ' km',
      };
    }

    return null;
  }).filter(Boolean) as CalendarEventWithCoords[];

  setEvents(filtered);
}, [radius, location, allEventsWithCoords]);

  const renderItem = ({ item }: { item: CalendarEventWithCoords }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.summary}</Text>
      <Text>{item.start?.dateTime?.replace('T', ' ').substring(0, 16)}</Text>
      <Text>{item.location}</Text>
      {item.distance && <Text>Distância: {item.distance}</Text>}
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
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 32, color: Colors.textPrimary}}>
            Nenhum evento encontrado.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, backgroundColor: Colors.background },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  filter: {
    fontSize: 16,
    textAlign: 'left',
    padding: 16,
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
});
