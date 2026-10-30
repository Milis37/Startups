(() => {
  // Change this to the email address you actually monitor before launch.
  const CONTACT_EMAIL = "hallo@werkei.de";
  const jobs = [
    {id:1,district:"Sonnenberg",title:{de:"Wohnung nach Auszug reinigen",en:"Move-out flat cleaning"},rooms:2,size:54,hours:3,pay:45,x:27,y:29},
    {id:2,district:"Kaßberg",title:{de:"Altbau: gründliche Reinigung",en:"Deep clean in a period flat"},rooms:3,size:78,hours:5,pay:70,x:28,y:68},
    {id:3,district:"Zentrum",title:{de:"Kleine Wohnung vorbereiten",en:"Prepare a small flat"},rooms:1,size:32,hours:2,pay:30,x:52,y:49},
    {id:4,district:"Hilbersdorf",title:{de:"Fenster und Böden reinigen",en:"Clean windows and floors"},rooms:2,size:61,hours:4,pay:60,x:77,y:24}
  ];
  const copy = {
    de:{navOwners:"Für Eigentümer",eyebrow:"CHEMNITZ · FLEXIBEL · DIREKT",headline:'Wohnungen reinigen.<br><span>Geld verdienen.</span>',intro:"Werkei bringt Eigentümer und zuverlässige Reinigungskräfte in Chemnitz zusammen. Entdecke kleine Jobs in deiner Nähe und frage direkt an.",seeJobs:"Jobs entdecken",heroNote:"Kostenlos ansehen · Anfrage per E-Mail",artLabel:"Ein guter Job<br>gleich um die Ecke",jobsEyebrow:"DIE ERSTEN JOBS",jobsTitle:"Finde deinen nächsten Job.",demo:"Beispieldaten",jobsIntro:"Wähle einen Job aus der Karte oder den Angeboten. Alle Angaben sind Beispiele für die Testphase.",mapTitle:"CHEMNITZ, DE",mapNote:"Schematische Karte · Beispielstandorte",mapLegend:"Tippe auf einen Preis, um den Job zu sehen",howEyebrow:"EINFACH LOSLEGEN",howTitle:"Drei Schritte. Ein guter Nebenjob.",step1Title:"Job entdecken",step1Text:"Finde einen passenden Reinigungsjob in deiner Nähe.",step2Title:"Direkt anfragen",step2Text:"Schreib uns per E-Mail. Wir verbinden dich mit dem Eigentümer.",step3Title:"Reinigen & verdienen",step3Text:"Stimme Details und Bezahlung direkt mit dem Eigentümer ab.",ownerEyebrow:"FÜR EIGENTÜMER",ownerTitle:"Wohnung bereit machen. Helfer finden.",ownerText:"Du brauchst Unterstützung bei der Reinigung? Schick uns Ort, Größe und deinen Wunschtermin. Wir melden uns persönlich.",ownerButton:"Job anfragen",footerText:"Ein lokaler Test für Chemnitz.",legalLink:"Impressum & Datenschutz",rooms:"Zi.",hours:"Std.",earn:"Verdienst",request:"Diesen Job anfragen",mailSubject:"Werkei Job-Anfrage",ownerSubject:"Werkei: Reinigungsjob anbieten",mapAria:"Schematische Karte mit Beispieljobs in Chemnitz"},
    en:{navOwners:"For property owners",eyebrow:"CHEMNITZ · FLEXIBLE · LOCAL",headline:'Clean homes.<br><span>Earn money.</span>',intro:"Werkei connects property owners with reliable cleaners in Chemnitz. Find small local jobs and ask about them directly.",seeJobs:"Explore jobs",heroNote:"Browse for free · Ask by email",artLabel:"A good local job<br>around the corner",jobsEyebrow:"FIRST AVAILABLE JOBS",jobsTitle:"Find your next job.",demo:"Sample listings",jobsIntro:"Choose a job from the map or the list. These details are examples for the test phase.",mapTitle:"CHEMNITZ, DE",mapNote:"Illustrative map · sample locations",mapLegend:"Tap a price to view the job",howEyebrow:"GET STARTED",howTitle:"Three steps to a useful side job.",step1Title:"Find a job",step1Text:"Browse cleaning jobs in your area.",step2Title:"Ask directly",step2Text:"Email us and we will connect you with the property owner.",step3Title:"Clean & earn",step3Text:"Agree on the details and payment directly with the owner.",ownerEyebrow:"FOR PROPERTY OWNERS",ownerTitle:"Get your flat ready. Find a helping hand.",ownerText:"Need help with a clean? Send us the location, size and your preferred date. We will get back to you personally.",ownerButton:"Offer a job",footerText:"A local pilot for Chemnitz.",legalLink:"Legal notice & privacy",rooms:"rooms",hours:"hrs",earn:"Pay",request:"Ask about this job",mailSubject:"Werkei job enquiry",ownerSubject:"Werkei: offer a cleaning job",mapAria:"Illustrative map of sample jobs in Chemnitz"}
  };
  let language="de", selected=1;
  const $=(selector,root=document)=>root.querySelector(selector);
  const list=$("#jobList"), pins=$("#mapPins");
  function mail(subject,body="") { return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body?`&body=${encodeURIComponent(body)}`:""}`; }
  function renderJobs(){
    const t=copy[language];
    list.innerHTML=jobs.map(job=>`<article class="job-card${job.id===selected?" selected":""}" data-job="${job.id}" tabindex="0" aria-label="${job.title[language]}, ${job.district}, ${job.pay} euros"><div><h3>${job.title[language]}</h3><p>${job.district}</p><p class="job-meta"><span>${job.rooms} ${t.rooms}</span><span>${job.size} m²</span><span>${job.hours} ${t.hours}</span></p></div><div class="job-price"><strong>${job.pay} €</strong><span>${t.earn}</span></div><div class="job-actions"><a class="job-link" href="${mail(`${t.mailSubject} #${job.id} – ${job.district}`,`${job.title[language]}\n${job.district}\n${job.pay} €`)}">${t.request} ↗</a></div></article>`).join("");
    pins.innerHTML=jobs.map(job=>`<button class="map-pin${job.id===selected?" active":""}" type="button" data-job="${job.id}" style="left:${job.x}%;top:${job.y}%" aria-label="${job.pay} euros, ${job.district}">${job.pay} €</button>`).join("");
    $("#districtMap").setAttribute("aria-label",t.mapAria);
  }
  function setLanguage(next){
    language=next;document.documentElement.lang=next;
    document.querySelectorAll("[data-copy]").forEach(el=>{const key=el.dataset.copy;if(copy[next][key])el.innerHTML=copy[next][key];});
    document.querySelectorAll(".language-button").forEach(button=>{const active=button.dataset.language===next;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});
    $("#ownerEmail").href=mail(copy[next].ownerSubject);renderJobs();
  }
  function selectJob(id){selected=Number(id);renderJobs();}
  document.addEventListener("click",event=>{
    const langButton=event.target.closest("[data-language]");if(langButton){setLanguage(langButton.dataset.language);return;}
    const jobTarget=event.target.closest("[data-job]");if(jobTarget){if(event.target.closest("a"))return;selectJob(jobTarget.dataset.job);}
  });
  document.addEventListener("keydown",event=>{const target=event.target.closest(".job-card");if(target&&(event.key==="Enter"||event.key===" ")){event.preventDefault();selectJob(target.dataset.job);}});
  $("#year").textContent=new Date().getFullYear();setLanguage("de");
})();
