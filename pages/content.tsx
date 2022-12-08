import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';

function Content() {
    let router = useRouter();
    let nameData: any = '';
    let position: any = '';
    nameData = router.query.value ? router.query.value : '';
    position = router.query.position ? router.query.position : '';

    const [value, setData] = useState(0);

    let show = () => {
        setData(value === 1 ? 0 : 1);
    }

    let backToHome = () => {
        Router.push('/');
    }

    return <div>
        <h1>
            {nameData}
        </h1>

        <p>
            This is the detail page of component {nameData}
        </p>

        <div>
            <button onClick={show}>{value === 0 ? 'show position' : 'turn off the lights'}</button>
        </div>

        <div>
            <p>{value === 1 ? 'The light is on' : ''}</p>
            <p>{value === 1 ? 'The position is ' : ''} {value === 1 ? position : ''}</p>
        </div>

        <div>
            <button onClick={backToHome}>back to home</button>
        </div>
    </div>;
}

export default Content;