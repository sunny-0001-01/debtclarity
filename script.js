function num(id){ return parseFloat(document.getElementById(id).value); }

function interestCalc(){

let balanceVal=num("balance");
let rate=num("apr")/100/12;
let payment=num("paymentA");

if(!balanceVal||!rate||!payment){
alert("Please enter all values");
return;
}

let b=balanceVal;
let totalInterest=0;
let months=0;
let arr=[];
let rows="";

while(b>0 && months<600){
let interest=b*rate;
let principal=payment-interest;
if(principal<=0)break;

b-=principal;
totalInterest+=interest;
months++;
arr.push(b);

rows+=`<tr>
<td>${months}</td>
<td>$${interest.toFixed(2)}</td>
<td>$${principal.toFixed(2)}</td>
<td>$${b.toFixed(2)}</td>
</tr>`;
}

schedule.innerHTML=rows;

let realCost = balanceVal + totalInterest;

// +$50 simulation
let b2=balanceVal,m2=0,i2=0;
while(b2>0 && m2<600){
let it=b2*rate;
let pr=(payment+50)-it;
if(pr<=0)break;
b2-=pr;i2+=it;m2++;
}

summary.innerHTML=`
<h2>Debt Summary</h2>

<p><b>Total Interest:</b> $${totalInterest.toFixed(2)}</p>
<p><b>Total Repayment:</b> $${realCost.toFixed(2)}</p>
<p><b>Payoff Time:</b> ${months} months (~${(months/12).toFixed(1)} years)</p>

<hr>

<h3 style="color:#2563eb">Smart Insight</h3>

<p>If you pay <b>$50 more per month</b>, you could finish <b>${months-m2} months sooner</b>
and save about <b>$${(totalInterest-i2).toFixed(2)}</b> in interest.</p>
`;

draw(arr);
}

function draw(arr){
let c=document.getElementById("chart");
let x=c.getContext("2d");
c.width=c.offsetWidth;c.height=260;
let m=Math.max(...arr);
x.beginPath();
arr.forEach((v,i)=>{
let X=i*(c.width/arr.length);
let Y=c.height-(v/m*c.height);
i?x.lineTo(X,Y):x.moveTo(X,Y);
});
x.strokeStyle="#2563eb";
x.lineWidth=3;
x.stroke();
}