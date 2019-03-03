import React from 'react'
import { StyleSheet, Text, View, Platform, Button } from 'react-native'
import { Constants } from 'expo'

import allCards from './data.json'

const SECONDS_PER_TURN = 60

const allWords = Object.keys(allCards)

const getRandomInRange = (min, max) => Math.round(Math.random() * max) + min

class App extends React.Component {
  state = {
    score: 0,
    currentCard: { word: allWords[0], hints: allCards[allWords[0]] },
    seenCards: {},
    timer: SECONDS_PER_TURN
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      const { timer } = this.state
      const newRemainingTime = timer - 1
      if (newRemainingTime === 0) {
        this.onWrong()
      } else {
        this.setState(state => ({ timer: state.timer - 1 }))
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  getNextCard = () => {
    const word = allWords[getRandomInRange(0, allWords.length - 1)]
    const hints = allCards[word]
    return { word, hints }
  }

  // add current card to seen cards, choose next card, set next card
  next = () => {
    this.setState(
      state => {
        return {
          seenCards: { ...state.seenCards, [state.currentCard.word]: true }
        }
      },
      () => {
        let nextCard = this.state.currentCard
        while (this.state.seenCards[nextCard.word]) {
          nextCard = this.getNextCard()
        }
        this.setState({ currentCard: nextCard, timer: SECONDS_PER_TURN })
      }
    )
  }

  onWrong = () => {
    this.setState(state => ({ score: state.score - 1 }))
    this.next()
  }

  onCorrect = () => {
    this.setState(state => ({ score: state.score + 1 }))
    this.next()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Score: {this.state.score}</Text>
          <Text>Time remaining: {this.state.timer}</Text>
        </View>
        <View style={styles.content}>
          <Card {...this.state.currentCard} />
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <Button title="wrong" onPress={this.onWrong} />
          </View>
          <View style={styles.button}>
            <Button title="correct" onPress={this.onCorrect} />
          </View>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  },
  header: {
    flex: 1
  },
  content: {
    flex: 8
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  button: {
    flex: 1
  }
})

export default App
