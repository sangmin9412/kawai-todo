import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window")

export default function ToDo(props) {
    useEffect(() => {
        setTodoValue(props.text)
    }, [])

    const [isEditing, setIsEditing] = useState(false)
    // const [isComplated, setIsComplated] = useState(false)
    const [todoValue, setTodoValue] = useState("")
    const id = props.id
    const text = props.text
    const deleteToDo = props.delete
    const isComplated = props.isComplated
    const uncompleteToDo = props.uncompleteToDo
    const completeToDo = props.completeToDo
    const updateToDo = props.updateToDo

    const _toggleComplate = () => {
        // setIsComplated((isComplated) => {
        //     return !isComplated
        // })
        
        if (isComplated) {
            uncompleteToDo(id)
        } else {
            completeToDo(id)
        }
    }
    const _startEditing = () => {
        setIsEditing((isEditing) => {
            return isEditing = true
        })
    }
    const _finishEditing = () => {
        updateToDo(id, todoValue)
        setIsEditing((isEditing) => {
            return isEditing = false
        })
    }

    const _controllInput = (text) => {
        setTodoValue((todoValue) => {
            return todoValue = text
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={_toggleComplate}>
                    <View style={[
                        styles.circle,
                        isComplated ? styles.complatedCircle : styles.uncomplatedCircle
                    ]} />
                </TouchableOpacity>
                {isEditing ? (
                <TextInput style={[
                    styles.text,
                    isComplated ? styles.complatedText : styles.uncomplatedText,
                    styles.input
                ]}
                value={todoValue}
                multiline={true}
                returnKeyType={"done"}
                onChangeText={_controllInput}
                onBlur={_finishEditing}
                autoFocus={true}
                />
                ) : (
                <Text style={[
                    styles.text,
                    isComplated ? styles.complatedText : styles.uncomplatedText
                    ]}>
                    {text}
                </Text>
                )}
            </View>
            {isEditing ? (
            <View style={styles.actions}>
                <TouchableOpacity onPressOut={_finishEditing}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>Suc</Text>
                    </View>
                </TouchableOpacity>
            </View>
            ) : (
            <View style={styles.actions}>
                <TouchableOpacity onPressOut={_startEditing}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>del</Text>
                    </View>
                </TouchableOpacity>
            </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    complatedCircle: {
        borderColor: "#bbb"
    },
    uncomplatedCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 20
    },
    complatedText:{
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncomplatedText:{
        color: "#353839"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        width: width / 2,
        paddingVertical: 5
    }
});