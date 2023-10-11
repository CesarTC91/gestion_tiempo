import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity
} from 'react-native';
import {useState, useEffect} from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import {Audio} from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"]

export default function App() {
  const [isWorking , setIsWorking] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState("CRONO" | "SHORT" | "BREAK")
  const [isActive, setIsActive] = useState(false)

  const optionsTimes = {
    0: 25,
    1: 5,
    2: 15
  }

  useEffect(() => {
    let interval = null

    if(isActive){
      interval = setInterval(() => {
        setTime(time - 1)
      }, 100)
    }else{
      clearInterval(interval)
    }

    if(time === 0){
      setIsActive(false)
      setTime(optionsTimes[currentTime] *60)
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  function handleStartStop() {
    playSound();
    setIsActive(!isActive)
  }

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
        require("./assets/click.mp3")
    )
    await sound.playAsync()
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]} >
      <View style={{flex:1 ,paddingHorizontal: 15, paddingTop: 10}}>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>Cronometro</Text>
        <Header
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button:{
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius:15
  }
});
