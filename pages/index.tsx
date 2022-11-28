import Head from "next/head";
import fetchName from "../components/fetchName";
import { MDBDataTable } from "mdbreact";

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

const DatatablePage = () => {
    const data = {
        columns: [
            {
                label: 'Category',
                field: 'category',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Public Location',
                field: 'plocation',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Staff Only Location',
                field: 'slocation',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Stock Kind',
                field: 'stock',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Aprox Stock Status',
                field: 'status',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Last Updated',
                field: 'date',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Last Updated By',
                field: 'staff',
                sort: 'asc',
                width: 200
            },
            {
                label: "Current Stock",
                field: 'quantity',
                sort: 'asc',
                width: 100
            }
        ],
        rows: [
            {
                category: 'diodes',
                name: '1N457',
                plocation: 'PW-01-G',
                slocation: '',
                stock: 'Open Stock',
                status: 'In Stock',
                date: '11/20/2022',
                staff: 'Jay',
                quantity: 100
            },
            {
                category: 'mcu-brds',
                name: 'Adafruit Feather RP2040',
                plocation: '',
                slocation: 'SO-18-D',
                stock: 'Itemized',
                status: '',
                date: '10/22/2022',
                staff: 'Sam',
                quantity: 10
            },
            {
                category: 'diodes',
                name: '1N7455',
                plocation: 'PW-01-G',
                slocation: '',
                stock: 'Open Stock',
                status: 'In Stock',
                date: '9/13/2022',
                staff: 'Kavya',
                quantity: 100
            },
            {
                category: 'diodes',
                name: '1N4003',
                plocation: 'PW-01-G',
                slocation: '',
                stock: 'Open Stock',
                status: 'Low Stock',
                date: '9/11/2022',
                staff: 'Jay',
                quantity: 100
            },
            {
                category: 'pots',
                name: '1k Trim Potentiometer',
                plocation: 'PW-03-H',
                slocation: '',
                stock: 'Open Stock',
                status: 'In Stock',
                date: '11/21/2022',
                staff: 'Jay',
                quantity: 30
            },
            {
                category: 'art',
                name: 'Glitter Glue',
                plocation: 'ART-04-D',
                slocation: '',
                stock: 'Open Stock',
                status: 'Out of Stock',
                date: '10/25/2022',
                staff: 'Jay',
                quantity: 5
            },
            {
                category: 'art',
                name: 'Paint Markers',
                plocation: 'ART-04-E',
                slocation: '',
                stock: 'Open Stock',
                status: 'In Stock',
                date: '11/22/2022',
                staff: 'Kavya',
                quantity: 5
            },
            {
                category: 'switches',
                name: 'DIP Switch SPST 8 Position',
                plocation: 'PW-03-I-1',
                slocation: '',
                stock: 'Open Stock',
                status: 'In Stock',
                date: '11/18/2022',
                staff: 'Anu',
                quantity: 50
            }
        ]
    };

    return (
        <MDBDataTable
            scrollX
            striped
            bordered
            data={data}
        />
    );
}

export default DatatablePage;

// export default index;