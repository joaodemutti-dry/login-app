import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials: {
                user: {label: "user", type:"text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials){
                if (credentials?.user === "teste" && credentials.password === "teste") {
                    return { id: "1", name: "teste", email: "teste" };
                }
                return null;
            }
        }
    )
    ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };