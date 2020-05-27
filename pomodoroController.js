let pomodoroController = new Vue({
  el: '#pomodoro-controller',
  data: {
    pomodoroIsRunning: false,
    timeInitial: 1500, // in seconds, refers to the time from which the timer started
    timeLeft: 1500, // in seconds (default is 25 minutes)
    timerId: '',
    showInfoBar: true,
    cycles: 5,
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
          window.clearInterval(this.timerId)
          this.timeLeft = this.timeInitial
          this.timerId = ''
          this.pomodoroIsRunning = false
        }
      } else {
        this.timeInitial = this.timeLeft
        this.timerId = window.setInterval(this.countdown, 1000)
        this.pomodoroIsRunning = true
      }
      console.log('action button clicked!')
    },
    countdown() {
      this.timeLeft = this.timeLeft - 1
      if (this.timeLeft <= 0) {
        window.clearInterval(this.timerId)
        this.timeLeft = this.timeInitial
        this.timerId = ''
        this.pomodoroIsRunning = false
        // TODO: update this.cycles and restart the timer promptly.
      }
    },
    addCycles() {
      this.cycles = this.cycles + 1
    },
    minusCycles() {
      if (this.cycles == 0) {
        return;
      }
      if (this.cycles == 1) {
        return window.confirm('This will stop and cancel the pomodoro timer. Are you sure?') //returns true if 'OK' pressed
        // TODO: stop and reset the timer.
      }
      this.cycles = this.cycles - 1
    },
  }
})
