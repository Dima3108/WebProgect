function ReadFile(filebase64) {
    alert(filebase64);
    //var v = atob(filebase64);
    var mas = new Uint8Array(filebase64.length);
    for (var i = 0; i < filebase64.length; i++) {
        mas[i] = filebase64.charCodeAt(i) % 256;
    }
    return mas;
}
 function GetFileNames() {
    if (sessionStorage.getItem('files_inf') != null && sessionStorage.getItem('files_inf') != "") {
        var str = sessionStorage.getItem('files_inf');
        var strin_ = str.replace(" ", "").split("\n");
        const m = [];
        for (var i = 0; i < strin_.length; i++) {
            if (strin_[i] != null && strin_[i] != "") {
                m.push(String(strin_[i]));
            }
        }
        return m;
    }
     return null;
}
const tableencode = ['Q', 'W', 'E', 'R', 'T', 'Y',
    'U', 'I', 'O', 'P', 'A', 'S',
    'D', 'F', 'G', 'H'];
function encode_buffer(buffer) {
    let s = String("");
   // alert(s.length);
   // alert(buffer.length + "&");
    for (var i = 0; i < buffer.length; i++) {
        var v = Number(buffer[i]);
        s += String(tableencode[Math.trunc( Number(v / 16))]);
        s +=String( tableencode[Number(v % 16)]);
       
           
       // alert(Number(buffer[i]));
    }
   // alert(tableencode.length);
    //alert(s);
   
    //alert(s.length);
    return s;
}
var p = document.getElementById('page_n');
var val = Number(p.value);
for (var i = 0; i < 3; i++) {
    var t = document.getElementById('ifr' + i);
    
    t.style = "color:black";
    if (i == val && val!=-1) {
        t.style = "color:green";
    }
   
}
var file_but = document.getElementById('add_f_but');
file_but.addEventListener('click', function () {
    var fdial = document.createElement('input');
    fdial.type = "file";
   
    let f_names = "";
    const max_size = 1024 * 1024 * 3;
    let f_name = "";
    fdial.onchange = function () {
        for (var i = 0; i < fdial.files.length; i++) {
            if (fdial.files[i].size <= max_size) {

               
                const reader = new FileReader();
                f_name = fdial.files[i].name;
                var file_ = fdial.files[i];
                file_.arrayBuffer().then((value) => {
                   // alert(value);
                    var ar = new Uint8Array(value);
                    var r = encode_buffer(ar);
                  //  alert(ar.length);
                   // alert(encode_buffer(ar).length);
                     sessionStorage.setItem(f_name,r);
                    //alert(reader.result.length);
                   // alert(sessionStorage.getItem(f_name));
                    //f_names += f_name + "\n";
                    // alert(f_names);
                    alert("\n файл " + f_name + " кэширован");
                    document.getElementById('file_load_log').textContent += "\n файл " + f_name + " кэширован";
                    if (sessionStorage.getItem('files_inf') != null) {
                        sessionStorage.setItem('files_inf', f_name + "\n" + sessionStorage.getItem('files_inf'));
                    }
                    else {
                        sessionStorage.setItem('files_inf', f_name);
                    }
                })
               
                
            }
            else {
                document.getElementById('file_error_log').textContent += "размер файла " + fdial.files[i].name + " превышает 3 мб\n";
            }
        }
        
        //sessionStorage.setItem('files_inf', f_names);
        
    }
    fdial.click();
});
class JsonFile  {
    user;
    fname;
    content;
    constructor(u, f, c) {
        this.user = u;
        this.fname = f;
        this.content = c;
    }
}

var b = document.getElementById('res_b');
b.addEventListener('click', function () {
   /* let s_cont = "";
    for (var e = 0; e < 3 * 1024 * 1024; e++) {
        s_cont += "A";
    }*/
    var xhrlab = new XMLHttpRequest();
    let _LABEL_ = String(document.getElementById('us_n').value);
   // let conrol_LValue = _LABEL_;
    xhrlab.open('GET', '/Chat/GetTime/');
xhrlab.send();
    xhrlab.onload = function () {
        if (xhrlab.status == 200) {
           
            _LABEL_ +=String( xhrlab.response);
var files_n = GetFileNames();
    if (files_n != null && files_n.length > 0) {
       
        for (var i = 0; i < files_n.length; i++) {
            
 var xhr_f = new XMLHttpRequest();
            var formdat = new FormData();
           
            formdat.append("f_name", files_n[i]);
            formdat.append("content", sessionStorage.getItem(files_n[i]));
            formdat.append("label", _LABEL_);
            xhr_f.open('POST', '/Chat/WriteFileToServer/');
            xhr_f.send(formdat);
               
        }
       
        }
var k = document.getElementById('res_b');
    k.disabled = "disabled";
    var loc = window.location.protocol + window.location.hostname;
    if (window.location.port != "") {
        loc += ":" + window.location.port;
    }
    var quest = '/Chat/ReadMessage/?user=' + document.getElementById('us_n').value + '&message=' + document.getElementById('us_c').value +
        "&label=" + _LABEL_;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', quest);
    xhr.send();
    xhr.onload = function () {
        var k1 = document.getElementById('res_b');
        k1.disabled = "";
        if (xhr.status == 200) {
            var v = Number(xhr.response);
            if (v >= 0) {
                var form_div = document.getElementById("contact_form");
                form_div.style = "display:none";
                var resf = document.getElementById("ot_cont");
                resf.style = "display:block";
               
            }

        }
        };


           
        }




    }
   
   
    
    
 
});