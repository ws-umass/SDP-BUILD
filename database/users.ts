import database from "./connect";

interface userItem {
    username: string;
    password: string;
}

class Users {
    private user: userItem[] | undefined;

    constructor(){
        this.user = [];
    }

    async init() {
        if (!database.isConnected()) {
            try {
                await database.connect();
            } catch (error) {
                console.error("Service Unavailable");
            }
        }
        let userData = await database.readUser();
        this.user = userData;
    }

    findUser(name:string) {
        return this.user?.some((x) => x.username === name);
    }
  
    validatePassword(name:string, pwd:string) {
        return this.user?.some((x) => x.username === name && x.password === pwd);
    }
  
    addUser(name:string, pwd:string) {
        const badValue = [undefined, null, "", "none"];
        if (this.findUser(name) || badValue.some((x) => x === name || x === pwd)) {
            return false;
        }
        this.user?.push({ username: name, password: pwd });
        database.writeUserData(name, pwd);
        return true;
    }
}

export default Users;
