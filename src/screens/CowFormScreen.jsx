import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveCow } from '../store/cowSlice';

export default function CowFormScreen({ navigation }) {
  const dispatch = useDispatch();
  const [earTag, setEarTag] = useState('');
  const [sex, setSex] = useState('');
  const [pen, setPen] = useState('');
  const [status, setStatus] = useState('Active');
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    if (!earTag || !sex || !pen) return alert('Ear tag, sex, and pen are required');
    const now = new Date().toISOString();

    dispatch(saveCow({ earTag, sex, pen, status, weight: weight ? Number(weight) : null, lastEvent: now, events: [now] }));
    navigation.goBack();
  };

 const isDisabled = !earTag.trim() || !sex.trim() || !pen.trim();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.label}>Ear Tag *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ear tag"
        value={earTag}
        onChangeText={setEarTag}
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />

      <Text style={styles.label}>Sex *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter sex (Male/Female)"
        value={sex}
        onChangeText={setSex}
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />

      <Text style={styles.label}>Pen *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pen"
        value={pen}
        onChangeText={setPen}
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter status"
        value={status}
        onChangeText={setStatus}
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        autoCorrect={false}
        autoComplete="off" 
        spellCheck={false} 
      />

      <TouchableOpacity 
        style={[styles.button, isDisabled && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={isDisabled}>
        <Text style={styles.buttonText}>Save Cow</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2
  },
    buttonDisabled: {
    backgroundColor: '#999'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
