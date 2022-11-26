import Head from "next/head";
import fetchName from "../components/fetchName";

import styles from "../styles/mainStyle.module.css"; // https://medium.com/@ralph1786/using-css-modules-in-react-app-c2079eadbb87

function index() {

    const handleKeyUp = async (event: React.KeyboardEvent<HTMLElement>) => { // https://bobbyhadz.com/blog/typescript-react-onkeyup-event-type
        const target = event.target as HTMLTextAreaElement; // https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
        const value = target.value;
        console.log(value);

        if (value.length >= 3) {
            const result = await fetchName("COMPANY", "NAME", target.value);
            console.log(result);
        }
    };

    return ( // jsx
        <div>
            <Head>
                <title>Test Page</title>
                <meta name="description" content="SDP test page" />
            </Head>

            <h1 className={styles.title}>
                Test the search bar!
            </h1>

            <div>
                <input
                    type="text"
                    id="message"
                    name="message"
                    defaultValue=""
                    onKeyUp={handleKeyUp}
                />
            </div>
        </div>
    );
}

export default index;