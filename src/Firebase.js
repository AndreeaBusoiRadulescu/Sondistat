//Asemanatoare unei clase singleton
//Folosita pentru a tine global instanta firebase.
//Altfel ar fi trebuit pasata peste tot prin toate componentele
//Se pot defini si alte functii ajutatoare aici legate de firebase

import firebase from "firebase";

//DOCUMENATIE AICI:
// https://firebase.google.com/docs/reference/js/firebase.firestore

const FirebaseInstance = (function () {

    return {

        getCurrentUser: function () {
            return firebase.auth().currentUser;
        },

        setInstance: function (firebaseApp) {
            this.firebaseAppInstance = firebaseApp;
        },

        getInstance: function getInstance(){
            return this.firebaseAppInstance;
        },

        getDatabase: function () {
            return firebase.firestore(this.getInstance())
        },

        createDbUserFromFirebaseAuthUser: function (authUser) {
            // Returneaza o promisiune, fiind un apel asincron.
            // Trebuie prinsa si tratata (cu then si catch) de clasa care va apela metoda asta
            return this.getDatabase().collection("users").add({ //add() va autogenera un id unic
                id: authUser.uid,
                name: authUser.displayName,
                email: authUser.email,
                photoURL: authUser.photoURL
            });
        },

        extractUser: async function (documentReference) {
            let snapshot = await documentReference.get();
            let user = snapshot.data()
            return user;
            // return new Promise((resolve, reject) => {
            //
            //     setTimeout(() => {
            //         resolve('foo');
            //     }, 300);
            // });
        },

        getUserById: async function (id) {
            let userDocRef = null;
            let query = await this.getDatabase().collection("users").where("id", "==", id).get();
            let user = query.docs[0];
            //TODO: DE VAZUT CUM EXTRAGEM
            console.log(query)
            console.log(user);
            return null
            // return this.extractUser(user);
        },

        updateUser: function (user) {
            //get the old user document ref

        }
    }

});

export default FirebaseInstance;
