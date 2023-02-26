import passport from 'passport';
import { useRouter } from 'next/router';
import { useState } from 'react';

function Login() {
    return <div>
        <h1>SIGN IN</h1>
        <div id="mainBox">
            <form action="/login" method="post">
                <label>Username:</label>
                <input type="text" name="username"/>
                <br/><br/>
                <label>Password:</label>
                <input type="password" name="password"/>
                <br/><br/>
                <input type="submit" value="Submit" id="submitButton"/>
            </form>
            <form action="/" method="post">
                <input type="submit" value="Back" id="backButton"/>
            </form>
        </div>
    </div>;
}

export default Login;