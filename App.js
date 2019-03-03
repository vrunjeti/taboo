import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Constants } from 'expo'

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card {...tabooData[0]} />
      </View>
    )
  }
}

const Card = ({ word, hints }) => {
  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.wordContainer}>
        <Text style={cardStyles.word}>{word}</Text>
      </View>
      <View style={cardStyles.hints}>
        {hints.map(hint => (
          <View key={hint} style={cardStyles.hintContainer}>
            <Text style={cardStyles.hint}>{hint}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const cardStyles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#78C0A8',
    alignItems: 'stretch'
  },
  wordContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  word: {
    fontSize: 84
  },
  hints: {
    flex: 7,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#eee',
    margin: 32,
    borderRadius: 16
  },
  hintContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 16,
    borderRadius: 16,
    borderColor: '#ddd'
  },
  hint: {
    fontSize: 36
  }
})

const tabooData = [
  {
    word: 'react',
    hints: ['javascript', 'native', 'web', 'code', 'facebook']
  },
  {
    word: 'plant',
    hints: ['green', 'living', 'tree', 'bush', 'leaf']
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  }
})

export default App
