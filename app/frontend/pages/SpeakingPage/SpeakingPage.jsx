import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios'; // Import Axios

import defaultTheme from '../../theme';
import HeaderLearningPage from '../../components/Header/HeaderLearningPage';

export default function SpeakingPage() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
        
      }
    } catch (err) {}
  }

  async function stopRecording() {
    setRecording(undefined); 

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    const score = await sendRecordingToBackend(recording.getURI())
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(), 
      score: score
    });
    setRecordings(allRecordings);
    console.log('URI', recording.getURI())
  }
  async function sendRecordingToBackend(audioUri) {
    //let apiUrl = 'http://192.168.1.10:8082/upload_audio'
    let apiUrl = 'http://14.161.10.40:14024/uploadfile/'
    let uriParts = audioUri.split('.')
    let fileType = uriParts[uriParts.length - 1]
    /*try*/ {
      const formData = new FormData();
      formData.append('input', {
        uri: audioUri,
        type: `audio/x-${fileType}`, // Adjust the type based on your audio format
        name: `recording.${fileType}`, // Adjust the name accordingly
      });

      console.log('Sending recording to backend:', formData);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.transcribe)
      return response.data.transcribe

      console.log('Recording sent successfully:', response.time_elapsed);
    } /*catch (error) {
      console.error('Error sending recording to backend:', error);
    } */
  }
  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration} | Score: {recordingLine.score}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([])
  }

  return (
    <View style={{...defaultTheme.defaultPage}}>
      <HeaderLearningPage name = 'Speaking'/>
      <View style = {{...defaultTheme.basic}}>
        <Text style = {{color: defaultTheme.colors.word, fontWeight: defaultTheme.fontWeight.bold, fontSize: defaultTheme.typography.large}}>How to use?</Text>
        <Text style = {{color: defaultTheme.colors.word}}>Click the "Start Recording" button</Text>
        <Text style = {{color: defaultTheme.colors.word}}>Then, say any English sentence. </Text>
        <Text style = {{color: defaultTheme.colors.word}}>Click the "Stop recording" button when you finish  </Text>
        <Text style = {{color: defaultTheme.colors.word}}>We will provide a score depends on your pronunciation</Text>
      </View>
      <Button title={recording ? 'Stop Recording' : 'Start Recording\n\n\n'} onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <Button title={recordings.length > 0 ? '\n\n\nClear Recordings' : ''} onPress={clearRecordings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40,

  },
  fill: {
    flex: 1,
    margin: 15,
    color: 'white'
  }
});