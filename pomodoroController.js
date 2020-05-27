let pomodoroController = new Vue({
  el: '#pomodoro-controller',
  data: {
    pomodoroIsRunning: false,
    timeInitial: 1500, // in seconds, refers to the time from which the timer started
    timeLeft: 1500, // in seconds (default is 25 minutes)
    timerId: '',
    quote: getRandomQuote(),
    showInfoBar: true,
    cycles: 5,
    cyclesInitial: 5,
    workMinutes: 25,
    breakMinutes: 5,
    editTitle: 'Double click to edit'
  },
  computed: {
    cyclesText: function() {
      return this.pomodoroIsRunning ? 'CYCLES LEFT' : 'CYCLES';
    },
    minutesLeft: function() {
      return (Math.floor(this.timeLeft / 60)).toString().padStart(2, '0')
    },
    secondsLeft: function() {
      return (this.timeLeft % 60).toString().padStart(2, '0')
    },
    actionButtonClassObject: function() {
      return {
        'btn-danger': this.pomodoroIsRunning,
        'btn-success': !this.pomodoroIsRunning
      }
    },
    actionButtonText: function() {
      return this.pomodoroIsRunning ? 'Cancel Pomodoro' : 'Start Pomodoro'
    }
  },
  methods: {
    changeWorkMinutes() {
      console.log('change work minutes!')
      // TODO: change the work minutes to an input field, then take final value and show it. i.e change the minutes w input field
    },
    changeBreakMinutes() {
      console.log('change break minutes!')
      // TODO: change the break minutes to an input field, then take final value and show it. i.e change the minutes w input field
    },
    onClickActionButton() {
      if (this.pomodoroIsRunning) {
        if (window.confirm('This will stop and cancel the pomodoro timer. Are you sure?')) {
          // BUG: confirm stops ALL SCRIPTS from running. calculate time left from a start date/end date instead.
          this.endTimer()
        }
      } else {
        this.cyclesInitial = this.cycles;
        this.startTimer()
      }
    },
    countdown() {
      this.timeLeft = this.timeLeft - 1
      if (this.timeLeft <= 0) {
        this.endTimer()
        if (this.cycles > 1) {
          this.cycles = this.cycles - 1
          this.startTimer()
          return;
        }
        this.cycles = this.cyclesInitial
      }
    },
    startTimer() {
      this.timeInitial = this.timeLeft
      this.timerId = window.setInterval(this.countdown, 1000)
      this.pomodoroIsRunning = true
    },
    endTimer() {
      window.clearInterval(this.timerId)
      this.timeLeft = this.timeInitial
      this.timerId = ''
      this.pomodoroIsRunning = false
    },
    addCycles() {
      this.cycles = this.cycles + 1
    },
    minusCycles() {
      if (this.cycles <= 1) {
        return;
      }
      this.cycles = this.cycles - 1
    },
  }
})
