import {View, Text, StyleSheet} from "react-native";

export default function Timer({time}){
    const formattedTime = `${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60)
        .toString()
        .padStart(2, "0")}`
    return(
        <View style={styles.container}>
            <Text style={styles.timer}>{formattedTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#F2F2F2",
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center'
    },
    timer:{
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: "#333333"
    }
})