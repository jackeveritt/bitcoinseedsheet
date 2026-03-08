// ============================================================
// SECTION 1: CONSTANTS
//
// The grid is 79 rows × 26 columns (A through Z).
// 79 × 26 = 2,054 cells — just enough for all 2,048 BIP39 words
// with 6 empty cells at the end.
//
// The lookup tables and full word sheets are split into two pages
// of 13 columns each (13 × 79 = 1,027 entries per page, covering
// 1,027 + 1,021 = 2,048 words across the two pages).
// ============================================================

const GRID_ROWS    = 79;
const GRID_COLS    = 26;
const LOOKUP_COLS  = 13;                        // columns per lookup/fullword page
const LOOKUP_SPLIT = GRID_ROWS * LOOKUP_COLS;   // = 1,027 entries on first lookup page

// Column letters A–Z used for grid headers and coordinate strings.
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// SHA-256 of BIP39_WORDS.join('\n') using the canonical English word list.
// Verified against: https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt
// If this check fails, the word list has been tampered with — do not use the sheet.
const WORDLIST_SHA256 = '187db04a869dd9bc7be80d21a86497d692c0db6abd3aa8cb6be5d618ff757fae';


// ============================================================
// SECTION 2: BIP39 WORD LIST
//
// The complete 2,048-word English BIP39 word list, as defined by
// Bitcoin Improvement Proposal 39 (BIP-0039).
// Source: https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt
//
// IMPORTANT: This list must not be modified. The words are chosen
// by the BIP39 standard so that every word is uniquely identifiable
// by its first 4 characters — no two words share the same 4-char
// prefix. This property is used to safely abbreviate words in the
// grid display.
// ============================================================

const BIP39_WORDS = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","annual","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","erosion","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"];


// ============================================================
// SECTION 3: CRYPTOGRAPHIC RANDOMNESS
//
// cryptoRandBelow(n)
//   Returns a uniformly random integer in the range [0, n-1].
//   Uses the browser's built-in cryptographic random number
//   generator (crypto.getRandomValues), which is suitable for
//   security-sensitive applications.
//
//   Why not Math.random()?
//   Math.random() is a pseudo-random number generator — its
//   output is deterministic and predictable. crypto.getRandomValues()
//   uses the operating system's entropy source and is not predictable.
//
//   Why rejection sampling?
//   We generate a random Uint16 (range 0–65535). For a target range
//   of n, simply doing (value % n) would over-represent values below
//   (65536 % n). Rejection sampling avoids this by discarding values
//   above the largest multiple of n that fits in Uint16. The rejection
//   probability is at most n/65536 < 3.2% for any n we use here.
//
// secureShuffle(array)
//   Returns a NEW array that is a uniformly random permutation of
//   the input. Uses the Fisher-Yates shuffle algorithm.
//   The original array is NOT modified.
// ============================================================

function cryptoRandBelow(n) {
  if (n <= 1) return 0;
  const buf = new Uint16Array(1);
  // Largest multiple of n that fits in a Uint16 (0–65535).
  // Values at or above this threshold are rejected and redrawn.
  const threshold = 0x10000 - (0x10000 % n);
  let value;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= threshold);
  return value % n;
}

function secureShuffle(array) {
  const shuffled = array.slice(); // copy — never mutate the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick a uniformly random position j in [0, i] and swap.
    const j = cryptoRandBelow(i + 1);
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
    // Note: full words are preserved here. The 4-character
    // abbreviation is applied only at display time in the
    // seed sheet, so the lookup and recovery tables can use
    // the complete words.
  }
  return shuffled;
}


// ============================================================
// SECTION 4: DATA GENERATION
//
// generateShuffledWords()
//   Produces a fresh random ordering of all 2,048 BIP39 words.
//   Call this once per generation. The result is the single
//   source of truth that drives all six printed pages.
//
// getCoordinate(linearIndex)
//   Converts a position in the shuffled word array (0–2047) to
//   a grid coordinate string (e.g. 0 → "A1", 26 → "A2", 2047 → "Z79").
//   Column = index % 26  (0 = A, 25 = Z)
//   Row    = floor(index / 26) + 1  (1–79)
//
// buildLookupEntries(shuffledWords)
//   Creates a lookup table: for each word, records its 4-char
//   abbreviation and the grid coordinate assigned to it after
//   shuffling. Sorts the entries alphabetically by abbreviation
//   so the printed lookup pages read A → Z.
// ============================================================

