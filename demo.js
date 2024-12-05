let messageBuffer = {
    Menu: null,
    cd: null
};
window.addEventListener("message", (event) => {
    console.log("da nhan");
    messageBuffer.Menu = event.data.Menu;
    messageBuffer.cd = event.data.cd;
    console.log(event.data.Menu + "Okkk");
    console.log(event.data.cd + "OK");
    if (event.data.Menu) {
        var menu = document.querySelectorAll(".menu-item");
        menu.forEach(i => {
            i.classList.remove("active");
        })
        menu.forEach(item => {
            if (item.textContent.trim() == event.data.Menu.trim()) {
                item.classList.add("active");
            }
        })
    }
    if (messageBuffer.cd !== null) {
        console.log(messageBuffer.cd + "cd");
        let cd = event.data.cd;
        console.log(event.data.cd);
        const iframe = document.querySelector("iframe[name='content-frame']");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ cd: cd }, "*");
        }
    }
    else {
        console.log("Ko dc");
    }
    messageBuffer = { Menu: null, cd: null };
})
var isLight = true;
document.getElementById("DarkLight").addEventListener("click", toggleTheme);

function toggleTheme() {
    isLight = !isLight;
    const theme = isLight ? "light" : "dark";
    document.body.style.backgroundColor = theme === "light" ? "var(--Light)" : "var(--Dark)";
    document.body.style.color = theme === "light" ? "var(--Dark)" : "var(--Light)";
    document.getElementById("DarkLight").innerText = isLight ? "🌙" : "🌕";

    // Gửi thông điệp đến các iframe
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
        iframe.contentWindow.postMessage({ theme }, "*");
    });
}
var menu = document.querySelectorAll(".menu-item");
menu.forEach(item => {
    item.addEventListener("click", () => {
        menu.forEach(i => { i.classList.remove("active") });

        item.classList.add("active");
    })
})