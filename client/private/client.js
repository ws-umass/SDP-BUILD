const greeting = document.getElementById("greeting");

function main() {
    greeting.innerHTML = "Hi " + window.location.href.split("/").pop() + "👋";
}

main();
