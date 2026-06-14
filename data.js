/* ===========================================================================
   PODACI ZA UČENJE — Materijali u elektronici (2026)
   Sav sadržaj na jednom mestu: lekcije, formule, kartice, kviz.
   =========================================================================== */

const TOPICS = [
/* ============================ 1. ENERGY HARVESTING ====================== */
{
  id: "eh",
  title: "Energy Harvesting",
  subtitle: "Prikupljanje energije",
  icon: "⚡",
  color: "#f59e0b",
  oneLiner: "Skupljanje sitne energije iz okoline (svetlost, toplota, vibracije, RF) i pretvaranje u korisnu električnu energiju za napajanje uređaja male potrošnje.",
  sections: [
    { h: "Šta je i čemu služi", html: `
      <p><b>Energy Harvesting (EH)</b> je proces u kome se energija dobija iz izvora u našoj neposrednoj okolini i pretvara u korisnu električnu energiju.</p>
      <ul>
        <li>Daje <b>vrlo malu snagu</b> — dovoljnu samo za elektroniku male potrošnje (senzori, IoT).</li>
        <li>Omogućava rad uređaja <b>tamo gde nema mrežnog napajanja</b> i eliminiše kablove i rezervne baterije.</li>
        <li>Idealno za zamenu baterija koje je <b>nepraktično, skupo ili opasno</b> menjati (npr. senzor uzidan u beton).</li>
      </ul>` },
    { h: "Zašto baš sada?", html: `
      <ol>
        <li><b>Pretvarači su sve bolji</b> — novi materijali i poluprovodnici → veća efikasnost.</li>
        <li><b>Kola troše sve manje</b> — low-power dizajn znači da prikupljena energija postaje dovoljna.</li>
        <li><b>IoT</b> — predviđa se 20–50 milijardi umreženih uređaja; menjati im baterije nije praktično.</li>
      </ol>` },
    { h: "Iz čega se sastoji EH sistem", html: `
      <p>Tri osnovna bloka rade zajedno:</p>
      <ol>
        <li><b>Pretvarač (transducer)</b> — pretvara energiju iz jednog oblika u električnu.</li>
        <li><b>Kondicioner snage (kolo za prilagođenje)</b> — izlaz pretvarača je obično AC, na lošoj frekvenciji/naponu; specijalni <b>DC-DC</b> čip ga pretvara u upotrebljiv napon.</li>
        <li><b>Skladištenje energije</b> — baterija, kondenzator ili superkondenzator; balansira izvor i potrošnju. Nije potrebno ako se energija troši odmah (RFID, bežični prekidači).</li>
      </ol>` },
    { h: "Izvori energije i pretvarači", html: `
      <table>
        <tr><th>Izvor</th><th>Pretvarač</th><th>Princip</th><th>Prilagođenje</th></tr>
        <tr><td>Svetlost</td><td>Solarna ćelija</td><td>Fotonaponski</td><td>DC-DC</td></tr>
        <tr><td>Vibracije / pritisak</td><td>Piezoelektrik, elektromagnetski</td><td>Mehanički</td><td>AC-DC + DC-DC</td></tr>
        <tr><td>Temperaturni gradijent</td><td>TEG (termogenerator)</td><td>Seebeck</td><td>Step-up DC-DC</td></tr>
        <tr><td>EM / RF (3 kHz–300 GHz)</td><td>Antena</td><td>EM talasi (λ=c/f)</td><td>AC-DC</td></tr>
      </table>` },
    { h: "Energija iz ljudskog tela", html: `
      <ul>
        <li><b>Pasivna snaga</b> — iz svakodnevnih radnji (hodanje, disanje, telesna temperatura); korisnik <i>ne primećuje</i> dodatni rad.</li>
        <li><b>Aktivna snaga</b> — korisnik mora <i>svesno</i> nešto da uradi (npr. okretanje ručice) da bi napajao uređaj.</li>
        <li>Termalni: telo–okolina gradijent je samo <b>3–5 °C</b>; TEG daje 50–100 mV/°C → obavezan step-up.</li>
      </ul>` },
    { h: "Komercijalni čipovi (zapamti)", html: `
      <ul>
        <li><b>LTC3108</b> — termoelektrični (Seebeck); radi pri ekstremno niskom ulazu (20–100 mV), transformator + DC/DC podiže napon.</li>
        <li><b>LTC3588-1</b> — piezoelektrični; ima integrisan <b>Grecov spoj (ispravljač) + stabilizator</b>; AC → stabilan DC.</li>
        <li><b>BQ25504</b> — low-power harvesting.</li>
      </ul>` },
    { h: "Prototip — uređaj na kolenu (primer)", html: `
      <p>Pokret kolena → servo motor (TowerPro MG995) → AC napon. Lanac obrade:</p>
      <p style="text-align:center"><b>Servo (AC)</b> → Grecov spoj sa <b>Schottky diodama</b> + kondenzator 1000 µF (ispravljanje/peglanje) → <b>buck konvertor (LM2596)</b> spušta na <b>4.2 V</b> → <b>TP4056</b> punjač → <b>Li-ion 18650</b> (3.7 V) → USB step-up na <b>5 V</b>.</p>
      <p>Schottky dioda se bira zbog <b>malog naponskog praga (V<sub>f</sub>)</b> i brzog uključenja. 4.2 V = gornji prag punjenja Li-ion.</p>` },
    { h: "Zašto je skladištenje neophodno", html: `
      <p>Izvori nisu uvek dostupni: solarne ćelije noću ne rade, piezo nema kretanja u miru, TEG nema uvek gradijent. Zato je potrebno pouzdano čuvanje (Li-ion/Li-polimer, solid-state tankoslojne baterije, superkondenzatori).</p>` },
  ],
  formulas: [
    { name: "Talasna dužina (RF)", formula: "λ = c / f", desc: "c = brzina svetlosti, f = frekvencija. Za RF harvesting antene." },
    { name: "Seebeck (TEG)", formula: "V = S · ΔT", desc: "S = Seebeck koef.; telo daje ~50–100 mV po °C." },
  ],
  numbers: [
    ["Efikasnost piezo konverzije", "≈ 90 %"],
    ["Efikasnost solarne", "≈ 40 % (max)"],
    ["Efikasnost termo (TEG)", "≈ 10 %"],
    ["Gradijent telo–okolina", "3–5 °C"],
    ["TEG izlaz", "50–100 mV/°C"],
  ],
  flashcards: [
    { q: "Tri bloka svakog EH sistema?", a: "1) Pretvarač (transducer), 2) Kondicioner/prilagođenje snage (DC-DC), 3) Skladištenje energije." },
    { q: "Kada skladištenje energije NIJE potrebno?", a: "Kada se energija troši čim se prikupi — npr. RFID i bežični svetlosni prekidači." },
    { q: "Razlika pasivne i aktivne snage iz tela?", a: "Pasivna: iz svakodnevnih radnji, korisnik ne primećuje. Aktivna: korisnik mora svesno da radi da bi uređaj radio." },
    { q: "Koji čip za piezo, koji za termo izvor?", a: "Piezo → LTC3588-1 (ima Grecov spoj+stabilizator). Termo → LTC3108 (step-up sa vrlo niskog napona)." },
    { q: "Zašto Schottky dioda u ispravljaču?", a: "Mali naponski prag Vf i brzo uključenje → manji gubici napona." },
  ],
  quiz: [
    { q: "Koji efekat koristi termoelektrični generator (TEG)?", options: ["Fotonaponski", "Seebeck", "Piezoelektrični", "Faradejev"], answer: 1 },
    { q: "Koja je približna maksimalna efikasnost solarnih EH pretvarača po slajdovima?", options: ["10 %", "40 %", "90 %", "100 %"], answer: 1 },
    { q: "Čemu služi kondicioner snage?", options: ["Da skladišti energiju", "Da meri temperaturu", "Da prilagodi napon/frekvenciju za upotrebu/skladištenje", "Da generiše svetlost"], answer: 2 },
    { q: "Zašto je EH posebno bitan za IoT?", options: ["Jer je jeftiniji od struje", "Jer menjati baterije milijardama uređaja nije praktično", "Jer troši mnogo energije", "Jer radi samo danju"], answer: 1 },
  ],
},

/* ================================ 2. FSR =============================== */
{
  id: "fsr",
  title: "FSR senzori",
  subtitle: "Force Sensing Resistor",
  icon: "👆",
  color: "#ef4444",
  oneLiner: "Otpornik čija otpornost OPADA kada se poveća sila/pritisak — jeftin senzor sile za primene gde tačnost nije ključna.",
  sections: [
    { h: "Šta je FSR", html: `
      <p><b>FSR (Force Sensing Resistor)</b> = otpornik čija se otpornost menja sa primenjenom silom/pritiskom. Osnovno pravilo:</p>
      <p style="text-align:center;font-size:1.1em"><b>Otpornost je obrnuto proporcionalna sili.</b> (veća sila → manja otpornost)</p>
      <p>Karakteristika je <b>nelinearna</b>. Postoji <b>prag uključenja (break force)</b> — ispod njega otpornost je vrlo velika (&gt;100 kΩ), pa naglo pada ka ~10 kΩ.</p>` },
    { h: "Struktura (kako je napravljen)", html: `
      <p>Sendvič od više slojeva:</p>
      <ul>
        <li><b>Sloj osetljiv na silu</b> (rezistivni sloj sa provodnim česticama).</li>
        <li><b>Odstojnik (spacer)</b> — razdvaja slojeve dok nema pritiska.</li>
        <li><b>Češljasta struktura elektroda</b> (interdigitalne Ag elektrode).</li>
      </ul>` },
    { h: "Princip rada", html: `
      <ol>
        <li>U rezistivnom materijalu su <b>mikronske čestice provodnika i dielektrika</b> u matrici.</li>
        <li>Zadatak materijala je da ostvari <b>električni put između elektroda</b>.</li>
        <li>Sila → čestice dodiruju elektrode → otpornost se menja (smanjuje).</li>
      </ol>
      <p>Sloj je dizajniran da ima <b>malu temperaturnu zavisnost</b> i dobre mehaničke osobine.</p>` },
    { h: "Proizvodnja (štampa)", html: `
      <p>Koraci: <b>Dizajn → Štampa Ag elektroda → Priprema rezistivnog sloja → Spajanje i izvlačenje kontakata.</b></p>` },
    { h: "Vezivanje u kolo", html: `
      <p>Osnovno: <b>razdelnik napona + jedinični pojačavač (bafer)</b>. R<sub>M</sub> (merni otpornik) bira se da maksimizuje osetljivost i ograniči struju.</p>
      <p class="formula-inline">V<sub>OUT</sub> = V⁺ / (1 + R<sub>FSR</sub>/R<sub>M</sub>)</p>
      <p>Izlazni napon je <b>direktno srazmeran sili</b> (jer R<sub>FSR</sub> opada sa silom → V<sub>OUT</sub> raste).</p>` },
    { h: "Prednosti i mane", html: `
      <div class="proscons">
        <div class="pros"><b>✔ Prednosti</b><ul>
          <li>Mali, tanki, fleksibilni, jeftini</li>
          <li>Neosetljivi na vibraciju i toplotu</li>
          <li>Detektuju i slabe sile</li>
        </ul></div>
        <div class="cons"><b>✘ Mane</b><ul>
          <li>Nisu precizni (samo kvalitativni rezultati)</li>
          <li>Nelinearna zavisnost</li>
          <li>Ponovljivost/tačnost ±15 % do ±25 %</li>
        </ul></div>
      </div>
      <p><i>Idealni za primene gde tačnost nije ključna.</i></p>` },
    { h: "Primene", html: `
      <ul>
        <li>Detekcija prisustva pacijenta u bolničkom krevetu, tačke pritiska (kad okrenuti pacijenta).</li>
        <li><b>CPR lutke</b> — senzori sile za ispravan položaj ruku i dubinu pritiska.</li>
        <li>FlexiForce oko cevčice infuzione pumpe — detekcija <b>zakrčenja</b>.</li>
        <li>Ulošci za obuću sa 16 FSR — merenje pritiska stopala, analiza hoda.</li>
        <li>Tipovi: pojedinačni, trake, 2D nizovi.</li>
      </ul>
      <p>Proizvođači: Interlink Electronics, IEE, Tekscan.</p>` },
  ],
  formulas: [
    { name: "Izlazni napon FSR razdelnika", formula: "V_OUT = V⁺ / (1 + R_FSR / R_M)", desc: "R_M = merni otpornik; V_OUT raste sa silom jer R_FSR opada." },
    { name: "Osnovno pravilo", formula: "R_FSR ∝ 1 / F", desc: "Otpornost obrnuto proporcionalna sili." },
  ],
  numbers: [
    ["Tačnost / ponovljivost", "±15 % – ±25 %"],
    ["Prag (break force) opseg R", "100 kΩ → 10 kΩ"],
    ["Materijal elektroda", "Srebro (Ag), češljaste"],
  ],
  flashcards: [
    { q: "Kako se menja otpornost FSR sa silom?", a: "Obrnuto proporcionalno — veća sila daje manju otpornost (nelinearno)." },
    { q: "Formula za V_OUT u osnovnom kolu?", a: "V_OUT = V⁺ / (1 + R_FSR/R_M); izlaz srazmeran sili." },
    { q: "Tri sloja FSR strukture?", a: "Sloj osetljiv na silu, odstojnik (spacer), češljaste (interdigitalne) elektrode." },
    { q: "Glavne mane FSR?", a: "Nisu precizni (kvalitativni), nelinearni, ponovljivost ±15–25 %." },
    { q: "Za šta su FSR idealni?", a: "Za primene gde tačnost nije ključna (detekcija prisustva/pritiska)." },
  ],
  quiz: [
    { q: "Šta se dešava sa otpornošću FSR pri povećanju sile?", options: ["Raste", "Opada", "Ne menja se", "Postaje beskonačna"], answer: 1 },
    { q: "Kolika je tipična tačnost/ponovljivost FSR?", options: ["±1 %", "±5 %", "±15–25 %", "±50 %"], answer: 2 },
    { q: "Koje kolo je osnovno za FSR?", options: ["Oscilator", "Razdelnik napona + bafer", "Grecov spoj", "Multivibrator"], answer: 1 },
    { q: "Od kog metala su elektrode FSR?", options: ["Bakar", "Zlato", "Srebro (Ag)", "Aluminijum"], answer: 2 },
  ],
},

/* ========================= 3. MAGNETSKI MATERIJALI ===================== */
{
  id: "mag",
  title: "Magnetski materijali",
  subtitle: "Meki i tvrdi, histerezis",
  icon: "🧲",
  color: "#8b5cf6",
  oneLiner: "Materijali sa magnetnim svojstvima; ključna podela na magnetno MEKE (jezgra, mali histerezis) i TVRDE (stalni magneti, veliki histerezis).",
  sections: [
    { h: "Poreklo magnetizma", html: `
      <ul>
        <li>Svi materijali su magnetni — pitanje je samo u kojoj meri.</li>
        <li>Svaki elektron pravi <b>orbitalni magnetni moment</b> (kretanje oko jezgra) i <b>spinski magnetni moment</b> (rotacija oko ose).</li>
        <li><b>Magnetni moment atoma p<sub>m</sub></b> = vektorska suma momenata elektrona.</li>
        <li><b>Vektor magnetizacije M</b> = srednji magnetni moment po jedinici zapremine.</li>
      </ul>` },
    { h: "Podela po jačini uređenja", html: `
      <ul>
        <li><b>Slabo uređenje:</b> dijamagnetici i paramagnetici.</li>
        <li><b>Jako uređenje:</b> feromagnetici, antiferomagnetici, ferimagnetici.</li>
        <li>Fero- i ferimagnetici imaju <b>spontanu magnetizaciju M<sub>s</sub></b> i bez spoljašnjeg polja → praktično najvažniji. Pokazuju <b>nelinearno i ireverzibilno</b> namagnetisavanje → <b>histerezisna petlja B(H)</b>.</li>
      </ul>` },
    { h: "Magnetno MEKI vs TVRDI", html: `
      <table>
        <tr><th></th><th>MEKI</th><th>TVRDI</th></tr>
        <tr><td>Histerezis</td><td>Uska petlja, mali gubici</td><td>Široka petlja, velika energija</td></tr>
        <tr><td>Primena</td><td>Jezgra (kalemovi, transformatori, relei)</td><td>Stalni magneti</td></tr>
        <tr><td>Ključni zahtev</td><td>Velika specifična otpornost ρ (manji gubici vihornih struja)</td><td>Veliki (BH)<sub>max</sub>, H<sub>c</sub>, B<sub>r</sub></td></tr>
      </table>
      <p>Površina histerezisne petlje ∝ magnetnoj energiji. Kod tvrdih je važan <b>energetski proizvod (BH)<sub>max</sub></b> (tačka u 2. kvadrantu sa max proizvodom).</p>` },
    { h: "Domeni i Blohov zid", html: `
      <ul>
        <li>Feromagnetici su <b>polikristalni</b>: zrna (0,1–1 µm) sastavljena od <b>domena</b>.</li>
        <li>U svakom domenu momenti su usmereni u <b>pravac lakog namagnetisanja</b>, čak i bez polja.</li>
        <li><b>Blohov zid</b> (~100 nm) = granica između domena gde se smer momenata postepeno menja (oštra granica bi koštala previše izmenske energije).</li>
      </ul>` },
    { h: "Histerezisni proces", html: `
      <ol>
        <li><b>Početak:</b> domeni haotični, međusobno se poništavaju (nije namagnetisan).</li>
        <li>Polje H raste → domeni se orijentišu u pravac polja; usmereni rastu na račun ostalih (slabo polje = reverzibilno).</li>
        <li>Defekti se opiru pomeranju zida; uz dovoljno polja → <b>zasićenje M<sub>s</sub></b> (3).</li>
        <li>Ukloni se H → defekti zadrže domene → <b>remanencija B<sub>r</sub></b> (ponaša se kao stalni magnet).</li>
        <li>Suprotno polje → pri <b>koercitivnom polju H<sub>c</sub></b> je B = 0.</li>
        <li>Dalje → zasićenje u suprotnom smeru. Naizmenično H → puna <b>histerezisna petlja</b>.</li>
      </ol>
      <p>Oblik petlje (H<sub>c</sub>, B<sub>r</sub>) zavisi od mehaničke i termičke obrade (broj defekata).</p>` },
    { h: "Kirijeva temperatura", html: `
      <p>Iznad kritične <b>Kirijeve temperature T<sub>c</sub></b> toplotno haotično kretanje nadvlada magnetno uređenje → materijal se ponaša kao <b>paramagnetik</b>.</p>` },
    { h: "Primene", html: `
      <ul>
        <li><b>Meki:</b> kalemovi, transformatori, relei, feriti (NiZn).</li>
        <li><b>Tvrdi:</b> stalni magneti (npr. u zvučnicima).</li>
        <li>Fleksibilni tekstilni transformator: jezgro od ferofluida/provodnih niti; odnos navojaka definiše odnos transformacije napona.</li>
      </ul>` },
  ],
  formulas: [
    { name: "Linearni materijal", formula: "B = μ·H ,  μ = μ₀·μ_r", desc: "μ_r = relativna permeabilnost, μ₀ = permeabilnost vakuuma." },
    { name: "Magnetizacija", formula: "B = μ₀·(H + M) ,  μ_r = 1 + χ_m", desc: "M = magnetizacija, χ_m = magnetna susceptibilnost." },
    { name: "Energetski proizvod", formula: "(BH)_max", desc: "Glavni parametar tvrdih materijala (2. kvadrant B–H)." },
  ],
  numbers: [
    ["Veličina domena", "0,1 – 1 µm"],
    ["Debljina Blohovog zida", "≈ 100 nm"],
    ["Tvrdi → karakteriše", "(BH)max, Hc, Br"],
    ["Meki → zahtev", "velika ρ (otpornost)"],
  ],
  flashcards: [
    { q: "Meki vs tvrdi magnetni materijal — primena?", a: "Meki → jezgra (transformatori, kalemovi, relei). Tvrdi → stalni magneti." },
    { q: "Šta je remanencija Br, a šta koercitivno polje Hc?", a: "Br = zaostala indukcija kad se ukloni H. Hc = polje suprotnog smera pri kome je B=0." },
    { q: "Glavni parametar tvrdih materijala?", a: "Energetski proizvod (BH)max (+ Hc i Br)." },
    { q: "Šta se dešava iznad Kirijeve temperature?", a: "Toplota nadvlada uređenje → materijal postaje paramagnetik." },
    { q: "Šta je Blohov zid?", a: "Granica domena (~100 nm) u kojoj se smer magnetnih momenata postepeno menja." },
    { q: "Zašto meki materijali traže veliku otpornost ρ?", a: "Da se smanje gubici usled vihornih (eddy) struja u jezgru." },
  ],
  quiz: [
    { q: "Za šta se koriste magnetno TVRDI materijali?", options: ["Jezgra transformatora", "Stalni magneti", "Provodnici", "Izolatori"], answer: 1 },
    { q: "Šta je Hc?", options: ["Remanentna indukcija", "Koercitivno polje (B=0)", "Kirijeva temperatura", "Susceptibilnost"], answer: 1 },
    { q: "Glavni parametar tvrdih magneta je:", options: ["ρ specifična otpornost", "(BH)max energetski proizvod", "χm", "μr"], answer: 1 },
    { q: "Iznad Kirijeve temperature feromagnetik se ponaša kao:", options: ["Superprovodnik", "Paramagnetik", "Izolator", "Dijamagnetik"], answer: 1 },
    { q: "Zašto meki materijali traže veliku ρ?", options: ["Veća remanencija", "Manji gubici vihornih struja", "Veći Hc", "Lakša proizvodnja"], answer: 1 },
  ],
},

/* ======================= 4. MATERIJALI ZA KUĆIŠTA ===================== */
{
  id: "kuc",
  title: "Materijali za kućišta",
  subtitle: "Pakovanje (packaging) u elektronici",
  icon: "📦",
  color: "#0ea5e9",
  oneLiner: "Kućište štiti čip (mehanički, hemijski, električno, termički) i povezuje ga sa spoljnim svetom; jedan od poslednjih i skupljih koraka proizvodnje.",
  sections: [
    { h: "Šta kućište mora da obezbedi", html: `
      <ul>
        <li><b>Električnu izolaciju/pasivizaciju</b> od elektrolita i vlage</li>
        <li><b>Mehaničku zaštitu</b> (strukturni integritet)</li>
        <li><b>Optičku i termičku zaštitu</b></li>
        <li><b>Hemijsku izolaciju</b> od grubog okruženja</li>
        <li><b>Prenos signala</b></li>
      </ul>
      <p>Prodor vlage je <b>glavni uzrok otkaza biosenzora</b>. Kućište je velik deo cene čipa i dizajnira se posebno za svaku komponentu.</p>` },
    { h: "Osnovne operacije pakovanja", html: `
      <p>Pričvršćivanje čipa → inspekcija → <b>bondiranje žica</b> → inspekcija → zatvaranje → odsecanje izvoda → markiranje → finalno testiranje.</p>
      <p><b>Bondiranje žica</b> povezuje mikro- i makro-svet; koriste se <b>Au i Al</b> žice.</p>
      <p><b>Zatvaranje kućišta:</b></p>
      <ul>
        <li><b>Hermetičko:</b> zavarivanje, lemljenje, zatapanje staklom.</li>
        <li><b>Nehermetičko:</b> kalupljenje epoksi materijalom.</li>
      </ul>` },
    { h: "Hijerarhijski nivoi povezivanja", html: `
      <table>
        <tr><th>Nivo</th><th>Šta povezuje</th></tr>
        <tr><td>0</td><td>Konekcije na silicijumskoj pločici (na samom čipu)</td></tr>
        <tr><td>1</td><td>Čip → njegovo kućište</td></tr>
        <tr><td>2</td><td>PCB: komponenta → komponenta / konektor</td></tr>
        <tr><td>3</td><td>PCB → PCB (matična ploča)</td></tr>
        <tr><td>4</td><td>Podsklopovi (slotovi u reku)</td></tr>
        <tr><td>5</td><td>Fizički odvojeni sistemi (npr. Ethernet LAN)</td></tr>
      </table>` },
    { h: "Tipovi montaže čipa", html: `
      <table>
        <tr><th>Tip</th><th>Primeri</th><th>Korak (pitch)</th></tr>
        <tr><td><b>Through-hole</b> (kroz rupe)</td><td>DIP, PGA</td><td>100 mil</td></tr>
        <tr><td><b>SMD</b> (površinska montaža)</td><td>QFP, TSOP, SOJ, BGA</td><td>25 mil (TSOP)</td></tr>
        <tr><td><b>Chip-scale</b></td><td>CSP, WLP, naslagane kocke</td><td>0,5–0,8 mm</td></tr>
      </table>
      <p><b>1 mil = 0,001 inča = 0,0254 mm.</b> (60 mil=1,524 mm; 100 mil=2,54 mm)</p>` },
    { h: "Through-hole vs SMD", html: `
      <div class="proscons">
        <div class="pros"><b>Through-hole</b><ul>
          <li>+ Lako lemiti/odlemiti i testirati</li>
          <li>+ Vias između slojeva</li>
          <li>− Mala gustina, signali kroz sve slojeve</li>
        </ul></div>
        <div class="cons"><b>SMD</b><ul>
          <li>+ Velika gustina, obe strane PCB-a</li>
          <li>+ Manje parazitne L i C, automatizacija</li>
          <li>+ Cena 1/2–1/4, veličina 1/4–1/10</li>
          <li>− Loše ručno lemljenje/popravka, termalni stres</li>
        </ul></div>
      </div>` },
    { h: "Flip-Chip tehnologija", html: `
      <p>Čip se okrene i <b>zalemi za supstrat preko lemnih kuglica</b> (umesto žicama). Za vrhunska IC, visoke frekvencije, mnogo I/O.</p>
      <ul>
        <li>+ I/O padovi po celom čipu (ne samo na ivicama), manja induktivnost (~0,1 nH), svi padovi zalemljeni odjednom (brže).</li>
        <li>− Ravnanje kritično (radi se „na slepo"), termalni stres zbog različitog koeficijenta širenja Si i supstrata.</li>
      </ul>` },
    { h: "Materijali i RoHS", html: `
      <p><b>Materijali:</b> poluprovodnici (Si, GaAs); metali (Sn-Ag lemovi, Au/Al žice, Kovar, CuBe); keramika (Al₂O₃); polimeri (epoksidi, polimid, silikon); stakla (SiO₂).</p>
      <p><b>RoHS</b> (Restriction of Hazardous Substances, 2002/95/EC, od 1.7.2006) zabranjuje: <b>olovo, živu, kadmijum, Cr⁶⁺, PBB, PBDE</b>. Granica 0,1 % (kadmijum 0,01 %) po homogenom materijalu.</p>` },
    { h: "Karakteristike dobrog kućišta", html: `
      <ul>
        <li>Termičke performanse (odvod toplote)</li>
        <li>Integritet signala (mali parazitni L, C)</li>
        <li>Raspodela snage (i strujni pikovi)</li>
        <li>Mogućnost proizvodnje (mora da se zalemi)</li>
        <li>Testiranje (provera svih pinova)</li>
        <li>Pouzdanost na duži rok — sve uz prihvatljivu cenu.</li>
      </ul>
      <p>Primeri: DIP, PGA, SOP, BGA, PLCC, QFP, CLCC.</p>` },
  ],
  formulas: [
    { name: "Jedinica mil", formula: "1 mil = 0,001 in = 0,0254 mm", desc: "Korak pinova: DIP=100 mil, TSOP=25 mil." },
  ],
  numbers: [
    ["DIP korak", "100 mil (2,54 mm)"],
    ["TSOP korak", "25 mil"],
    ["CSP/WLP korak", "0,5 – 0,8 mm"],
    ["Flip-chip induktivnost", "~0,1 nH"],
    ["RoHS granica", "0,1 % (Cd 0,01 %)"],
  ],
  flashcards: [
    { q: "Pet stvari koje kućište mora da obezbedi?", a: "Električnu izolaciju, mehaničku zaštitu, optičku/termičku zaštitu, hemijsku izolaciju, prenos signala." },
    { q: "Hermetičko vs nehermetičko zatvaranje?", a: "Hermetičko: zavarivanje/lemljenje/zatapanje staklom. Nehermetičko: kalupljenje epoksidom." },
    { q: "Koji metali za bondiranje žica?", a: "Zlato (Au) i aluminijum (Al)." },
    { q: "Koliko je 1 mil?", a: "1 mil = 0,001 inča = 0,0254 mm." },
    { q: "Šta zabranjuje RoHS?", a: "Olovo, živu, kadmijum, Cr6+, PBB, PBDE (granica 0,1 %; Cd 0,01 %)." },
    { q: "Prednost flip-chipa nad žičanim bondiranjem?", a: "I/O po celom čipu, manja induktivnost (~0,1 nH), svi spojevi odjednom (brže)." },
  ],
  quiz: [
    { q: "Glavni uzrok otkaza biosenzora u kućištu je:", options: ["Prevelika struja", "Prodor vlage", "Magnetno polje", "Svetlost"], answer: 1 },
    { q: "Koliko iznosi 1 mil?", options: ["1 mm", "0,0254 mm", "0,1 mm", "2,54 mm"], answer: 1 },
    { q: "DIP i PGA spadaju u:", options: ["SMD", "Through-hole", "Flip-chip", "Chip-scale"], answer: 1 },
    { q: "RoHS NE zabranjuje:", options: ["Olovo", "Bakar", "Živu", "Kadmijum"], answer: 1 },
    { q: "Flip-chip povezuje čip pomoću:", options: ["Au žica", "Lemnih kuglica", "Epoksida", "Zakivaka"], answer: 1 },
  ],
},

/* ============================ 5. PIEZOELEKTRICI ======================== */
{
  id: "piezo",
  title: "Piezoelektrici",
  subtitle: "Naelektrisanje iz pritiska",
  icon: "🔩",
  color: "#10b981",
  oneLiner: "Materijali koji pod mehaničkom silom stvaraju naelektrisanje (i obrnuto) — osnova senzora sile, akcelerometara, zujalica i aktuatora.",
  sections: [
    { h: "Princip rada", html: `
      <p>Piezoelektrični materijal pod <b>mehaničkom silom</b> na površini <b>indukuje naelektrisanje proporcionalno sili</b>.</p>
      <p>Merenjem potencijalne razlike na suprotnim stranama komada može se odrediti vrednost primenjene sile.</p>
      <ul>
        <li><b>Direktni efekat:</b> sila → napon (senzor).</li>
        <li><b>Inverzni efekat:</b> napon → deformacija (aktuator).</li>
      </ul>` },
    { h: "Podela materijala", html: `
      <ul>
        <li><b>Prirodni:</b> kvarc, turmalin.</li>
        <li><b>Veštački (mikroelektronika):</b> cink-oksid (ZnO) i <b>PZT</b> — PbZrTiO₃ (olovo-cirkonijum-titanat).</li>
      </ul>` },
    { h: "Piezo senzori — ključna osobina", html: `
      <p>Osetljivost piezo senzora <b>ne zavisi od mernog opsega</b>. Zato 5 kN može biti izmereno isto precizno senzorom od 140 kN kao i senzorom od 5 kN. → pouzdana merenja u širokom opsegu.</p>` },
    { h: "Primene", html: `
      <ul>
        <li>Akcelerometri (davači ubrzanja), davači sile i pritiska</li>
        <li>Zvučnici, zujalice, akustika</li>
        <li>Digitalne vage (senzor mase)</li>
        <li>Piezoelektrični <b>aktuatori</b></li>
        <li>Senzori detonacije i vibracija</li>
      </ul>` },
    { h: "Zanimljivost — bio harvester", html: `
      <p>Razvijen fleksibilan, biokompatibilan, netoksičan, jeftin tekstilni harvester (čak i od kore luka) gustine snage ~7 µW/cm² — idealan za nosivu (wearable) elektroniku i smart odeću.</p>` },
  ],
  formulas: [
    { name: "Generisano naelektrisanje", formula: "Q = d · F", desc: "d = piezoelektrični koeficijent, F = sila. Q ∝ sili." },
    { name: "Osnovni odnos", formula: "Q ∝ F  →  V ∝ F", desc: "Naelektrisanje i napon srazmerni primenjenoj sili." },
  ],
  numbers: [
    ["Prirodni piezo", "kvarc, turmalin"],
    ["Veštački piezo", "ZnO, PZT (PbZrTiO₃)"],
    ["Osetljivost vs opseg", "nezavisna"],
    ["Gustina snage (tekstil)", "~7 µW/cm²"],
  ],
  flashcards: [
    { q: "Direktni vs inverzni piezoefekat?", a: "Direktni: sila→napon (senzor). Inverzni: napon→deformacija (aktuator)." },
    { q: "Najčešći veštački piezo materijali?", a: "Cink-oksid (ZnO) i PZT (PbZrTiO₃ — olovo-cirkonijum-titanat)." },
    { q: "Prirodni piezo materijali?", a: "Kvarc i turmalin." },
    { q: "Zašto je piezo senzor dobar u širokom opsegu?", a: "Osetljivost ne zavisi od mernog opsega." },
    { q: "Čemu je proporcionalno generisano naelektrisanje?", a: "Primenjenoj sili (Q = d·F)." },
  ],
  quiz: [
    { q: "Naelektrisanje piezoelektrika je proporcionalno:", options: ["Temperaturi", "Primenjenoj sili", "Svetlosti", "Magnetnom polju"], answer: 1 },
    { q: "PZT je:", options: ["Cink-oksid", "Olovo-cirkonijum-titanat", "Kvarc", "Silicijum"], answer: 1 },
    { q: "Inverzni piezoefekat koristi se kod:", options: ["Senzora sile", "Aktuatora", "Termistora", "Solarne ćelije"], answer: 1 },
    { q: "Prirodni piezoelektrik je:", options: ["PZT", "ZnO", "Kvarc", "GaAs"], answer: 2 },
  ],
},

/* ================================ 6. QTC ============================== */
{
  id: "qtc",
  title: "QTC",
  subtitle: "Quantum Tunnelling Composites",
  icon: "🌀",
  color: "#ec4899",
  oneLiner: "Kompozit koji je u miru skoro savršen IZOLATOR, a pod pritiskom postaje odličan PROVODNIK — zahvaljujući kvantnom tunelovanju elektrona.",
  sections: [
    { h: "Šta je kompozit (podsetnik)", html: `
      <p>Kompozit = materijal od dva ili više konstituenta različitih osobina (npr. stakleno vlakno + epoksid). Menjanjem tipa/veličine/oblika/količine druge faze podešavaju se svojstva.</p>` },
    { h: "Otkriće", html: `
      <p>QTC je otkriven <b>slučajno 1997.</b> — David Lussey (Darlington) pokušavao je da napravi <b>provodni lepak</b>. Dobio je supstancu neobičnih električnih svojstava; kompanija <b>Peratech</b> ga je komercijalizovala.</p>` },
    { h: "Princip rada", html: `
      <ul>
        <li>QTC sadrži <b>sitne metalne čestice</b> (šiljate, npr. <b>nikl</b>) u neprovodnoj matrici (npr. <b>silikonska guma</b>).</li>
        <li><b>U miru:</b> čestice su daleko → elektroni ne mogu da prođu → <b>izolator</b>.</li>
        <li><b>Pod pritiskom:</b> čestice se zbiju → elektroni <b>„tuneluju"</b> kroz tanak sloj vezivnog materijala → <b>provodnik</b>.</li>
        <li>Čestice se <b>ne dodiruju</b> — i dalje ih razdvaja vezivo; provodi <b>kvantno tunelovanje</b> (otud šiljat oblik čestica koji koncentriše polje).</li>
      </ul>
      <p>Deo 4 mm × 4 mm × 1,5 mm može da propusti i do <b>10 A</b> kada je sabijen.</p>` },
    { h: "Karakteristika i primene", html: `
      <p>Otpornost pada za nekoliko redova veličine sa pritiskom — od <b>TeraΩ</b> opsega ka <b>kiloΩ</b> i niže.</p>
      <table>
        <tr><th>TeraΩ opseg (prekidači)</th><th>kiloΩ opseg (senzori)</th></tr>
        <tr><td>Ultratanki prekidači u tastaturama, karticama, tekstilu; kontrola ESD/EMP; osigurači (PTC); printabilne memorije</td><td>Kontrola osetljivosti na pritisak; robotska koža i prsti; ekrani na dodir</td></tr>
      </table>
      <ul>
        <li>Presvučeni tekstilni senzori, perive tastature</li>
        <li>Štampani na staklo/folije; matrični senzor pritiska</li>
        <li>Kontrola brzine (npr. bušilica na stisak ruke), primene u medicini</li>
      </ul>` },
  ],
  formulas: [
    { name: "Ponašanje", formula: "R(p): TeraΩ (p=0)  →  kΩ i niže (p↑)", desc: "Pritisak → eksponencijalni pad otpornosti (tunelovanje)." },
  ],
  numbers: [
    ["Otkriće", "1997, David Lussey, Peratech"],
    ["Matrica", "silikonska guma"],
    ["Čestice", "šiljati metal (nikl)"],
    ["Struja (mali uzorak)", "do 10 A"],
    ["Opseg otpornosti", "TeraΩ → kΩ"],
  ],
  flashcards: [
    { q: "Kako se QTC ponaša u miru, a kako pod pritiskom?", a: "U miru: skoro savršen izolator. Pod pritiskom: odličan provodnik (poput metala)." },
    { q: "Koji fizički fenomen omogućava provođenje u QTC?", a: "Kvantno tunelovanje elektrona kroz vezivo (čestice se ne dodiruju)." },
    { q: "Od čega je QTC sastavljen?", a: "Šiljate metalne čestice (npr. nikl) u neprovodnoj matrici (silikonska guma)." },
    { q: "Zašto su čestice šiljate?", a: "Šiljati oblik koncentriše polje i pospešuje tunelovanje (npr. nikl)." },
    { q: "Ko i kada je otkrio QTC?", a: "David Lussey, 1997. (slučajno, pokušavajući provodni lepak); komercijalizovao Peratech." },
  ],
  quiz: [
    { q: "QTC u stanju mirovanja je:", options: ["Provodnik", "Izolator", "Poluprovodnik", "Superprovodnik"], answer: 1 },
    { q: "Provođenje u QTC pod pritiskom je posledica:", options: ["Topljenja", "Kvantnog tunelovanja", "Jonizacije", "Magnetizacije"], answer: 1 },
    { q: "Metalne čestice u QTC su:", options: ["Okrugle", "Šiljate (npr. nikl)", "Šuplje", "Tečne"], answer: 1 },
    { q: "Pod pritiskom otpornost QTC:", options: ["Raste", "Naglo opada", "Ostaje ista", "Postaje beskonačna"], answer: 1 },
  ],
},

/* ================================ 7. SMA ============================== */
{
  id: "sma",
  title: "SMA",
  subtitle: "Shape Memory Alloys (legure koje pamte oblik)",
  icon: "🧬",
  color: "#14b8a6",
  oneLiner: "Legure (najčešće NiTi) koje se nakon deformacije VRAĆAJU u zapamćeni oblik kada se zagreju — prelazom martenzit ↔ austenit.",
  sections: [
    { h: "Istorija i osnova", html: `
      <ul>
        <li><b>1967.</b> Buehler otkriva efekat pamćenja oblika na leguri <b>nikl-titanijum</b>.</li>
        <li>1970–80: prvi NiTi implanti u medicini; sredinom 1990-ih široka primena.</li>
        <li>Najčešća legura: <b>NiTi</b> (≈50/50 ili Ni55-Ti45). Koriste se i <b>CuZnAl, CuAlNi</b>.</li>
      </ul>` },
    { h: "Dve faze (ključ svega)", html: `
      <table>
        <tr><th>Austenit (visoka T)</th><th>Martenzit (niska T)</th></tr>
        <tr><td>Tvrd, čvrst, neelastičan</td><td>Mek, elastičan</td></tr>
        <tr><td>Liči na titanijum</td><td>Kompleksna rešetka</td></tr>
        <tr><td>Zapreminski centrirana rešetka</td><td>„Pobratimljen" (twinned) ili deformisan</td></tr>
      </table>
      <p><b>Pobratimljen (twinned)</b> martenzit = struktura od delova okrenutih u orijentaciji jedan prema drugom; može se lako deformisati.</p>` },
    { h: "Kako radi pamćenje oblika", html: `
      <ol>
        <li>Na visokoj T žica je u <b>austenitu</b> (originalan, zapamćen oblik).</li>
        <li>Hlađenjem → <b>pobratimljen martenzit</b> (liči na austenit, isti oblik).</li>
        <li>Deformacija na niskoj T → <b>deformisan martenzit</b> (žica ostaje savijena).</li>
        <li>Zagrevanje (npr. iznad ~70 °C) → vraćanje u <b>austenit</b> = original oblik!</li>
      </ol>
      <p>Ciklus: <i>Hlađenje → Deformacija → Grejanje → povratak oblika.</i></p>` },
    { h: "Prednosti i mane", html: `
      <div class="proscons">
        <div class="pros"><b>✔ Prednosti</b><ul>
          <li>Odlična termo-mehanička svojstva</li>
          <li>Do 10× elastičniji od drugih materijala</li>
          <li>Široke oblasti primene</li>
        </ul></div>
        <div class="cons"><b>✘ Mane</b><ul>
          <li>Visoka cena (netrivijalna proizvodnja)</li>
          <li>Zamor materijala posle mnogo ciklusa</li>
        </ul></div>
      </div>` },
    { h: "Primene", html: `
      <ul>
        <li><b>Mišići robota</b> — žice se „savijaju" pod električnim impulsima (zagrevanje strujom).</li>
        <li><b>Hirurški instrumenti:</b> širenje tkiva, <b>stent (angioplastika)</b>, koronarne sonde, sonde ispod lobanje.</li>
        <li>Pločice koje pamte oblik za spajanje kostiju (vilica), šrafovi.</li>
      </ul>` },
    { h: "Povezano: RF ablacija (iz iste oblasti)", html: `
      <p>SMA sonde u RF ablaciji tumora: naizmenična struja visoke frekvencije (<b>460 kHz</b>) kroz sonde greje i uklanja tkivo. „Kišobran" sonde (npr. RITA Model 30, 4 kraka, do 30 mm) sa <b>NTC termistorom</b> na vrhovima. Bipolarna ablacija pokriva veću oblast od monopolarne.</p>` },
  ],
  formulas: [
    { name: "Transformacione temperature", formula: "M_s, M_f (martenzit)  /  A_s, A_f (austenit)", desc: "Start/finish temperature hlađenja i grejanja." },
    { name: "Aktivacija žice u robotu", formula: "I → Joule-ovo grejanje → austenit (povratak oblika)", desc: "Struja greje žicu iznad temperature transformacije." },
  ],
  numbers: [
    ["Glavna legura", "NiTi (≈50/50)"],
    ["Druge legure", "CuZnAl, CuAlNi"],
    ["Aktivacija (primer)", "> ~70 °C"],
    ["Elastičnost", "do 10× veća"],
    ["RF ablacija", "460 kHz"],
  ],
  flashcards: [
    { q: "Koje dve faze ima SMA i njihove osobine?", a: "Austenit (visoka T): tvrd, čvrst, neelastičan. Martenzit (niska T): mek, elastičan." },
    { q: "Kako SMA vraća oblik?", a: "Zagrevanjem deformisanog martenzita iznad temperature transformacije → prelazi u austenit (zapamćen oblik)." },
    { q: "Najčešća SMA legura?", a: "Nikl-titanijum (NiTi), ≈50/50; takođe CuZnAl, CuAlNi." },
    { q: "Glavne mane SMA?", a: "Visoka cena (teška proizvodnja) i zamor materijala posle mnogo ciklusa." },
    { q: "Šta znači 'pobratimljen' (twinned) martenzit?", a: "Struktura od delova okrenutih jedan prema drugom; lako se deformiše, a liči na austenit." },
  ],
  quiz: [
    { q: "Kako SMA vraća svoj zapamćeni oblik?", options: ["Hlađenjem", "Zagrevanjem", "Pritiskom", "Svetlošću"], answer: 1 },
    { q: "Najčešća SMA legura je:", options: ["CuZn", "NiTi", "FeAl", "AgCu"], answer: 1 },
    { q: "Faza na visokoj temperaturi je:", options: ["Martenzit", "Austenit", "Ferit", "Perlit"], answer: 1 },
    { q: "Martenzit je:", options: ["Tvrd i neelastičan", "Mek i elastičan", "Provodan", "Magnetičan"], answer: 1 },
    { q: "Tipična medicinska primena SMA:", options: ["Tranzistor", "Stent", "Kondenzator", "Antena"], answer: 1 },
  ],
},

/* ============================ 8. SOLARNE ĆELIJE ======================= */
{
  id: "sol",
  title: "Solarne ćelije",
  subtitle: "Fotonaponske ćelije",
  icon: "☀️",
  color: "#eab308",
  oneLiner: "Pretvaraju svetlost u struju preko p-n spoja u poluprovodniku (fotonaponski efekat); obnovljiv izvor energije.",
  sections: [
    { h: "Obnovljivi izvori", html: `
      <p>Solarna energija je obnovljivi izvor (uz vetar, geotermalnu, hidro, biomasu, talase, plimu). Za razliku od neobnovljivih: ugalj, nafta, gas, nuklearno gorivo.</p>` },
    { h: "Princip rada (p-n spoj)", html: `
      <ul>
        <li>Čist silicijum slabo provodi → <b>dopira</b> se: <b>fosforom (n-tip)</b> i <b>borom (p-tip)</b>.</li>
        <li>n-tip ima slobodne <b>elektrone</b>, p-tip ima <b>šupljine</b>.</li>
        <li><b>p-n spoj</b> stvara unutrašnje električno polje (ponaša se kao dioda).</li>
        <li><b>Svetlost (fotoni)</b> jonizuje atome, stvara parove elektron–šupljina; polje ih razdvaja: elektrone u n-sloj, šupljine u p-sloj.</li>
        <li>Naelektrisanja se mogu spojiti samo <b>kroz spoljašnje kolo</b> → kroz potrošač teče struja = snaga.</li>
      </ul>` },
    { h: "I-V karakteristika", html: `
      <ul>
        <li>Neosvetljena ćelija = obična dioda.</li>
        <li>Osvetljena → generiše struju (karakteristika se <b>pomeri naniže</b>).</li>
        <li><b>Veći intenzitet svetlosti → veći pomeraj</b> (veća struja).</li>
        <li>Ključne tačke: <b>I<sub>SC</sub></b> (struja kratkog spoja), <b>V<sub>OC</sub></b> (napon otvorenog kola), <b>P<sub>max</sub></b> (maksimalna snaga).</li>
      </ul>` },
    { h: "Efikasnost", html: `
      <p>Zavisi od: tipa i površine materijala, intenziteta i talasne dužine svetlosti.</p>
      <table>
        <tr><th>Tip</th><th>Efikasnost</th></tr>
        <tr><td>Monokristalni Si</td><td>~24 %</td></tr>
        <tr><td>Polikristalni Si</td><td>&lt; 20 %</td></tr>
        <tr><td>Amorfni Si</td><td>&lt; 10 %</td></tr>
      </table>
      <p>Ćelije se vezuju <b>redno</b> u panel za veći napon (i struju).</p>` },
    { h: "Vezivanje", html: `
      <ul>
        <li><b>Redno</b> → veći napon.</li>
        <li><b>Paralelno</b> → veća struja.</li>
        <li>Kombinovano → i napon i struja.</li>
      </ul>` },
    { h: "Sistemi (array)", html: `
      <p>Paneli se spajaju u <b>array</b>. Kompletan sistem: (a) niz panela, (b) kontrolni panel, (c) skladište (baterije), (d) <b>inverter (DC→AC, npr. 240 V)</b>, (e) backup generator, (f) konstrukcija, (g) trackeri/senzori.</p>
      <p>Primene: igračke, satovi, kalkulatori, daljinsko osvetljenje, pumpanje vode, sateliti, prenosno napajanje.</p>` },
    { h: "Organske i fleksibilne ćelije", html: `
      <ul>
        <li><b>Organske (OSC):</b> bazirane na fotosintezi, svetlosno osetljive boje; cena proizvodnje −60 %; srednja efikasnost, vrlo niska cena.</li>
        <li>Princip: apsorpcija fotona → ekscitoni → razdvajanje naelektrisanja → ekstrakcija nosilaca.</li>
        <li><b>Fleksibilne:</b> hiljade jeftinih solarnih perli između folija aluminijuma (svaka = sitna ćelija); mogu se „prebaciti" preko bilo kog oblika.</li>
      </ul>` },
  ],
  formulas: [
    { name: "I-V karakteristika ćelije", formula: "I = I_L − I₀·(exp(qV/nkT) − 1)", desc: "I_L = fotostruja, I₀ = struja zasićenja diode, n = faktor idealnosti." },
    { name: "Fill Factor", formula: "FF = (V_mp·I_mp) / (V_OC·I_SC)", desc: "Mera 'kvadratnosti' I-V krive (0–1)." },
    { name: "Efikasnost", formula: "η = P_max / P_in = (FF·V_OC·I_SC) / P_in", desc: "Odnos maksimalne električne snage i upadne svetlosne snage." },
  ],
  numbers: [
    ["Monokristalni Si", "~24 %"],
    ["Polikristalni Si", "< 20 %"],
    ["Amorfni Si", "< 10 %"],
    ["Dopanti", "fosfor (n), bor (p)"],
    ["Inverter", "DC → AC (240 V)"],
  ],
  flashcards: [
    { q: "Čime se dopira Si za n-tip, a čime za p-tip?", a: "n-tip: fosfor (slobodni elektroni). p-tip: bor (šupljine)." },
    { q: "Šta razdvaja elektrone i šupljine u solarnoj ćeliji?", a: "Unutrašnje električno polje p-n spoja." },
    { q: "Efikasnosti: mono / poli / amorfni Si?", a: "Mono ~24 %, poli < 20 %, amorfni < 10 %." },
    { q: "Redno vs paralelno vezivanje ćelija?", a: "Redno → veći napon. Paralelno → veća struja." },
    { q: "Čemu služi inverter u solarnom sistemu?", a: "Pretvara DC iz panela u AC (npr. 240 V)." },
    { q: "Šta je Fill Factor?", a: "FF = (Vmp·Imp)/(Voc·Isc) — mera kvaliteta I-V krive (bliže 1 je bolje)." },
  ],
  quiz: [
    { q: "Čime se dopira silicijum za n-tip?", options: ["Bor", "Fosfor", "Aluminijum", "Galijum"], answer: 1 },
    { q: "Najveću efikasnost ima:", options: ["Amorfni Si", "Polikristalni Si", "Monokristalni Si", "Organski"], answer: 2 },
    { q: "Redno vezivanje ćelija povećava:", options: ["Struju", "Napon", "Otpornost", "Temperaturu"], answer: 1 },
    { q: "Inverter u sistemu služi da:", options: ["Skladišti energiju", "Pretvara DC u AC", "Hladi panele", "Prati sunce"], answer: 1 },
    { q: "Šupljine u ćeliji se kreću u:", options: ["n-sloj", "p-sloj", "Spoljno kolo", "Inverter"], answer: 1 },
  ],
},

/* ============================== 9. TERMISTORI ========================= */
{
  id: "term",
  title: "Termistori",
  subtitle: "Temperaturno zavisni otpornici",
  icon: "🌡️",
  color: "#f97316",
  oneLiner: "Otpornici kojima se otpornost menja sa temperaturom; NTC (otpornost opada sa T) i PTC (otpornost raste sa T).",
  sections: [
    { h: "Šta su termistori", html: `
      <ul>
        <li>Elementi (metalni oksidi ili poluprovodnici) koji <b>menjaju otpornost sa temperaturom</b>.</li>
        <li>Temperaturni koeficijent može biti <b>pozitivan ili negativan</b>, vrednosti od nekoliko % po °C.</li>
        <li>Koriste se gde treba detektovati <b>male promene temperature</b> (veća osetljivost od metalnih senzora).</li>
      </ul>` },
    { h: "NTC vs PTC", html: `
      <table>
        <tr><th></th><th>NTC</th><th>PTC</th></tr>
        <tr><td>Koeficijent</td><td>Negativan</td><td>Pozitivan</td></tr>
        <tr><td>Otpornost sa ↑T</td><td>Opada</td><td>Raste</td></tr>
        <tr><td>Tipična uloga</td><td>Merenje temperature</td><td>Zaštita/grejanje, ograničenje struje (zamena osigurača)</td></tr>
      </table>` },
    { h: "Princip merenja (RC metoda)", html: `
      <ol>
        <li>Kondenzator C1 se puni na V<sub>CC</sub> kroz <b>poznati R<sub>ref</sub></b>, pa prazni; meri se <b>vreme T₁</b> da dostigne 0,25·V<sub>CC</sub>.</li>
        <li>Zatim se postupak ponavlja, ali kroz <b>R<sub>sens</sub> (termistor)</b> → vreme <b>T₂</b>.</li>
        <li>Iz odnosa vremena (T₂/T₁) određuje se R<sub>sens</sub>, a iz njega temperatura.</li>
      </ol>
      <p>Pošto se C1 puni/prazni eksponencijalno, vreme do istog naponskog nivoa je srazmerno otpornosti.</p>` },
    { h: "Primene", html: `
      <ul>
        <li><b>NTC:</b> inkubatori, digitalni termostati, praćenje temperature baterije pri punjenju, automobili, hrana (skladištenje/priprema), kućni aparati (toster, fen, frižider), hot-end 3D štampača.</li>
        <li><b>PTC:</b> grejači u kabini (dizel auta), <b>ograničenje struje</b> (zaštita kola, zamena osigurača).</li>
        <li>Auto/EV: upravljanje baterijom (BMS), DC/DC, kompresor, regeneracija kočnice; detekcija temperature CPU, LED, kvarcnog oscilatora, kamere.</li>
      </ul>` },
  ],
  formulas: [
    { name: "Beta (B) jednačina NTC", formula: "R_T = R₀ · exp[ B·(1/T − 1/T₀) ]", desc: "T u kelvinima; R₀ pri referentnoj T₀; B = beta konstanta." },
    { name: "Temperaturni koeficijent", formula: "α = (1/R)·(dR/dT) = −B / T²", desc: "Za NTC negativan; meri relativnu promenu R po stepenu." },
    { name: "Steinhart–Hart", formula: "1/T = A + B·lnR + C·(lnR)³", desc: "Najtačniji model otpornost↔temperatura." },
    { name: "RC merenje", formula: "T_vreme = R·C·ln(V_CC/(V_CC−V_prag))", desc: "Vreme punjenja ∝ otpornosti → odredi R_sens (prag 0,25·V_CC)." },
  ],
  numbers: [
    ["NTC koeficijent", "negativan (R↓ kad T↑)"],
    ["PTC koeficijent", "pozitivan (R↑ kad T↑)"],
    ["Koeficijent (red veličine)", "nekoliko %/°C"],
    ["Merni prag (RC)", "0,25 · V_CC"],
  ],
  flashcards: [
    { q: "Razlika NTC i PTC?", a: "NTC: negativan koef. (R opada sa T). PTC: pozitivan koef. (R raste sa T)." },
    { q: "Beta jednačina za NTC?", a: "R_T = R₀·exp[B(1/T − 1/T₀)], T u kelvinima." },
    { q: "Kako RC metoda meri temperaturu?", a: "Meri vreme punjenja C kroz Rref (T1) i kroz termistor (T2) do 0,25·Vcc; odnos daje Rsens → temperaturu." },
    { q: "Tipična primena PTC termistora?", a: "Grejači i ograničenje struje (zaštita kola, zamena osigurača)." },
    { q: "Zašto se koriste termistori a ne obični metalni senzori?", a: "Veliki koeficijent (nekoliko %/°C) → detekcija malih promena temperature." },
  ],
  quiz: [
    { q: "Kod NTC termistora, sa porastom temperature otpornost:", options: ["Raste", "Opada", "Ostaje ista", "Postaje nula"], answer: 1 },
    { q: "PTC termistori se često koriste za:", options: ["Merenje svetlosti", "Ograničenje struje / grejanje", "Generisanje napona", "Skladištenje energije"], answer: 1 },
    { q: "U Beta jednačini temperatura T je u:", options: ["°C", "Kelvinima", "Farenhajtima", "Procentima"], answer: 1 },
    { q: "U RC metodi meri se vreme do napona od:", options: ["0,5·Vcc", "0,25·Vcc", "Vcc", "0,1·Vcc"], answer: 1 },
    { q: "Najtačniji model otpornost–temperatura je:", options: ["Omov zakon", "Steinhart–Hart", "Faradejev zakon", "Kirhof"], answer: 1 },
  ],
},

/* ============================== 10. VARISTORI ========================= */
{
  id: "var",
  title: "Varistori",
  subtitle: "Naponski zavisni otpornici (VDR)",
  icon: "🛡️",
  color: "#22c55e",
  oneLiner: "Otpornik čija otpornost NAGLO opada iznad praga napona — koristi se za ZAŠTITU OD PRENAPONA (apsorbuje naponske udare).",
  sections: [
    { h: "Šta je varistor", html: `
      <p><b>Varistor</b> (VARiable resISTOR, takođe <b>VDR</b> — Voltage Dependent Resistor) je otpornik čija otpornost zavisi od napona. Najčešći je <b>MOV</b> — Metal Oxide Varistor, na bazi <b>cink-oksida (ZnO)</b>.</p>
      <ul>
        <li>Ispod praga: <b>velika otpornost</b> (skoro izolator) → zanemarljiva struja.</li>
        <li>Iznad praga (clamping/breakdown napon): <b>otpornost naglo pada</b> → provodi veliku struju i „obara" napon.</li>
        <li>Karakteristika je <b>simetrična</b> (radi u oba smera — kao dve antiserijske Zener diode) → pogodan i za AC.</li>
      </ul>` },
    { h: "Uloga — zaštita od prenapona", html: `
      <p>Vezuje se <b>paralelno</b> sa kolom/potrošačem. U normalnom radu „nevidljiv". Pri naponskom udaru (grom, prekidanje induktivnog opterećenja, ESD):</p>
      <ol>
        <li>Napon pređe prag → varistor naglo postane provodan.</li>
        <li><b>Apsorbuje/skreće energiju udara</b> (struja teče kroz varistor, ne kroz osetljivo kolo).</li>
        <li>Napon na kolu se zadržava na bezbednom nivou (clamping).</li>
      </ol>` },
    { h: "Mehanizam (ZnO struktura)", html: `
      <ul>
        <li>MOV je <b>zrnasta (granularna) ZnO keramika</b> sa dodacima (Bi₂O₃ i dr.).</li>
        <li>Granice između zrna se ponašaju kao <b>mikro-diode</b> (Schottky bariere) sa nelinearnom karakteristikom.</li>
        <li>Mnogo zrna serijski/paralelno → makroskopski jako <b>nelinearna I-V</b> karakteristika.</li>
      </ul>` },
    { h: "Statička (I-V) karakteristika", html: `
      <p>Vrlo nelinearna i simetrična: <span class="formula-inline">I = K·V^α</span>, gde je <b>α (koeficijent nelinearnosti)</b> vrlo visok (kod ZnO α ≈ 25–50; idealan otpornik bi imao α=1). Veći α = oštrije „obaranje" napona.</p>` },
    { h: "Ključni parametri", html: `
      <ul>
        <li><b>Napon varistora V<sub>1mA</sub></b> — napon pri struji 1 mA (definiše prag).</li>
        <li><b>Maks. trajni radni napon</b> (AC/DC) — ispod praga.</li>
        <li><b>Energija apsorpcije (J)</b> i <b>maks. struja udara (A)</b>.</li>
        <li><b>Koeficijent nelinearnosti α</b>.</li>
      </ul>` },
    { h: "Mane", html: `
      <ul>
        <li><b>Degradacija</b> — posle više jakih udara prag opada / curenje raste (troše se).</li>
        <li>Parazitna <b>kapacitivnost</b> (ograničava upotrebu na visokim frekvencijama).</li>
        <li>Ima konačnu energiju koju može da apsorbuje.</li>
      </ul>` },
  ],
  formulas: [
    { name: "I-V karakteristika varistora", formula: "I = K · V^α", desc: "α = koeficijent nelinearnosti (ZnO: α ≈ 25–50). Veći α → oštrije clamping ponašanje." },
    { name: "Napon varistora", formula: "V_1mA  (napon pri I = 1 mA)", desc: "Referentni parametar praga provođenja." },
  ],
  numbers: [
    ["Tip (najčešći)", "MOV — ZnO"],
    ["Koeficijent α (ZnO)", "≈ 25 – 50"],
    ["Vezivanje", "paralelno sa kolom"],
    ["Karakteristika", "nelinearna, simetrična"],
    ["Glavna uloga", "zaštita od prenapona"],
  ],
  flashcards: [
    { q: "Šta je varistor i čemu služi?", a: "Naponski zavisan otpornik (VDR); štiti kolo od prenapona — iznad praga naglo provede i apsorbuje udar." },
    { q: "Od čega je najčešći varistor (MOV)?", a: "Od cink-oksida (ZnO) keramike, zrnaste strukture sa dodacima (Bi₂O₃)." },
    { q: "Kako se varistor vezuje u kolu?", a: "Paralelno sa kolom/potrošačem koji se štiti." },
    { q: "Zašto je I-V karakteristika simetrična?", a: "Granice zrna se ponašaju kao dve antiserijske diode → radi u oba smera (pogodno za AC)." },
    { q: "Šta opisuje koeficijent α?", a: "Stepen nelinearnosti (I=K·V^α); kod ZnO α≈25–50, veći α = oštrije obaranje napona." },
    { q: "Glavna mana varistora?", a: "Degradacija posle više udara (troši se) + parazitna kapacitivnost." },
  ],
  quiz: [
    { q: "Glavna uloga varistora je:", options: ["Merenje temperature", "Zaštita od prenapona", "Skladištenje energije", "Generisanje svetlosti"], answer: 1 },
    { q: "Najčešći varistor (MOV) pravi se od:", options: ["Silicijuma", "Cink-oksida (ZnO)", "Bakra", "Zlata"], answer: 1 },
    { q: "Iznad praga napona, otpornost varistora:", options: ["Raste", "Naglo opada", "Ostaje ista", "Postaje beskonačna"], answer: 1 },
    { q: "Varistor se u kolu vezuje:", options: ["Redno", "Paralelno", "Preko diode", "Preko transformatora"], answer: 1 },
    { q: "I-V karakteristika varistora I = K·V^α ima α:", options: ["= 1 (linearno)", "vrlo veliko (25–50)", "= 0", "negativno"], answer: 1 },
  ],
},
];
