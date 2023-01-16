var JSonClass=new class{
    author;
    comment;
}
setInterval(function(){
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://localhost:5000/WeatherForecast/GetContent');
    xhr.onload=function(){
       if(xhr.status==200){
             var j_cont=JSON.parse(xhr.responseText);//Возвращает массив формата JsonClass (поля текстового типа)
           var d = document.getElementById("data_cont");
           d.innerHTML="";//очищаем сообщение (изменение состояния для react)
           for (var i = 0; i < j_cont.length; i++) {
               var el = document.createElement('div');
               var lab = document.createElement('label');
               lab.textContent = j_cont[i].author;
               el.appendChild(lab);
               var tetxa = document.createElement('textarea');
               tetxa.value = j_cont[i].comment;
               el.appendChild(tetxa);
               d.appendChild(el);
           }
       }
    }
    xhr.send();
}
,1000);