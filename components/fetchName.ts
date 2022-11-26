async function fetchName(table: string, column: string, name: string) {
    const headerFields = {"Content-Type": "application/json"};
    const body = {
        table: table,
        column: column,
        name: name
    };
    const data = await fetch(
        "/api/database/getName",
        {
            method: "POST",
            body: JSON.stringify(body),
            headers: headerFields
        }
    )
    return data.json();
}


export default fetchName;
