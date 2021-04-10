//import axios from "axios";
import React from "react";
//import "../css/Login.css";
import firebase from "firebase"
import FirebaseInstance from "../Firebase";
// import FirebaseUtil from "../Firebase";


function GoogleSignInButton({onClick}) {
    return <div className="row ml-auto mr-auto">
        <a className="btn btn-outline-dark" role="button" onClick={onClick}
           style={{textTransform: "none"}}>
            <img style={{width: "20px", marginBottom: "3px", marginRight: "5px"}}
                 alt="Google sign-in"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
            Login with Google
        </a>
    </div>;
}

class Login extends React.Component
{
    signInWithGoogle(){

        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("nuu");
            console.log(user);
            console.log("nuuu2222");
            // Add a new document in collection "cities"
            console.log(FirebaseInstance().getInstance());
            let db = FirebaseInstance().getDatabase();
            console.log("daaaaaa");
            console.log(db);

            //TODO: Niste toast-uri?
            FirebaseInstance().createDbUserFromFirebaseAuthUser(user)
            .then((insertedUser) => {
                console.log("Utilizatorul a fost adaugat in baza de date. Are id-ul generat");
                FirebaseInstance().extractUser(insertedUser).then((user) => {
                    console.log(user);
                    FirebaseInstance().getUserById(user.id).then((user) => {
                        console.log(user);
                    })
                });
            })
            .catch((error) => {
                console.error("Nu s-a putut adauga utilizatorul in baza de date!: ", error);
            });
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error)
        });
    }

    render() {
        return(
            <div>
                <div className="img-container">
                    {/* formular Log In */}
                    <div className="card m-auto mt-5 shadow-lg rounded-lg" >
                        <div className="card-body d-flex flex-column d-flex justify-content-around">
                            <h5 className="card-title">Bine ai venit pe Sondistat!</h5>
                            <p className="card-text ml-auto mr-auto" style={{width: '60%'}}>Sondistat este o platforma de creare,
                            gestionare si analizare din punct de vedere statistic, a sondajelor de opinie.</p>
                            <p className="card-text ml-auto mr-auto" style={{width: '60%'}}>Pentru a lucra impreuna este nevoie de autentificare!</p>
                            <GoogleSignInButton onClick={this.signInWithGoogle}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;