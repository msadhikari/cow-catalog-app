import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setStatusFilter, setPenFilter, saveCow, deleteCow } from '../store/cowSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CowListScreen({ navigation }) {
  const { cows, search, statusFilter, penFilter } = useSelector(state => state.cow);
  const dispatch = useDispatch();

  const filteredCows = cows.filter(cow => 
    cow.earTag.includes(search) &&
    (statusFilter ? cow.status === statusFilter : true) &&
    (penFilter ? cow.pen === penFilter : true)
  );

  const handleDelete = (earTag) => {
    dispatch(deleteCow(earTag));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by Tag"
        value={search}
        onChangeText={text => dispatch(setSearch(text))}
        style={styles.input}
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />
      <TextInput
        placeholder="Filter by Status"
        value={statusFilter}
        onChangeText={text => dispatch(setStatusFilter(text))}
        style={styles.input}
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />
      <TextInput
        placeholder="Filter by Pen"
        value={penFilter}
        onChangeText={text => dispatch(setPenFilter(text))}
        style={styles.input}
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />

      <FlatList
        data={filteredCows}
        keyExtractor={item => item.earTag}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('CowDetail', { earTag: item.earTag })}
          >
            <View style={styles.cardRow}>
              <View>
                <Text style={styles.tagText}>Tag: {item.earTag}</Text>
                <Text>Sex: {item.sex}</Text>
                <Text>Pen: {item.pen}</Text>
                <Text>Status: {item.status}</Text>
                <Text>Last Event: {item.lastEvent ? new Date(item.lastEvent).toLocaleString() : 'N/A'}</Text>
              </View>

              <TouchableOpacity onPress={() => handleDelete(item.earTag)}>
               <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('CowForm')}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tagText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  }
});
