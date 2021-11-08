const gameApp = {
    data() {
        return {
            result: undefined,
            games: [],
            app:0,
            gameForm: {},
            selectedGame: null,
        }
    },
    methods: {
        fetchGameData() {
            fetch('/api/game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postNewGame(evt) {       

            fetch('/api/game/create.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
            
                // reset the form
                this.gameForm = {};
            });
        },
        postGame(evt) {
            if (this.selectedGame === null) {
                this.postNewGame(evt);
            } else {
                this.postEditGame(evt);
            }
          },
        postEditGame(evt) {
            fetch('api/game/update.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
    
                // reset the form
                this.resetGameForm();
              });
          },
        postDeleteGame(ref) {
            if (!confirm("Are you sure you want to delete the referee record?")) {
              return;
            }
            console.log("Delete!", ref);
    
            fetch('api/game/delete.php', {
                method:'POST',
                body: JSON.stringify(ref),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
    
                // reset the form
                this.resetGameForm();
              });
          },
          selectedGameToEdit(ref) {
            this.selectedGame = ref;
            this.gameForm = Object.assign({}, this.selectedGame);
          },
          resetRefForm() {
              this.selectedGame = null;
              this.gameForm = {};
          }
    },
    created() {
        this.fetchGameData();
    }
}
  
Vue.createApp(gameApp).mount('#gameApp');

