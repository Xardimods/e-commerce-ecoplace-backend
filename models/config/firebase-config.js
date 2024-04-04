import admin from 'firebase-admin'

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://ecoplaceapiimages.appspot.com" 
})

const bucket = admin.storage().bucket()
export { bucket }