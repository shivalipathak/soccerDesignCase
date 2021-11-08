const loginApp = {
    data() {
        return {
            result: undefined,
            selectedRole: 'A',
            app:0,
            records : null,
        }
    },
    methods: {
        fetchBookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        signInAssignor(evt) {       

            fetch('/api/assignor.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        signIn(evt) {
            if (this.selectedRole === 'A') {
                this.signInAssignor(evt);
            } else {
                this.signInReferee(evt);
            }
          },
        signInReferee(evt) {
            fetch('api/referee.php', {
                method:'GET',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
    
                // reset the form
                this.resetBookForm();
              });
          },
        postDeleteBook(b) {
            if (!confirm("Are you sure you want to delete the book?")) {
              return;
            }
            console.log("Delete!", b);
    
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(b),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
    
                // reset the form
                this.resetBookForm();
              });
          },
          selectBookToEdit(b) {
            this.selectedBook = b;
            this.bookForm = Object.assign({}, this.selectedBook);
          },
          resetBookForm() {
              this.selectedBook = null;
              this.bookForm = {};
          }
    },
    created() {
        this.fetchBookData();
    }
}
  
Vue.createApp(loginApp).mount('#loginApp');

