// Firebase configuration (adicione as suas credenciais do Firebase)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Função de cadastro
function signUpUser(name, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Usuário criado com sucesso
        const user = userCredential.user;
  
        // Enviar dados para a Firestore (Dona do app)
        const db = firebase.firestore();
        db.collection("userData").add({
          uid: user.uid,
          name: name,
          email: email
        })
        .then(() => {
          console.log("Dados enviados para a dona do app.");
        })
        .catch((error) => {
          console.error("Erro ao enviar dados: ", error);
        });
  
        // Salvando a sessão no localStorage
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error("Erro ao criar usuário: ", error);
      });
  }
  