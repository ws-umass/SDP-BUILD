import Head from "next/head";
import fetchName from "../components/fetchName";
import { MDBDataTable } from "mdbreact"; // npm install --save pg
import React, { useState } from 'react';
import Router from 'next/router';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css"; // https://dev.to/vsfarooqkhan/data-tables-in-react-js-made-easy-with-mdbreact-27b9

import styles from "../styles/mainStyle.module.css";
import {data} from "browserslist"; // https://medium.com/@ralph1786/using-css-modules-in-react-app-c2079eadbb87

const badValue = [undefined, null, "", "none"];

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

const raw_data = {
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

let new_data = raw_data;

let reset = () => Router.reload();

const DatatablePage = () => {

    const getDataCell = (title: string, value: any) => {
        // @ts-ignore
        new_data.rows = new_data.rows.filter((e) => e[title] === value);
        console.log(value);
        console.log(new_data);
        setData(
            {
                columns: raw_data.columns,
                rows: new_data.rows.map(
                    (row) => {
                        return {
                            category: badValue.some((x) => x === row.category) ? '' : <button onClick={() => getDataCell('category', row.category)}>{row.category}</button>,
                            name: badValue.some((x) => x === row.name) ? '' : <button onClick={() => getDataCell('name', row.name)}>{row.name}</button>,
                            plocation: badValue.some((x) => x === row.plocation) ? '' : <button onClick={() => getDataCell('plocation', row.plocation)}>{row.plocation}</button>,
                            slocation: badValue.some((x) => x === row.slocation) ? '' : <button onClick={() => getDataCell('slocation', row.slocation)}>{row.slocation}</button>,
                            stock: badValue.some((x) => x === row.stock) ? '' : <button onClick={() => getDataCell('stock', row.stock)}>{row.stock}</button>,
                            status: badValue.some((x) => x === row.status) ? '' : <button onClick={() => getDataCell('status', row.status)}>{row.status}</button>,
                            date: badValue.some((x) => x === row.date) ? '' : <button onClick={() => getDataCell('date', row.date)}>{row.date}</button>,
                            staff: badValue.some((x) => x === row.staff) ? '' : <button onClick={() => getDataCell('staff', row.staff)}>{row.staff}</button>,
                            quantity: <button onClick={() => getDataCell('quantity', row.quantity)}>{row.quantity}</button>
                        }
                    }
                )
            }
        );
    }

    let bottonRow = raw_data.rows.map(
        (row) => {
            return {
                category: badValue.some((x) => x === row.category) ? '' : <button onClick={() => getDataCell('category', row.category)}>{row.category}</button>,
                name: badValue.some((x) => x === row.name) ? '' : <button onClick={() => getDataCell('name', row.name)}>{row.name}</button>,
                plocation: badValue.some((x) => x === row.plocation) ? '' : <button onClick={() => getDataCell('plocation', row.plocation)}>{row.plocation}</button>,
                slocation: badValue.some((x) => x === row.slocation) ? '' : <button onClick={() => getDataCell('slocation', row.slocation)}>{row.slocation}</button>,
                stock: badValue.some((x) => x === row.stock) ? '' : <button onClick={() => getDataCell('stock', row.stock)}>{row.stock}</button>,
                status: badValue.some((x) => x === row.status) ? '' : <button onClick={() => getDataCell('status', row.status)}>{row.status}</button>,
                date: badValue.some((x) => x === row.date) ? '' : <button onClick={() => getDataCell('date', row.date)}>{row.date}</button>,
                staff: badValue.some((x) => x === row.staff) ? '' : <button onClick={() => getDataCell('staff', row.staff)}>{row.staff}</button>,
                quantity: <button onClick={() => getDataCell('quantity', row.quantity)}>{row.quantity}</button>
            }
        }
    )

    const [value, setData] = useState({columns: raw_data.columns, rows: bottonRow});

    let table = <MDBDataTable // https://mdbgo.io/marta-szymanska/mdb5-demo-pro-design-blocks/pro/data/datatables.html#section-async-data
        scrollX
        striped
        bordered
        data={value}
        searching={false}
        paging={false}
        info={false}
    />

    return <div>
                <div>
                    {table}
                </div>
                <div>
                    <button onClick={reset}>refresh table</button>
                </div>
            </div>;
}

export default DatatablePage;

// export default index;