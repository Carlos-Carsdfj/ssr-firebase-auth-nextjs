
import {
  AuthAction,// Esto es usado para definir las acciones a tomar depediendo de la autenticación del cliente
  useAuthUser,// Esto es una funcion que nos retornara la informacion del usuario actual tanto si esta autentificado como si no(Hace reserencia a use de Firebase)  
  withAuthUser,//Esto es un Componente de orden superior o en sus siglas en ingles(HOC) que envuelve el componente y le dota de las props necesarias 
  withAuthUserTokenSSR,//Esto es una funcion de orden superior que nos facilita usar el la autorizacion desde SSR
} from 'next-firebase-auth'
import firebase from 'firebase'

const Demo = () => {
  //Obtenemos el use del cliente para crear un renderizado condicional mas adelante
  const AuthUser = useAuthUser()
  return (
    <div>
      <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
      <button onClick={() =>firebase.auth().signOut() }>Logout</button>
    </div>
  )
}

// Configuramos para redireccionar a la pagina de login si el usuario no esta autentificado  esto se aplica desde el servidor 
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(() => {
  return {
    props: {}
  }
})
//Envolvemos Demo y exportamos por defecto el HOC asi agregamos la funcionalidad necesaria a la pagina a renderizar
export default withAuthUser({
  //Desde el cliente con la pagina ya renderizada redireccionamos si el usuario pierde la autenticación por alguna razon (cerrar sesion)
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Demo)
