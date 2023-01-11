var p = document.getElementById('page_n');
var val = Number(p.value);
for (var i = 0; i < 4; i++) {
    var t = document.getElementById('ifr' + i);
    
    t.style = "color:black";
    if (i == val && val!=-1) {
        t.style = "color:green";
    }
   
}
