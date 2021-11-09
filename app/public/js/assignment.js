const assignApp = {
    data() {
        return {
            result: undefined,
            assignments:[],
            games: [],
            app:0,
            selectedAssignment: null,
            selectedGame: null,
            selectedReferee: null,
            assignment_form: {},
            deleteAssignment: {},
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
        fetchRefData() {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchAssignmentData(g){
              fetch('/api/assignment/?game='+ g.gameId)
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
            console.log(this.selectedGame.gameId);
            this.fetchAssignmentData(this.selectedGame);
        },
        postAssignment(evt) {
            if (this.selectedAssignment) {
                this.postEditAssignment(evt);
            } else {
                this.postNewAssignment(evt);
            }
        },
        postNewAssignment(evt) {
            
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
            console.log("here in edit.")
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
            if ( !confirm("Are you sure you want to delete the assignment for Game "  + this.selectedGame.gameId +" and Referee " + s.rName + " ?") ) {
                return;
            }  
            this.deleteAssignment = Object.assign({}, this.selectedGame, s);
            console.log("Delete!", this.deleteAssignment);
            fetch('api/assignment/delete.php', {
                method:'POST',
                body: JSON.stringify(this.deleteAssignment),
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
            this.assignment_form = Object.assign({}, this.selectedAssignment, this.selectedGame);
          },
          handleResetEditAssignment() {
            this.selectedAssignment = null;
            this.assignment_form = {};
          }
    },
    created() {
        this.fetchGameData();
        this.fetchRefData();
    }
}
  
Vue.createApp(assignApp).mount('#assignApp');

