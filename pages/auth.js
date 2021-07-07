import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth' //Esto para usar el flujo de UI ya estructurado en este componente
import firebase from 'firebase/app' // importamos firebase-app para poder usar el auth provider de cada metodo de autentificación
import 'firebase/auth'
import { 
  withAuthUser, //Esto es un Componente de orden superior o en sus siglas en ingles(HOC) que envuelve el componente y le dota de las props necesarias 
   AuthAction // Esto es usado para definir las acciones a tomar depediendo de la autenticación del cliente
       } from 'next-firebase-auth'

//Agregamos las configuraciones necesarias que usara StyledFirebaseAuth para renderizar
const firebaseAuthConfig = {
  //Mostrara la autentificación como un popup sin nisiquiera tener la necesidad de crear dicha funcionalidad de forma manual
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  //Opciones de autentificación  que utilizaremos ( en este caso sera email y github)
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    {
      provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  //A donde nos mandara la app una ves que la autentificacion sea exitosa 
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  
  callbacks: {
    //para informacion mas detallada visitar https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    // Basicamente esto es un callback que se ejecuta cuando el usuario tuvo un inicio de sesion exitoso esto basicamente devuelve un firebaseui.auth.Auth
    signInSuccessWithAuthResult: () =>
      // Don't automatically redirect. We handle redirecting based on
      // auth state in withAuthComponent.js.
      false,
  },
}

  function Auth() {
  const [renderAuth, setRenderAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {//Es una verificación idiomática para ver si el script se está ejecutando en una página web dentro de un navegador web o no.
      setRenderAuth(true)
    }
  }, [])
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  )
}
//Envolvemos Demo y exportamos por defecto el HOC asi agregamos la funcionalidad necesaria a la pagina a renderizar
// Redirecciona al cliente cuanto este es autentificado
export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Auth)
