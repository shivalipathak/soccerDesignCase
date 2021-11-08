const assignApp = {
    data() {
        return {
            result: undefined,
            games: [],
            assignments:[],
            app:0,
            gameForm: {},
            selectedAssignment: {},
            selectedGame: null,
            assignment_form: {},
            referees: [],
            referee_form: {},
        }
    },
    methods: {
        fetchGameData() {
            fetch('/api/assignment/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchAssignmentData(g){
            
            console.log('Here in Fetch.');
              fetch('/api/assignment?Game=' + g.gameId)
              .then( response => response.json() )
              .then( (responseJson) => {
                  console.log(responseJson);
                  this.assignments = responseJson;
                  console.log(this.assignments);
              })
              .catch( (err) => {
                  console.error(err);
              })
          },
          selectGame(s) {
            if (s == this.selectedGame) {
                return;
            }
            this.selectedGame = s;
            console.log(s);
            this.assignments = [];
            console.log('Here in Select.');
            this.fetchAssignmentData(this.selectedGame);
        },
        postAssignment(evt) {
            console.log ("Test:", this.selectedAssignment);
            if (this.selectedAssignment) {
                this.postEditAssignment(evt);
            } else {
                this.postNewAssignment(evt);
            }
        },
        postNewAssignment(evt) {
            this.assignment_form.gameId = this.selectedGame.gameId;
            
            console.log("Posting:", this.assignment_form);
        
            fetch('api/assignment/create.php', {
                method:'POST',
                body: JSON.stringify(this.assignment_form),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                  console.log("Returned from post:", json);
                  this.assignments = json;
                  this.handleResetEditAssignment();
              })
              .catch( err => {
                alert("Something went wrong.");
              });
          },
          postEditAssignment(evt) {
            this.assignment_form.id = this.selectedAssignment.id;
            this.assignment_form.gameid = this.selectedGame.id;
      
      
            console.log("Editing")
            fetch('api/assignment/update.php', {
                method:'POST',
                body: JSON.stringify(this.assignment_form),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                    }
                })
                .then( response => response.json() )
                .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
      
                // reset the form
                this.handleResetEditAssignment();
                });
            },
      
            postDeleteAssignment(s) {  
            if ( !confirm("Are you sure you want to delete the referee "  + s.Name +"?") ) {
                return;
            }  
      
            console.log("Delete!", s);
      
            fetch('api/assignment/delete.php', {
                method:'POST',
                body: JSON.stringify(s),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
                })
                .then( response => response.json() )
                .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                // reset the form
                this.handleResetEditAssignment();
                });
            },
            selectedGameToEdit(g) {
            this.selectedGame = g;
            this.gameForm = Object.assign({}, this.selectedGame);
            },
            resetRefForm() {
              this.selectedGame = null;
              this.gameForm = {};
            },
            handleEditAssignment(assignment) {
            console.log("selecting", assignment);
            this.selectedAssignment = assignment;
            this.assignment_form = Object.assign({}, this.selectedAssignment);
          },
          handleResetEditAssignment() {
            this.selectedAssignment = null;
            this.assignment_form = {};
          }
    },
    created() {
        this.fetchGameData();
    }
}
  
Vue.createApp(assignApp).mount('#assignApp');

