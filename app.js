/* EDIT YOUR DETAILS HERE */
var EMAIL = "donaldomollo44@gmail.com";

// [icon, title, description, [bullets]]
var services = [
 ["&#127968;","Residential construction","Villas, apartments and holiday homes built for the coast.",["New builds","Extensions","Renovations"]],
 ["&#127976;","Hotels and commercial","Hotels, lodges, shops and offices delivered on schedule.",["Hospitality","Retail","Offices"]],
 ["&#128208;","Design and planning","Architectural drawings, approvals and bills of quantities.",["Plans","Permits","Costing"]],
 ["&#129521;","Foundations and structure","Excavation, footings, columns, slabs and masonry.",["Reinforced concrete","Blockwork","Roofing"]],
 ["&#128739;","Roads and earthworks","Site clearing, grading, drainage and access roads.",["Grading","Culverts","Murram works"]],
 ["&#127946;","Swimming pools","Pool construction with tiling, plant room and finishing.",["Excavation","Tiling","Filtration"]],
 ["&#129683;","Boundary walls and gates","Perimeter walls, fencing and secure entrances.",["Stone walls","Fencing","Gatehouses"]],
 ["&#127912;","Finishing and interiors","Plastering, tiling, painting, ceilings and joinery.",["Tiling","Painting","Fitted joinery"]],
 ["&#128295;","Maintenance and repairs","Waterproofing, structural repairs and upkeep.",["Roof repairs","Waterproofing","Repainting"]]
];

// [icon, name, category, description, price per day in KES]
var machines = [
 ["&#128668;","Excavator (20 ton)","Excavation","Trenching, foundations, site clearing.",35000],
 ["&#128679;","Backhoe loader","Excavation","Versatile digging and loading for small sites.",22000],
 ["&#127959;","Bulldozer","Earthworks","Clearing and levelling large plots.",40000],
 ["&#128666;","Tipper truck (10 ton)","Transport","Haul sand, ballast, murram and spoil.",18000],
 ["&#128734;","Road roller","Earthworks","Compaction for roads, yards and platforms.",25000],
 ["&#129514;","Concrete mixer","Concrete","Diesel drum mixer for steady on-site batching.",5000],
 ["&#129704;","Concrete vibrator set","Concrete","Poker vibrator for solid, void-free pours.",2500],
 ["&#9889;","Generator (30 kVA)","Power","Reliable power for tools and site offices.",8000]
];

/* Photos found in the site folder ("" = keep the icon) */
var svcImgs=["img-residential.jpg","img-commercial.jpg","img-design.jpg","img-foundations.jpg","img-roads.jpg","img-pools.jpg","img-walls.jpg","img-finishing.jpg","img-repairs.jpg"];
var machImgs=["mach-excavator.jpg","mach-backhoe.jpg","mach-bulldozer.jpg","mach-tipper.jpg","mach-roller.jpg","mach-mixer.jpg","mach-vibrator.jpg","mach-generator.jpg"];

/* SITE LOGIC */
var st=document.createElement("style");
st.textContent=".svc .pic{height:230px;font-size:0;background-size:cover;background-position:center}.svc .body{gap:4px}.mach .pic.ph{height:200px;font-size:0;background-size:cover;background-position:center}";
document.head.appendChild(st);

var fmt=function(n){return "KES "+n.toLocaleString("en-KE")};
function listHtml(s){return '<ul>'+s[3].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
function svcCard(s,img,full){
  if(!img){return '<div class="card"><div class="ic">'+s[0]+'</div><h3>'+s[1]+'</h3><p>'+s[2]+'</p>'+(full?listHtml(s):'')+'</div>'}
  return '<div class="card mach svc"><div class="pic" style="background-image:url('+img+')" role="img" aria-label="'+s[1]+'"></div><div class="body"><h3>'+s[1]+'</h3><p>'+s[2]+'</p>'+(full?listHtml(s):'')+'</div></div>';
}
function machCard(m,i){
  var img=machImgs[i];
  var pic=img?'<div class="pic ph" style="background-image:url('+img+')" role="img" aria-label="'+m[1]+'"></div>':'<div class="pic" aria-hidden="true">'+m[0]+'</div>';
  return '<div class="card mach">'+pic+'<div class="body"><span class="tag">'+m[2]+'</span><h3>'+m[1]+'</h3><p>'+m[3]+'</p><div class="price">'+fmt(m[4])+' <small>per day</small></div><label class="pick"><input type="checkbox" data-i="'+i+'"> Add to estimate</label></div></div>';
}
document.getElementById("homeServices").innerHTML=services.slice(0,3).map(function(s,i){return svcCard(s,svcImgs[i],false)}).join("");
document.getElementById("allServices").innerHTML=services.map(function(s,i){return svcCard(s,svcImgs[i],true)}).join("");
document.getElementById("machGrid").innerHTML=machines.map(machCard).join("");

function calc(){
  var d=Math.max(1,parseInt(document.getElementById("days").value)||1),sum=0,names=[];
  document.querySelectorAll("#machGrid input:checked").forEach(function(c){var m=machines[c.dataset.i];sum+=m[4];names.push(m[1])});
  document.getElementById("total").textContent=fmt(sum*d);
  document.getElementById("selList").textContent=names.length?names.join(", ")+" - "+d+(d>1?" days":" day"):"No machines selected";
  window._est=names.length?"I would like to hire: "+names.join(", ")+" for "+d+(d>1?" days":" day")+". Estimate: "+fmt(sum*d)+".":"";
}
document.getElementById("machGrid").addEventListener("change",calc);
document.getElementById("days").addEventListener("input",calc);
document.getElementById("sendQuote").addEventListener("click",function(){
  setTimeout(function(){if(window._est){document.getElementById("cm").value=window._est;document.getElementById("ct").value="Machine hire"}},0);
});
document.getElementById("cform").addEventListener("submit",function(e){
  e.preventDefault();
  var b="Name: "+document.getElementById("cn").value+"\nContact: "+document.getElementById("cc").value+"\nInterest: "+document.getElementById("ct").value+"\n\n"+document.getElementById("cm").value;
  location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent("Enquiry from website")+"&body="+encodeURIComponent(b);
});

var pages=["home","services","machines","about","contact"];
function route(){
  var h=(location.hash||"#home").slice(1);if(pages.indexOf(h)<0)h="home";
  pages.forEach(function(p){document.getElementById("p-"+p).classList.toggle("on",p===h)});
  document.querySelectorAll("nav a").forEach(function(a){a.dataset.p===h?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current")});
  window.scrollTo(0,0);
}
addEventListener("hashchange",route);route();calc();
