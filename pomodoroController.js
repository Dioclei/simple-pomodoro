let pomodoroController = new Vue({
  el: '#pomodoro-controller',
  data: {

    pomodoroIsRunning: true,
    showInfoBar: true,
    cycles: 5,
    workMinutes: 25,
    breakMinutes: 5,
    editTitle: 'Double click to edit'
  },
  computed: {
    cyclesText: function() {
      return this.pomodoroIsRunning ? 'CYCLES LEFT' : 'CYCLES';
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
      console.log('action button clicked!')
      // TODO: switch between start & stop/pause button
      // TODO: start the timer and stop the timer
    },
    addCycles() {
      this.cycles = this.cycles + 1
    },
    minusCycles() {
      if (this.cycles == 0) {
        return;
      }
      if (this.cycles == 1) {
        return window.confirm('This will stop and reset the timer. Are you sure?') //returns true if 'OK' pressed
        // TODO: stop and reset the timer.
      }
      this.cycles = this.cycles - 1
    },
  }
})
