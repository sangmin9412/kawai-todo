import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window")

export default function ToDo() {
    const [isEditing, setIsEditing] = useState(false);
    const [isComplated, setIsComplated] = useState(false);

    const _toggleComplate = () => {
        setIsComplated((isComplated) => {
            return !isComplated
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
                <Text style={[
                    styles.text,
                    isComplated ? styles.complatedText : styles.uncomplatedText
                    ]}>
                    Hello I`m a To Do
                </Text>
                {isEditing ? (
                    <View>

                    </View>
                ) : (
                    <View>
                        
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        alignItems: "center"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
        color: "#111",
        marginVertical: 20
    },
    complatedText:{
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncomplatedText:{
        color: "#353839"
    }
});