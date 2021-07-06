import { init } from 'next-firebase-auth'


const initAuth = () =>{

  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required,
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'example-authentication-87094',
        clientEmail: 'firebase-adminsdk-x94yj@example-authentication-87094.iam.gserviceaccount.com',
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      //databaseURL: 'https://my-example-app.firebaseio.com',
    },
    firebaseClientInitConfig: {
      apiKey: 'AIzaSyCXdz79BHFt6RA8AuFqFr29PT7X6ebkzZY', // required
      authDomain: 'example-authentication-87094.firebaseapp.com',
      //databaseURL: 'example-authentication-87094.appspot.com',
      projectId: 'example-authentication-87094',
    },
    cookies: {
      name: 'carsd-cookies', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    }
    
  })

}

export default initAuth