// ============================================================
// SECTION 3b: WORD LIST INTEGRITY VERIFICATION
//
// verifyWordList()
//   Computes the SHA-256 of BIP39_WORDS.join('\n') using
//   the Web Crypto API and compares it to WORDLIST_SHA256.
//   Throws if the digest does not match, so a tampered word
//   list is caught before any sheet is generated.
// ============================================================

async function verifyWordList() {
  const encoded = new TextEncoder().encode(BIP39_WORDS.join('\n'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  if (hashHex !== WORDLIST_SHA256) {
    throw new Error(
      'Word list integrity check failed.\n\n' +
      'Expected: ' + WORDLIST_SHA256 + '\n' +
      'Got:      ' + hashHex + '\n\n' +
      'The BIP39 word list may have been tampered with. Do not use this sheet.'
    );
  }
}

function generateShuffledWords() {
  return secureShuffle(BIP39_WORDS);
}

function getCoordinate(linearIndex) {
  const col = linearIndex % GRID_COLS;
  const row = Math.floor(linearIndex / GRID_COLS) + 1;
  return LETTERS[col] + row;
}

function buildLookupEntries(shuffledWords) {
  const entries = shuffledWords.map((word, idx) => ({
    abbr:  word.substring(0, 4),  // 4-char prefix, unique for every BIP39 word
    coord: getCoordinate(idx)
  }));
  // Sort by abbreviation so the lookup pages read alphabetically.
  entries.sort((a, b) => a.abbr.localeCompare(b.abbr));
  return entries;
}


// ============================================================
// SECTION 5 (removed): Record Sheet is now static HTML in index.html.
// ============================================================


// ============================================================
// SECTION 6: SEED SHEET TABLE BUILDER (Page 2)
//
// buildSeedSheetTable(shuffledWords)
//   Builds the main 79-row × 26-column word grid.
//   Each cell shows the first 4 characters of the word placed
//   at that position. The 4-char abbreviation uniquely identifies
//   any BIP39 word (guaranteed by the BIP39 standard).
//
//   Grid layout:
//     Column header row: [blank] A B C ... Z
//     Data rows (79):    [row#]  word word ... word
//
//   Linear index mapping:
//     row i (0-based), col j (0-based) → shuffledWords[i * 26 + j]
//     Coordinate string = LETTERS[j] + (i + 1)
// ============================================================

function buildSeedSheetTable(shuffledWords) {
  const table = document.createElement('table');
  table.className = 'seed-table';

  // Header row: blank top-left cell, then column letters A–Z
  const thead = table.createTHead();
  const headerRow = thead.insertRow();
  appendCell(headerRow, 'th', '', 'row-label');
  for (let j = 0; j < GRID_COLS; j++) {
    appendCell(headerRow, 'th', LETTERS[j]);
  }

  // Data rows: row number label + 26 word cells
  const tbody = table.createTBody();
  let wordIndex = 0;
  for (let i = 0; i < GRID_ROWS; i++) {
    const row = tbody.insertRow();
    row.className = (i % 2 === 0) ? 'row-even' : 'row-odd';

    appendCell(row, 'td', String(i + 1), 'row-label');

    for (let j = 0; j < GRID_COLS; j++) {
      if (wordIndex < shuffledWords.length) {
        // Show only the first 4 characters to fit the cell width.
        appendCell(row, 'td', shuffledWords[wordIndex].substring(0, 4));
        wordIndex++;
      } else {
        appendCell(row, 'td', ''); // trailing empty cells (last 6 slots)
      }
    }
  }

  return table;
}


// ============================================================
// SECTION 7: LOOKUP TABLE BUILDER (Pages 3 and 4)
//
// buildLookupTable(lookupEntries, pageIndex)
//   Builds one half of the alphabetical word → coordinate table.
//
//   pageIndex 0: entries[0 .. 1026]    — first half of alphabet
//   pageIndex 1: entries[1027 .. 2047] — second half of alphabet
//
//   Layout: 79 rows × 13 columns, filled left-to-right then
//   top-to-bottom. Reading left to right across each row gives
//   alphabetical order. Reading top to bottom covers the page.
//
//   Each cell shows: "abbr  COORD"
//   For example:     "aban  A1"   (abandon placed at A1)
//
//   The abbreviation is padded to 4 chars with a non-breaking
//   space (\u00a0) to maintain consistent column width.
// ============================================================

function buildLookupTable(lookupEntries, pageIndex) {
  const startIdx   = pageIndex * LOOKUP_SPLIT;
  const pageEntries = lookupEntries.slice(startIdx, startIdx + LOOKUP_SPLIT);

  const table = document.createElement('table');
  table.className = 'lookup-table';

  const tbody = table.createTBody();
  for (let row = 0; row < GRID_ROWS; row++) {
    const tr = tbody.insertRow();
    tr.className = (row % 2 === 0) ? 'row-even' : 'row-odd';

    for (let col = 0; col < LOOKUP_COLS; col++) {
      // Row-major order: read left-to-right, top-to-bottom
      const entryIdx = row * LOOKUP_COLS + col;
      const td = tr.insertCell();
      if (entryIdx < pageEntries.length) {
        const e = pageEntries[entryIdx];
        // Pad abbreviation to 4 chars for alignment
        const abbr = e.abbr.padEnd(4, '\u00a0');
        td.textContent = abbr + '\u00a0' + e.coord;
      }
    }
  }

  return table;
}


// ============================================================
// SECTION 8: GENERATION VALIDATION
//
// validateMapping(shuffledWords, lookupEntries)
//   Asserts that every lookup entry's coordinate correctly
//   identifies the matching word in the shuffled grid.
//   Runs on every generation; throws on any mismatch so a
//   corrupt sheet is never shown to the user.
//
//   Checks performed:
//     1. shuffledWords contains exactly 2,048 words.
//     2. lookupEntries contains exactly 2,048 entries.
//     3. For every entry {abbr, coord}, the word placed at
//        coord in shuffledWords has abbr as its 4-char prefix.
//     4. No coordinate appears more than once in the lookup.
//     5. All 2,048 grid positions are covered by the lookup.
// ============================================================

function validateMapping(shuffledWords, lookupEntries) {
  // 1. Word count must equal the BIP39 list length.
  if (shuffledWords.length !== BIP39_WORDS.length) {
    throw new Error(
      'validateMapping: expected ' + BIP39_WORDS.length + ' words, got ' + shuffledWords.length
    );
  }

  // 2. Lookup entry count must also equal the BIP39 list length.
  if (lookupEntries.length !== BIP39_WORDS.length) {
    throw new Error(
      'validateMapping: expected ' + BIP39_WORDS.length + ' lookup entries, got ' + lookupEntries.length
    );
  }

  // 3. Build a coord → word map from the shuffled array.
  const coordToWord = new Map();
  for (let idx = 0; idx < shuffledWords.length; idx++) {
    coordToWord.set(getCoordinate(idx), shuffledWords[idx]);
  }

  // 4. For every lookup entry, verify its abbr matches the word
  //    at the claimed coordinate, and track seen coordinates.
  const seenCoords = new Set();
  for (const entry of lookupEntries) {
    if (seenCoords.has(entry.coord)) {
      throw new Error(
        'validateMapping: duplicate coordinate "' + entry.coord + '" in lookup entries'
      );
    }
    seenCoords.add(entry.coord);

    const word = coordToWord.get(entry.coord);
    if (word === undefined) {
      throw new Error(
        'validateMapping: lookup coord "' + entry.coord + '" not found in grid'
      );
    }
    const expectedAbbr = word.substring(0, 4);
    if (expectedAbbr !== entry.abbr) {
      throw new Error(
        'validateMapping: at ' + entry.coord + ', grid word "' + word +
        '" (abbr "' + expectedAbbr + '") \u2260 lookup abbr "' + entry.abbr + '"'
      );
    }
  }

  // 5. All 2,048 grid positions must be covered by the lookup.
  if (seenCoords.size !== BIP39_WORDS.length) {
    throw new Error(
      'validateMapping: ' + seenCoords.size + ' unique coords in lookup, expected ' + BIP39_WORDS.length
    );
  }
}


// ============================================================
// SECTION 9: DOM HELPERS AND PAGE ASSEMBLY
//
// appendCell(row, tagName, text, className)
//   Creates a <td> or <th>, sets its text content and optional
//   CSS class, appends it to the given table row, and returns it.
//
// populateAllPages(shuffledWords)
//   Orchestrates building all six print pages.
//   Called once per generation (or re-generation).
//   Clears any previously generated content before inserting new.
// ============================================================

function appendCell(row, tagName, text, className) {
  const cell = document.createElement(tagName);
  cell.textContent = text;
  if (className) cell.className = className;
  row.appendChild(cell);
  return cell;
}

function populateAllPages(shuffledWords) {
  // Build the alphabetically-sorted word → coordinate entries.
  const lookupEntries = buildLookupEntries(shuffledWords);

  // Verify every lookup entry maps correctly back to the grid.
  // Throws immediately if anything is wrong — no corrupt sheet is shown.
  validateMapping(shuffledWords, lookupEntries);

  // Helper: clear a container and insert the provided table element.
  function inject(containerId, tableElement) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(tableElement);
  }

  inject('seed-sheet-container', buildSeedSheetTable(shuffledWords));
  inject('lookup-1-container', buildLookupTable(lookupEntries, 0));
  inject('lookup-2-container', buildLookupTable(lookupEntries, 1));
}


// ============================================================
// SECTION 10: EVENT HANDLERS AND INITIALISATION
//
// handleGenerate()
//   Called when the user clicks "Generate Seed Sheet" on the
//   landing page. Shuffles the word list, populates all pages,
//   then hides the landing page and reveals the app view.
//
// handleRegenerate()
//   Called when the user clicks "New Sheet" in the app view.
//   Asks for confirmation (so the user doesn't accidentally
//   lose their current sheet) then generates a fresh one.
//
// handlePrint()
//   Opens the browser's print dialog. The @media print CSS
//   hides all UI chrome so only the six pages are printed.
// ============================================================

// clearGeneratedPages()
//   Overwrites all generated table containers with empty strings,
//   reducing the window in which the shuffled grid is resident in
//   the DOM. Called after printing and on page unload.
function clearGeneratedPages() {
  ['seed-sheet-container', 'lookup-1-container', 'lookup-2-container'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });
}

