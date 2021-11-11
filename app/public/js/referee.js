const refereeApp = {
    data() {
        return {
            result: undefined,
            referees: [],
            app:0,
            refForm: {},
            selectedRef: null,
        }
    },
    methods: {
        fetchRefereeData() {
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
        postNewRef(evt) {       

            fetch('/api/referee/create.php', {
                method:'POST',
                body: JSON.stringify(this.refForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
            
                // reset the form
                this.refForm = {};
            });
        },
        postRef(evt) {
            if (this.selectedRef === null) {
                this.postNewRef(evt);
            } else {
                this.postEditRef(evt);
            }
          },
        postEditRef(evt) {
            fetch('api/referee/update.php', {
                method:'POST',
                body: JSON.stringify(this.refForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
    
                // reset the form
                this.resetRefForm();
              });
          },
        postDeleteRef(ref) {
            if (!confirm("Are you sure you want to delete the referee record?")) {
              return;
            }
            console.log("Delete!", ref);
    
            fetch('api/referee/delete.php', {
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
                this.referees = json;
                this.fetchRefereeData();
                // reset the form
                this.resetRefForm();
              })
              .catch( (err) => {
                console.error(err);
                alert("Referee assigned to a game. Cannot be deleted.")
            });
          },
          selectedRefToEdit(ref) {
            this.selectedRef = ref;
            this.refForm = Object.assign({}, this.selectedRef);
          },
          resetRefForm() {
              this.selectedRef = null;
              this.refForm = {};
          }
    },
    created() {
        this.fetchRefereeData();
    }
}
  
Vue.createApp(refereeApp).mount('#refereeApp');

