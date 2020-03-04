import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput,
  ScrollView,
  Dimensions,
  Platform 
} from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';

const {width} = Dimensions.get("window")

export default function App() {
  useEffect(() => {
    _loadToDos()
  }, [])
  const [newToDo, setNewToDo] = useState("")
  const [loadedToDos, setLoadedToDos] = useState(false)

  const _controllNewToDo = (text) => {
    setNewToDo(text)
  }

  const _loadToDos = () => {
    setLoadedToDos((loadedToDos) => {
      return loadedToDos = true
    })
  }

  const _addToDo = () => {
    setNewToDo((newToDo) => {
      if (newToDo !== "") {
        newToDo = ""
      }
    })
  }

  if (!loadedToDos) {
    return (
      <AppLoading></AppLoading>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Kawai To Do</Text>
      <View style={styles.card}>
        <TextInput 
          style={styles.input} 
          placeholder={"New To Do"} 
          value={newToDo} 
          onChangeText={_controllNewToDo} 
          placeholderTextColor={"#999"} 
          returnKeyType={"done"} 
          autoCorrect={false}
          onSubmitEditing={_addToDo} 
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          <ToDo text={"Hello I`m a To Do"} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "normal",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: -1
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