async function handleGenerate() {
  try {
    await verifyWordList();
  } catch (err) {
    alert(err.message);
    return;
  }

  const shuffledWords = generateShuffledWords();
  populateAllPages(shuffledWords);

  // Overwrite the local shuffled array — the DOM cells hold only
  // 4-char abbreviations; full words are no longer needed in memory.
  for (let i = 0; i < shuffledWords.length; i++) shuffledWords[i] = '';

  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display    = 'block';
  window.scrollTo(0, 0);
}

async function handleRegenerate() {
  const confirmed = window.confirm(
    'This will generate a completely new, different sheet.\n\n' +
    'Your current sheet will be gone permanently — it cannot be recovered.\n\n' +
    'Have you already printed and stored the current sheet?'
  );
  if (!confirmed) return;

  try {
    await verifyWordList();
  } catch (err) {
    alert(err.message);
    return;
  }

  clearGeneratedPages();

  const shuffledWords = generateShuffledWords();
  populateAllPages(shuffledWords);

  for (let i = 0; i < shuffledWords.length; i++) shuffledWords[i] = '';

  window.scrollTo(0, 0);
}

function handlePrint() {
  window.print();
}

// Wire up button events once the DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-generate')
    .addEventListener('click', handleGenerate);
  document.getElementById('btn-print')
    .addEventListener('click', handlePrint);
  document.getElementById('btn-regenerate')
    .addEventListener('click', handleRegenerate);

  // Clear generated tables on unload to limit the window in which
  // the shuffled grid is resident in the DOM and browser session state.
  window.addEventListener('beforeunload', clearGeneratedPages);
});
