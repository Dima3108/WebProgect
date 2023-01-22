export  function ReadFile(filebase64) {
    var v = atob(filebase64);
    var mas = new Uint8Array[v.length];
    for (var i = 0; i < v.length; i++) {
        mas[i] = v.charCodeAt(i)%256;
    }
    return mas;
}
export  function GetFileNames() {
    if (sessionStorage.getItem('files_inf') != null && sessionStorage.getItem('files_inf')!="") {
        var str = sessionStorage.getItem('files_inf');
        var strin_ = str.replace(" ", "").split("\n");
        return strin_;
    }
    return new string[0];
}