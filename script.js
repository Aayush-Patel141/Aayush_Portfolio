const data=window.PORTFOLIO_ITEMS||[];
const $=s=>document.querySelector(s);
const categoryMap={
 "College Events and Competitions":"College Events",
 "Cultural Festivals and Celebrations":"Cultural Festivals",
 "Cultural and Festival Events":"Cultural Festivals",
 "Workshops Awareness and Student Development":"Workshops & Student Development",
 "Special Days and Tributes":"Special Days & National Celebrations",
 "National Days and Commemorations":"Special Days & National Celebrations",
 "Product Food and Creative Promotional":"Promotional & Product Designs",
 "Sports and Gaming":"Sports & Gaming",
 "08_Sports_and_Gaming":"Sports & Gaming",
 "Educational Visits and Career":"Educational Visits & Career",
 "Awareness Advocacy and Civic Engagement":"Awareness Campaigns",
 "Environment and Cleanliness":"Environment & Cleanliness",
 "Health Fitness and Wellbeing":"Health & Wellbeing",
 "NSS Programmes Orientation and Administration":"Programmes & Student Activities",
 "Community Service and Outreach":"Community & Social Outreach",
 "Competitions and Creative Activities":"Competitions & Creative Activities",
 "":""
};
const order=["College Events","Cultural Festivals","Workshops & Student Development","Special Days & National Celebrations","Awareness Campaigns","Environment & Cleanliness","Health & Wellbeing","Community & Social Outreach","Programmes & Student Activities","Competitions & Creative Activities","Sports & Gaming","Promotional & Product Designs","Educational Visits & Career","ID Card Designs"];
const idFolder="4 ID CARD DESIGNS", certFolder="1 CERTIFICATIONS";
const pretty=s=>s.replace(/^\d+[_\s-]*/,'').replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase());
const works=data.filter(x=>x.folder!==certFolder);
const certs=data.filter(x=>x.folder===certFolder);
const groups={};
for(const x of works){
 let heading=x.folder===idFolder?"ID Card Designs":(categoryMap[x.subcategory]||pretty(x.subcategory)||"Other Creative Work");
 (groups[heading]??=[]).push(x);
}
const headings=[...order.filter(x=>groups[x]?.length),...Object.keys(groups).filter(x=>!order.includes(x))];
const allForLightbox=[...works,...certs];
$('#totalCount').textContent=`${works.length} WORKS`;
$('#year').textContent=new Date().getFullYear();
function card(x){const i=allForLightbox.indexOf(x);return `<article class="work-card" data-index="${i}"><div class="thumb"><img loading="lazy" src="${encodeURI(x.src)}" alt="${x.name} — ${pretty(x.subcategory||x.folder)}"></div><div class="view-mark">↗</div><div class="card-info"><span>${x.name}</span><span>VIEW ↗</span></div></article>`}
$('#workSections').innerHTML=headings.map((h,i)=>`<section class="category-section"><div class="category-heading"><span class="category-number">${String(i+1).padStart(2,'0')}</span><h3>${h}</h3><span class="category-count">${groups[h].length} WORKS</span></div><div class="gallery">${groups[h].map(card).join('')}</div></section>`).join('');
$('#certGallery').innerHTML=certs.map(card).join('');
function showLightbox(index){let x=allForLightbox[index];$('#lbImage').src=encodeURI(x.src);$('#lbImage').alt=x.name;$('#lbName').textContent=x.name+' · '+(x.folder===certFolder?'Certification':pretty(x.subcategory||x.folder));$('#lbPosition').textContent=`${index+1} / ${allForLightbox.length}`;$('#lightbox').classList.add('open');$('#lightbox').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
let lightIndex=0;
function closeLightbox(){$('#lightbox').classList.remove('open');$('#lightbox').setAttribute('aria-hidden','true');document.body.style.overflow='';}
function step(n){lightIndex=(lightIndex+n+allForLightbox.length)%allForLightbox.length;showLightbox(lightIndex);}
document.addEventListener('click',e=>{let c=e.target.closest('.work-card');if(c){lightIndex=Number(c.dataset.index);showLightbox(lightIndex);}});
$('#lbClose').onclick=closeLightbox;$('#lbPrev').onclick=()=>step(-1);$('#lbNext').onclick=()=>step(1);
$('#lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')closeLightbox();});
document.addEventListener('keydown',e=>{if(!$('#lightbox').classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1);});
$('#menuToggle').onclick=()=>$('#nav').classList.toggle('open');
$('#nav').addEventListener('click',e=>{if(e.target.tagName==='A')$('#nav').classList.remove('open');});
