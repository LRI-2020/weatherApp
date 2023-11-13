(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();let v="https://api.openweathermap.org/data/2.5/forecast?",w="85b92166ada5be51f86f3ae2609970f7";function g(e,t){return`https://openweathermap.org/img/wn/${e}${t}.png`}function L(e){let t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][e.getDay()],n=t[e.getMonth()];return`${r} ${n}, ${e.getDate()}`}async function b(e){return(await fetch("./assets/data/countryCodes.json").then(i=>i.json())).find(i=>i.name.split(" ")[0].toLowerCase()===e.toLowerCase()).code}async function E(){let e=document.querySelector("select#countries");(await fetch("./assets/data/countryCodes.json").then(r=>r.json())).map(r=>r.name).forEach(r=>{let n=document.createElement("option");n.setAttribute("value",r),n.innerText=r,e.appendChild(n)})}function f(e){let t=e.children.item(0);t.classList.remove("d-none"),t.classList.add("active")}function D(e=new Date){return e.setDate(e.getDate()+1),e}function $(e){return v+`q=${e}&appid=${w}&units=metric`}async function M(e,t){return await b(t).then(i=>v+`zip=${e},${i}&appid=${w}&units=metric`)}async function S(e){return await fetch(e).then(t=>t.json()).catch(t=>t)}class A{constructor(t,i,r,n,a,l,s=null,c=null,u=null,d=null){this.date=t,this.main=i,this.description=r,this.temp=n,this.city=a,this.humidity=s,this.visibility=c,this.airPressure=u,this.wind=d,this.icon=l}}function x(e){let t=[];for(let i of e.list)t.push(O(e,e.list.indexOf(i)));return t}function O(e,t){let i=e.list[t];return new A(new Date(i.dt*1e3),i.weather[0].main,i.weather[0].description,i.main.temp,e.city.name,i.weather[0].icon,i.main.humidity,i.visibility,i.main.pressure,i.wind.speed)}async function W(e){let t=$(e);return await S(t).then(i=>x(i))}async function H(e,t){let i=await M(e,t);return await S(i).then(r=>x(r))}function C(e,t){let i=new Date(t);i.setHours(0,0,0,0);let r=new Date(new Date().setDate(i.getDate()+1));return r.setHours(0,0,0,0),e.filter(n=>n.date>=i.getTime()&&n.date<r.getTime())}let F=`<div class="row">
                <div class="col">
                    
                    <p class="nowCity"> </p>

                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <p class="nowDate"> </p>
                    
                </div>
                <div class="col weatherMain">
                    <p class="nowTemp"> </p>
                    <img class="nowImg" src="" alt="weatherIcon">
                    <p class="nowDescription"> </p>
                </div>
               
            </div>
            <div class="row text-center">
                <div class="col humidity">
                    Humidity
                    <p class="nowHumidityValue weatherData"></p>
                </div>
                <div class="col visibility">
                    Visibility
                    <p class="nowVisibilityValue weatherData"></p>

                </div>
                <div class="col air">
                    Air
                    <p class="nowAirValue weatherData"></p>

                </div>
                <div class="col wind">
                    Wind
                    <p class="nowWindValue weatherData"></p>

                </div>
         </div>`;function I(e,t,i){Highcharts.chart(e,{title:{text:"Daily temperatures",align:"left"},yAxis:{title:{text:"Temperatures - °C"}},xAxis:{type:"datetime",startOnTick:!0},legend:{layout:"vertical",align:"right",verticalAlign:"middle"},plotOptions:{series:{label:{connectorAllowed:!1},pointStart:t,pointInterval:3*3600*1e3}},series:[{name:"Daily Temperatures",data:i}],responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}})}function V(e,t,i){let r=document.createElement("div");r.classList.add("d-none","tempChart"),r.setAttribute("id",`tempChart${e}`),document.querySelector(".chartsWeather").appendChild(r),I(`tempChart${e}`,t,i)}function p(e){let t=document.querySelector(".allWeather");for(let i of e){let r=document.createElement("div");r.classList.add("currentWeather","d-none","col","mx-auto"),r.innerHTML=F;let n=r.querySelector(".nowCity");n.innerText=i.city;let a=r.querySelector(".nowDate");a.innerText=L(i.date);let l=r.querySelector(".nowTemp");l.innerText=`${i.temp} °C`,r.querySelector(".nowImg").setAttribute("src",g(i.icon,"@4x"));let c=r.querySelector(".nowDescription");c.innerText=i.description;let u=r.querySelector(".nowHumidityValue");u.innerText=`${i.humidity}%`;let d=r.querySelector(".nowVisibilityValue");d.innerText=`${i.visibility/1e3}KM`;let q=r.querySelector(".nowAirValue");q.innerText=`${i.airPressure} hPa`;let T=r.querySelector(".nowWindValue");T.innerText=`${i.wind} mph`,t.appendChild(r);let y=t.children.item(0);y.classList.remove("d-none"),y.classList.add("active")}}function h(e){let t=[],i=new Date(Date.now());for(let l=0;l<5;l++)t.push(new Date(i)),D(i);let r=[];for(let l of t)r.push(C(e,t[t.indexOf(l)]));let n=document.querySelector(".detailedWeather"),a=document.querySelector(".chartsWeather");for(let l of r)G(l,r.indexOf(l));f(n),f(a)}function B(e){let t=document.createElement("div");return t.classList.add("card","col","mx-1","weather3Hours","text-center"),t.innerHTML=`<div class="card-header">
                         <p class="hour"> Hour </p>
                      </div>
                        <div class="card-body">
                         <img class="weatherImg" src=""> 
                            <p class="description"> Description </p>
                        </div>
                        <div class="card-footer weatherMain">
                            <p class="temp"> Temp </p>
                        </div>`,t.querySelector(".hour").innerText=`${e.date.getHours()}:${e.date.getMinutes()}`,t.querySelector(".description").innerText=e.description,t.querySelector(".weatherImg").setAttribute("src",g(e.icon,"")),t.querySelector(".temp").innerText=`${e.temp}°`,t}function G(e,t){let i=document.querySelector(".detailedWeather"),r=document.createElement("div");r.classList.add("d-none","details","d-flex","-row","m-1");for(let l of e)r.appendChild(B(l));i.appendChild(r);let n=e[0].date,a=e.map(l=>l.temp);V(t,n.getTime(),a)}async function N(){return await W("bruxelles").then(e=>{let t=m(e);return p(t),h(e),e})}function P(){let e=document.querySelector(".cityForm");e.addEventListener("submit",async function(t){t.preventDefault(),document.querySelector(".allWeather").innerHTML="",document.querySelector(".detailedWeather").innerHTML="",await j(e)})}function z(){document.querySelector(".previous").addEventListener("click",()=>{let i=document.querySelector(".currentWeather.active"),r=i.previousSibling,n=document.querySelector(".details.active"),a=n.previousSibling,l=document.querySelector(".tempChart.active"),s=l.previousSibling;o(i,r,"currentWeather"),o(n,a,"details"),o(l,s,"tempChart")}),document.querySelector(".next").addEventListener("click",()=>{let i=document.querySelector(".currentWeather.active"),r=i.nextSibling,n=document.querySelector(".details.active"),a=n.nextSibling,l=document.querySelector(".tempChart.active"),s=l.nextSibling;o(i,r,"currentWeather"),o(n,a,"details"),o(l,s,"tempChart")})}function o(e,t,i){t!==null&&t.classList!==void 0&&t.classList.contains(i)&&(e.classList.toggle("d-none"),e.classList.toggle("active"),t.classList.toggle("d-none"),t.classList.toggle("active"))}async function j(e){let t=e.querySelector("input#cityName").value,i=e.querySelector("input#zipCode").value,n=e.querySelector("select#countries").value;if(t!==null&&t.trim()!=="")return await W(t).then(a=>{let l=m(a);return p(l),h(a),a});if(i!==null&&i.trim()!==""&&n!==null&&n.trim()!=="")return await H(i,n).then(a=>{let l=m(a);return p(l),h(a),a});throw new Error("must enter a city or a zipCode and country")}function m(e){let t=[],i=new Date(Date.now());for(let r=0;r<5;r++){let n=C(e,i.getTime());r===0?t.push(n[0]):t.push(n[3]),i=D(i)}return t}E();await N();P();z();
