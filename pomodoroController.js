let pomodoroController = new Vue({
  el: '#pomodoro-controller',
  data: {
    pomodoroIsRunning: true,
    showInfoBar: true,
    cycles: '5',
    workMinutes: '25',
    breakMinutes: '5',
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
      this.cycles = (parseInt(this.cycles) + 1).toString()
    },
    minusCycles() {
      if (this.cycles == '1') {
        // TODO: throw an error message: this will stop the timer. are you sure?
      }
      if (this.cycles == '0') {
        return;
      }
      this.cycles = (parseInt(this.cycles) - 1).toString()
    },
  }
})
