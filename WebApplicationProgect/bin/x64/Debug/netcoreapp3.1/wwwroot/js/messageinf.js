function UpdateContent() {
    let s = document.getElementById('text_m');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Chat/IsUpdate?hesh=' + sessionStorage.getItem("mes_hash"));

    xhr.onload = function () {
        if (xhr.status == 200) {
            sessionStorage.setItem("mes_nal", xhr.responseText);
            if (xhr.responseText == "true") {

                s.textContent = "У вас есть непрочитанные сообщения";
                
            }
            else {
                s.textContent = "У вас нет непрочитанных сообщений";
                
            }
        }

    }
    xhr.send();
}
window.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem("mes_hash") == null) {
        sessionStorage.setItem("mes_hash", "@");
    }
    UpdateContent();
    //alert("init");
});
setInterval(() => UpdateContent(), 1000);