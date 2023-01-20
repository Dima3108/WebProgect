//Message public string message, author, hesh;
var JsonModel = class {
    author;
    message;
   // hesh;
    constructor(a, m) {
        this.author = String(a);
        this.message = String(m);
    }
}
function DownloadFiles(lab) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Chat/DownloadFiles/',false);
    var frd = new FormData();
    frd.append("label", lab);
    xhr.onload = function () {
        if (xhr.status == 200) {
            var json = String(xhr.response);
            sessionStorage.setItem("json_dat", json);
        }
    }
    xhr.send(frd);
}
function UpdateContentChat() {
//var xhr = new XMLHttpRequest();
    /*xhr.open('GET', '/Chat/IsUpdate?hesh=' + sessionStorage.getItem("mes_hash"));
   
    xhr.onload = function () {
        if (xhr.status == 200) { */
    //let s = document.getElementById('text_m');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Chat/IsUpdate?hesh=' + sessionStorage.getItem("mes_hash"));

    xhr.onload = function () {
        if (xhr.status == 200) {
            sessionStorage.setItem("mes_nal", xhr.responseText);
if (sessionStorage.getItem("mes_nal") != null && sessionStorage.getItem("mes_nal")=="true") {
               
                var xhr2 = new XMLHttpRequest();
                xhr2.open('GET', '/Chat/GetCurrentHesh');
               
                xhr2.onload = function () {
                    if (xhr2.status == 200) {
                        sessionStorage.setItem("mes_hash", xhr2.responseText);
                    }
                }
                xhr2.send();
                var xhr3 = new XMLHttpRequest();
                xhr3.open('POST', '/Chat/GetMessages');
                let m_hesh = sessionStorage.getItem("mes_hash");
                xhr3.onload = function () {
                    if (xhr3.status == 200) {

                        var json_d = JSON.parse(xhr3.responseText
                            /*function (a, m, h) {
                            return new JsonModel(m, a);
                            }*/
                        );
                       // alert(json_d);
                        var d = document.getElementById('chat_cont');
                       // d.innerHTML = "";
                        for (var i = 0; i < json_d.length; i++) {
                            var el = document.createElement('div');
                            var lab = document.createElement('label');
                            lab.textContent = json_d[i].author;
                            el.appendChild(lab);
                            var tetxa = document.createElement('textarea');
                            tetxa.value = json_d[i].message;
                            var a_ = document.createElement('a');
                            a_.href = "/Chat/DownloadFiles/?label=" + json_d[i].label;
                            a_.textContent = "Скачать файлы";
                            el.appendChild(a_);
                            el.appendChild(tetxa);
                            //DownloadFiles(String(json_d[i].label));

                            d.appendChild(el);
                        }
                        var xhr_h = new XMLHttpRequest();
                        xhr_h.open('GET', '/Chat/GetCurrentHesh/');
                        xhr_h.onload = function () {
                            if (xhr_h.status == 200) {
                                sessionStorage.setItem("mes_hash", String(xhr_h.response));
                            }
                           
                        }
                        xhr_h.send();
                    }
                }
        var fromd = new FormData();
        fromd.append("label", m_hesh);
        xhr3.send(fromd);
    }
           /* if (xhr.responseText == "true") {

                s.textContent = "У вас есть непрочитанные сообщения";

            }
            else {
                s.textContent = "У вас нет непрочитанных сообщений";

            }*/
        }

    }
    xhr.send();
    
   
}

setInterval(() => UpdateContentChat(), 1000);

