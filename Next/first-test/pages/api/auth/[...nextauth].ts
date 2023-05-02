import NextAuth, {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import CredentialsProvider from 'next-auth/providers/credentials'

let googleID:string|undefined = process.env.GOOGLE_ID
let googleSecret:string|undefined = process.env.GOOGLE_SECRET

if (googleID === undefined) {
    googleID = "none"
    console.warn("No Google ID!")
}
if (googleSecret === undefined) {
    googleSecret = "none"
    console.warn("No Google Secret!")
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: googleID,
      clientSecret: googleSecret
    }),
    CredentialsProvider({
        type: 'credentials',
        credentials: {},
        authorize(credentials, req) {
            const {email, password} = credentials as {
                email: string,
                password: string,
            };
            if (email !== "" && password !== "") {
                return null;
            }

            return {id: '', name: '', email: ''}
        }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    // Got to change this when code ready
    signIn: "/auth/signIn"
  }
}

export default NextAuth(authOptions)