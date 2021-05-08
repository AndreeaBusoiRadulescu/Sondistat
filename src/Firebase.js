//Asemanatoare unei clase singleton
//Folosita pentru a tine global instanta firebase.
//Altfel ar fi trebuit pasata peste tot prin toate componentele
//Se pot defini si alte functii ajutatoare aici legate de firebase

import firebase from "firebase";

//DOCUMENATIE AICI:
// https://firebase.google.com/docs/reference/js/firebase.firestore

const FirebaseInstance = (function () {

    const CurrentUser = {};
    return {

        getCurrentUser: function () {
            return JSON.parse(window.sessionStorage.getItem('currentUser'))
        },

        setCurrentUser: function (user) {
            console.log(user)
            window.sessionStorage.setItem('currentUser', JSON.stringify(user));
            // CurrentUser.value = user
            // Object.freeze(CurrentUser.value)
        },

        getAuthUser: function () {
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

        saveSondaj: async function (title, details, questions) {
            console.log(questions)
            let docRef = await this.getDatabase().collection("sondaje").add({
                title: title,
                details: details,
                ownerId: FirebaseInstance().getCurrentUser().id,
                questions: questions
            });

            await docRef.update({
                id: docRef.id
            })
        },

        getCurrentUserSondaje: async function () {
            let query = await this.getDatabase().collection("sondaje").where("ownerId", "==", this.getCurrentUser().id).get();
            let snapShots = query.docs
            if(typeof snapShots === 'undefined'){
                return null
            }
            let sondaje = []
            snapShots.forEach((snapshot) => {
                sondaje.push(snapshot.data())
            })
            return sondaje
        },

        extractUser: async function (documentSnapshot) {
            let snapshot = await documentSnapshot.data();
            return snapshot;
        },

        getUserById: async function (id) {
            let query = await this.getDatabase().collection("users").where("id", "==", id).get();
            console.log(query.docs)
            let user = query.docs[0];
            //TODO: DE VAZUT CUM EXTRAGEM
            // console.log(query)
            // console.log(user);
            if(typeof user === 'undefined')
            {
                console.log("e undefined!")
                return null
            }
            return await this.extractUser(user);
        },

        updateUser: function (user) {
            //get the old user document ref

        }
    }

});

export default FirebaseInstance;
