import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

export default function CowDetailScreen({ route }) {
  const { earTag } = route.params;
  const cow = useSelector(state => state.cow.cows.find(c => c.earTag === earTag));

  if (!cow) return (
    <View style={styles.center}>
      <Text style={styles.notFoundText}>Cow not found</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Basic Information</Text>
        <Text style={styles.label}>Tag: <Text style={styles.value}>{cow.earTag}</Text></Text>
        <Text style={styles.label}>Sex: <Text style={styles.value}>{cow.sex}</Text></Text>
        <Text style={styles.label}>Pen: <Text style={styles.value}>{cow.pen}</Text></Text>
        <Text style={styles.label}>Status: <Text style={styles.value}>{cow.status}</Text></Text>
        <Text style={styles.label}>Weight: <Text style={styles.value}>{cow.weight ?? 'N/A'}</Text></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Recent Events</Text>
         <FlatList
            data={cow.events ?? []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                const dateStr = item ? new Date(item).toLocaleString() : '';
                return <Text style={styles.eventItem}>• {dateStr}</Text>;
            }}
            ListEmptyComponent={<Text style={styles.noEvents}>No events yet</Text>}
         />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555'
  },
  value: {
    fontWeight: '600',
    color: '#000'
  },
  eventItem: {
    fontSize: 14,
    paddingVertical: 4,
    color: '#444'
  },
  noEvents: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFoundText: {
    fontSize: 16,
    color: 'red'
  }
});
