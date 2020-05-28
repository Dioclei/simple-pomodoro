const SHORT_BREAK_TIME = 'SHORT_BREAK_TIME'
const LONG_BREAK_TIME = 'LONG_BREAK_TIME'
const WORK_TIME = 'WORK_TIME'
const DOWN_TIME = 'DOWN_TIME'

let pomodoroController = new Vue({
  el: '#pomodoro-controller',
  data: {
    pomodoroIsRunning: false,
    currentMode: DOWN_TIME,
    nextMode: WORK_TIME,
    stopAfterLongBreak: false,
    timeNext: 1, // in seconds, refers to the time from which the timer will start next.
    timeLeft: 1, // in seconds (default is 25 minutes)
    timerId: '',
    quote: getRandomQuote(),
    showInfoBar: true,
    cycles: 5,
    cyclesInitial: 5,
    workMinutes: 0.2,
    shortBreakMinutes: 0.1,
    longBreakMinutes: 0.3,
    editTitle: 'Double click to edit',
  },
  computed: {
    bgColor: function() {
      switch (this.currentMode) {
        case WORK_TIME:
          return '#3B8BF7'
        case SHORT_BREAK_TIME:
          return 'coral'
        case LONG_BREAK_TIME:
          return 'salmon'
        case DOWN_TIME:
          return 'grey'
        default:
          return 'black'
      }
    },
    currentModeText: function() {
      switch (this.currentMode) {
        case DOWN_TIME:
          return 'Pomodoro is currently not running.'
        case WORK_TIME:
          return 'Time to do some work!'
        case SHORT_BREAK_TIME:
          return 'Take a short break!'
        case LONG_BREAK_TIME:
          return 'Take a long break!'
        default:
          throw 'Unknown type! Cannot compute current mode!'
      }
    },
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
    changeShortBreakMinutes() {
      console.log('change short break minutes!')
      // TODO: change the break minutes to an input field, then take final value and show it. i.e change the minutes w input field
    },
    changeLongBreakMinutes() {
      console.log('change long break minutes!')
      // TODO: change the break minutes to an input field, then take final value and show it. i.e change the minutes w input field
    },
    onClickActionButton() {
      if (this.pomodoroIsRunning) {
        if (window.confirm('This will stop and cancel the pomodoro timer. Are you sure?')) {
          // BUG: confirm stops ALL SCRIPTS from running. calculate time left from a start date/end date instead.
          this.endTimer().resetTimerId().setNextModeToDownTime().updateCycles().calculateTimeNext().calculateNextMode().displayNextTiming()
        }
      } else {
        this.setInitialCycles().setNextModeToDownTime().updateCycles().calculateTimeNext().calculateNextMode().displayNextTiming().startTimer()
      }
    },
    countdown() {
      this.timeLeft = this.timeLeft - 1
      if (this.currentMode == WORK_TIME) {
        // catches the odd case where the user sets cycles to 1 during worktime.
        if (this.cycles == 1 && this.nextMode != LONG_BREAK_TIME) {
          this.nextMode = LONG_BREAK_TIME
        } else if (this.cycles > 1 && this.nextMode != SHORT_BREAK_TIME) {
          this.nextMode = SHORT_BREAK_TIME
        }
      }
      console.log('Next Mode', this.nextMode)
      if (this.timeLeft == 0) {
        if (this.stopAfterLongBreak && this.currentMode == LONG_BREAK_TIME) {
          // stops timer and resets everything if checkbox stopAfterLongBreak is selected
          this.endTimer().resetTimerId().setNextModeToDownTime().updateCycles().calculateTimeNext().calculateNextMode().displayNextTiming()
        } else {
          this.endTimer().updateCycles().calculateTimeNext().calculateNextMode().displayNextTiming().startTimer()
        }
      }
    },
    displayNextTiming() {
      this.timeLeft = this.timeNext
      return this
    },
    startTimer() {
      this.timerId = window.setInterval(this.countdown, 1000)
      this.pomodoroIsRunning = true
      return this
    },
    endTimer() {
      window.clearInterval(this.timerId)
      this.pomodoroIsRunning = false
      return this
    },
    resetTimerId() {
      this.timerId = ''
      return this
    },
    calculateTimeNext() {
      // NOTE: do this before calculating the next mode.
      switch (this.nextMode) {
        case DOWN_TIME:
        case WORK_TIME:
          this.timeNext = this.workMinutes * 60
          return this
        case SHORT_BREAK_TIME:
          this.timeNext = this.shortBreakMinutes * 60
          return this
        case LONG_BREAK_TIME:
          this.timeNext = this.longBreakMinutes * 60
          return this
        default:
          throw 'Unknown type! Cannot calculate next timing!'
      }
    },
    setInitialCycles() {
      this.cyclesInitial = this.cycles
      return this
    },
    updateCycles() {
      // NOTE: do this right after ending the timer.
      switch (this.nextMode) {
        case DOWN_TIME:
          this.cycles = this.cyclesInitial
          return this
        case WORK_TIME:
          if (this.cycles > 1) { // behaviour for after short break
            this.cycles = this.cycles - 1
          }
          else { // behaviour for after long break
            this.cycles = this.cyclesInitial
          }
          return this
        case SHORT_BREAK_TIME:
        case LONG_BREAK_TIME:
          return this
        default:
          throw 'Unknown type! Cannot update cycles!'
      }
    },
    calculateNextMode() {
      switch (this.nextMode) {
        case DOWN_TIME:
          this.currentMode = DOWN_TIME
          this.nextMode = WORK_TIME
        case WORK_TIME:
          this.currentMode = WORK_TIME
          if (this.cycles > 1) { // prepare for a short break
            this.nextMode = SHORT_BREAK_TIME
          } else { // prepare for a long break
            this.nextMode = LONG_BREAK_TIME
          }
          return this
        case SHORT_BREAK_TIME:
          this.currentMode = SHORT_BREAK_TIME
          this.nextMode = WORK_TIME
          return this
        case LONG_BREAK_TIME:
          this.currentMode = LONG_BREAK_TIME
          this.nextMode = WORK_TIME
          return this
        default:
          throw 'Unknown type! Cannot calculate next mode!'
      }
    },
    setNextModeToDownTime() {
      this.nextMode = DOWN_TIME
      return this
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
