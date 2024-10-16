import { View, Text, TextInput, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import React, { useReducer, useState } from 'react';

const initialState = []

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now().toString(), text: action.payload }]
    case 'REMOVE_TASK':
      return state.filter((todo) => todo.id !== action.payload)
    default:
      return state
  }
}

export default function ToDO() {
  const [todos, dispatch] = useReducer(reducer, initialState)
  const [text, setText] = useState('')


  const addTask = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: text })
      setText('')
    }
  };


  const removeTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder='Add new task'
      />
      <Button title="Save" onPress={addTask} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeTask(item.id)}>
            <Text style={styles.todoItem}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20
  },
  input: {
    padding: 10,
    marginBottom: 10
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 5
  },
});
