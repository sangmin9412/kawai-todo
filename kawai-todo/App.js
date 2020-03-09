import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput,
  ScrollView,
  Dimensions,
  Platform, 
  AsyncStorage
} from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';
import uuidv1 from "uuid/v1";

const {width} = Dimensions.get("window")

export default function App() {
  useEffect(() => {
    _loadToDos()
  }, [])
  const [newToDo, setNewToDo] = useState("")
  const [loadedToDos, setLoadedToDos] = useState(false)
  const [newState, setNewState] = useState({})

  const _controllNewToDo = (text) => {
    setNewToDo(text)
  }

  const _loadToDos = async () => {
    try{
      const toDos = await AsyncStorage.getItem("toDos")
      const parsedToDos = JSON.parse(toDos)
      console.log(parsedToDos)
      setLoadedToDos((loadedToDos) => {
        return loadedToDos = true
      })
      setNewState( ( { ...newState } ) => {
        newState = {
          toDos: {
            ...parsedToDos
          }
        }
        return { ...newState }
      })
    } catch(err) {
      console.log(err)
    }
  }

  const _addToDo = () => {
    if (newToDo !== "") {
      const ID = uuidv1();
      const newToDoObject = {
        [ID]: {
          id: ID,
          isComplated: false,
          text: newToDo,
          createdAt: Date.now()
        }
      }
      setNewToDo(newToDo => newToDo = "");
      return (
        // setNewState({
        //   ...newState, 
        //   toDos:{
        //     ...newState.toDos,
        //     ...newToDoObject
        // }})
        setNewState( ( { ...newState } ) => {
          newState = {
            ...newState,
            toDos: {
              ...newState.toDos,
              ...newToDoObject
            }
          }
          _saveToDos(newState.toDos)
          return { ...newState }
        })
      )
    }
  }

  const _deleteToDo = (id) => {
    return (
      setNewState( ( { ...newState } ) => {
        delete newState.toDos[id]
        newState = {
          ...newState,
          toDos: {
            ...newState.toDos
          }
        }
        _saveToDos(newState.toDos)
        return { ...newState }
      })
    )
  }

  const _uncompleteToDo = (id) => {
    return (
      setNewState( ( { ...newState } ) => {
        newState = {
          ...newState,
          toDos: {
            ...newState.toDos,
            [id]: {
              ...newState.toDos[id],
              isComplated: false
            }
          }
        }
        _saveToDos(newState.toDos)
        return { ...newState }
      })
    )
  }
  
  const _completeToDo = (id) => {
    return (
      setNewState( ( { ...newState } ) => {
        newState = {
          ...newState,
          toDos: {
            ...newState.toDos,
            [id]: {
              ...newState.toDos[id],
              isComplated: true
            }
          }
        }
        _saveToDos(newState.toDos)
        return { ...newState }
      })
    )
  }

  const _updateToDo = (id, text) => {
    return (
      setNewState( ( { ...newState } ) => {
        newState = {
          ...newState,
          toDos: {
            ...newState.toDos,
            [id]: {
              ...newState.toDos[id],
              text: text
            }
          }
        }
        _saveToDos(newState.toDos)
        return { ...newState }
      })
    )
  }

  const _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos))
  }

  // console.log(Object.values(newState));

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
          {(newState.toDos) ? Object.values(newState.toDos)
          .reverse()
          .map(
            toDo => 
            <ToDo 
            key={toDo.id} 
            delete={_deleteToDo} 
            uncompleteToDo={_uncompleteToDo} 
            completeToDo={_completeToDo} 
            updateToDo={_updateToDo}
            {...toDo}/> 
          ) : <Text style={styles.none}>To Do List Not Defined</Text>}
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
  },
  none: {
    padding: 20,
    fontSize: 20
  }
});
