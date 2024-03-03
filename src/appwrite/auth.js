/* eslint-disable no-useless-catch */
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

// the problem with below code is: it gets exposed to client side, and user registration
// have to be given manually by the programmer

// const client = new Client();
// const account = new Account(client);

// client
//     .setEndpoint(config.appwriteUrl)
//     .setProject(config.appwriteProjectId);

// // user will get a promise in return
// const user = await account.create(
//     ID.unique(),
//     "email@example.com",
//     "password",
//     "USER_1"
// );

// user.then((response) => {
//     console.log(response);
// }).catch((err) => {
//     console.log(err);
// });

// code improvement for better service
export class AuthService {
    // variables
    client = new Client();
    account;

    // note: we want to avoid services mess up if in future we have to change our services to
    // another BASS or own server
    // we create all methods inside the class so only those methods needs to be changed when any
    // change in services

    // contructor, when the AuthService is called then only the account is created
    // we don't do it in the class directly but in constructor, only avoid wastage of resources
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // we don't want to step up further without account creation so aysnc await
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                // what we are trying to do is, if user account has been created then
                // login him in, (sometimes we just want to redirect it to login page)
                // sometimes we can show a success message and let user go to login page
                // call another method
                // returning the login call, whatever returned by login will be returned
                return this.login({ email, password });
            } else {
                return;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            return false;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
            return false;
        }
    }

    // getting the current user (checking if the user has logged in or not)
    async getCurrentUser() {
        // if the user is logged in then return the user
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false;
        }

        // return null;
    }

    // logout
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            return false;
        }
    }
}

// with this method you can directly access the class method, no need to write new keyword
// everytime for new instance of object
const authService = new AuthService();

export default authService;
