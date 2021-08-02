/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW!
 **********************************************/

const app = Vue.createApp({
  data: function () {
    return {
      strikeMax: 3,
      game: {
        active: false,
        over: false,
        points: 0,
        strikes: 0,
        pass: 3,
        guess: '',
        message: 'Press Play to begin!',
        wordsShuff: [],
        word: '',
        scrambled: '',
        left: 10

      },
      words: [
        'racecar',
        'mythical',
        'switches',
        'classic',
        'escape',
        'javascript',
        'maximum',
        'development',
        'phone',
        'leaf'

      ]

    }
  },

  created: function () {
    const game = localStorage.getItem('game')
    if (game) {
      this.game = JSON.parse(game)
    }
  },

  methods: {
    gameStart () {
      this.game.active = true
      this.game.message = 'Guess the scrambled word!'
      this.game.wordsShuff = shuffle(this.words)
      this.game.word = this.game.wordsShuff[0]
      this.game.scrambled = shuffle(this.game.word)
    },

    checkWord () {
      if (this.game.guess.toLowerCase() === this.game.word) {
        this.game.message = 'Correct! Next word...'
        this.game.points++

        this.game.guess = ''
        this.game.left--
        console.log(this.game.left)
        if (this.game.left === 0) {
          this.game.message = 'No more words! Game over!'
          this.game.over = true
          this.game.active = false
        } else {
          this.game.wordsShuff.shift()
          this.game.word = this.game.wordsShuff[0]
          this.game.scrambled = shuffle(this.game.word)
        }
      } else if (this.game.strikes < 2) {
        this.game.message = 'Incorect, Please try again'
        this.game.strikes++
        this.game.guess = ''
      } else {
        this.game.message = 'You Lost, Game over!'
        this.game.strikes = 3
        this.game.over = true
        this.game.active = false
      }
    },

    skipWord () {
      if (this.game.pass > 0 && this.game.left > 1) {
        this.game.wordsShuff.shift()
        this.game.word = this.game.wordsShuff[0]
        this.game.scrambled = shuffle(this.game.word)
        this.game.guess = ''
        this.game.pass--
        this.game.left--
        this.game.message = 'Word passed. Please make a guess'
      } else if (this.game.pass > 0 && this.game.left === 1) {
        this.game.message = 'No more words! Game over!'
        this.game.over = true
        this.game.active = false
      } else {
        this.game.message = 'No more passes. Please make a guess'
      }
    },

    playAgain () {
      this.gameReset()
      this.gameStart()
    },

    gameReset () {
      this.game.left = 10
      this.game.points = 0
      this.game.strikes = 0
      this.game.guess = ''
      this.game.pass = 3
      this.game.active = false
      this.game.over = false
      this.game.message = 'Press Play to begin!'
      this.game.wordsShuff = []
    }
  },

  watch: {
    game: {
      deep: true,
      handler: function () {
        localStorage.setItem('game', JSON.stringify(this.game))
      }
    }
  }

})

const vm = app.mount('#app')
