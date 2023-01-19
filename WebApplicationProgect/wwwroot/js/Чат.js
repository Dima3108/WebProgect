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

function UpdateContent() {
//var xhr = new XMLHttpRequest();
    /*xhr.open('GET', '/Chat/IsUpdate?hesh=' + sessionStorage.getItem("mes_hash"));
   
    xhr.onload = function () {
        if (xhr.status == 200) { */
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
                 
                xhr3.onload = function () {
                    if (xhr3.status == 200) {
                        var json_d = JSON.parse(xhr3.responseText
                            /*function (a, m, h) {
                            return new JsonModel(m, a);
                            }*/
                        );
                       // alert(json_d);
                        var d = document.getElementById('chat_cont');
                        d.innerHTML = "";
                        for (var i = 0; i < json_d.length; i++) {
                            var el = document.createElement('div');
                            var lab = document.createElement('label');
                            lab.textContent = json_d[i].author;
                            el.appendChild(lab);
                            var tetxa = document.createElement('textarea');
                            tetxa.value = json_d[i].message;
                            el.appendChild(tetxa);
                            d.appendChild(el);
                        }
                    }
                }
                xhr3.send();
            }
     /*   }
        
    }
    xhr.send();*/
}
/*window.addEventListener('DOMContentLoad', function () {
    if (sessionStorage.getItem("mes_hash") == null) {
        sessionStorage.setItem("mes_hash", "@");
    }
    UpdateContent();
});*/
setInterval(() => UpdateContent(), 1000);

