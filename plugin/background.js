// Configure search URL to hit
var search_url = "https://desk.gotoassist.com/goto?q="

// This event is fired when the content js asks us to find the phrase for a number
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.number) {
    sendResponse(pleasantLawyer.numberToWords(request.number));
  }
});

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    var result = pleasantLawyer.processTextInput(text);
    if (result) {
      if (isNaN(result)) {
        var suggestion_text = "Beetil phrase: ";
        var suggestion_query = text;
      }
      else {
        var suggestion_text = "B#";
        var suggestion_query = result;
      }
      suggest([
        {content: search_url + suggestion_query, description: suggestion_text + result}
      ]);
    }
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    if (isNaN(text)) {
      text = pleasantLawyer.processTextInput(text);
    }
    if (!isNaN(text)) {
      navigate(search_url + text);
    }
  });


// Helper function to navigate to a URL
function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

var PleasantLawyer = function() {
  var adjectives=["pleasant","deserted","billowy","soft","ill","little","typical","jumpy","anxious","cruel","spooky","rustic","diligent","drunk","short","festive","fine","addicted","charming","ultra","lewd","jazzy","hesitant","numerous","filthy","oceanic","robust","juicy","grubby","huge","lazy","new","careful","pumped","elderly","whole","aromatic","dark","kind","demonic","ritzy","fat","early","envious","broad","minor","capable","crowded","spicy","far","open","dapper","afraid","shiny","thick","lavish","hard","immense","tired","ripe","quick","abusive","eminent","witty","guarded","late","gaping","gifted","groovy","annoyed","mature","happy","calm","scary","wiry","resonant","fancy","internal","absurd","lucky","natural","large","brief","sincere","yummy","giddy","testy","marked","tiny","hanging","pathetic","cowardly","wry","old","aspiring","deep","narrow","odd","silly","true","half","decorous","aboard","ratty","parched","friendly","windy","smoggy","sharp","zippy","grieving","doubtful","thankful","languid","breezy","nifty","many","creepy","succinct","proud","quack","joyous","innate","dead","rare","wild","legal","bad","erect","tart","watery","fearless","rapid","panicky","free","great","brave","majestic","crazy","troubled","meek","heavy","low","various","boorish","smiling","drab","ashamed","faded","wary","cool","needy","acrid","toasty","tidy","jealous","loud","tan","frail","common","regular","obscene","wrong","fabulous","prickly","aware","foolish","gray","royal","lean","powerful","salty","tall","good","jaded","habitual","organic","irate","wide","smelly","wanting","seemly","near","teeny","oafish","boiling","madly","trite","nosy","pretty","homely","peaceful","towering","fuzzy","second","labored","round","possible","zany","loose","sour","wee","blue","real","small","tough","clumsy","orange","swift","tearful","offbeat","poor","burly","educated","sad","aquatic","curly","fluffy","wretched","stupid","weak","rabid","young","aloof","guttural","roomy","adorable","juvenile","trashy","sweet","taboo","bloody","furtive","puzzled","close","equal","romantic","optimal","zealous","hurt","somber","noisy","scrawny","wrathful","foamy","woozy","distinct","poised","swanky","flowery","mute","cultured","stormy","glossy","unbiased","funny","dull","nutty","devilish","alike","womanly","utopian","better","murky","hungry","uptight","plucky","hissing","full","shrill","detailed","gullible","soggy","bawdy","berserk","itchy","hulking","moaning","ruthless","purple","elite","lying","deranged","alert","uppity","flippant","mundane","arrogant","stiff","rural","misty","cautious","glib","clean","empty","fertile","cuddly","level","bashful","puny","elegant","splendid","idiotic","roasted","square","faulty","super","dashing","adamant","big","erratic","lethal","gaudy","easy","gleaming","imported","black","slow","steep","fast","classy","gentle","mere","elated","petite","sulky","gigantic","flat","nervous","evil","like","severe","high","hellish","stale","average","wise","fierce","damp","perfect","assorted","vulgar","naughty","muddy","puffy","massive","slimy","abrupt","defiant","famous","light","nasty","gamy","serious","melted","terrible","tawdry","mighty","violent","past","wet","daily","giant","upbeat","separate","ruddy","versed","cagey","animated","sleepy","exultant","fair","abnormal","debonair","raspy","sudden","gainful","evasive","plain","sassy","eager","mammoth","angry","bored","tense","tasty","relieved","awful","known","subdued","right","able","selfish","nice","tight","telling","vengeful","vast","hot","wasteful","unusual","abject","gorgeous","overt","loving","ancient","vigorous","icy","noxious","jagged","medical","rampant","exotic","confused","horrible","ossified","rich","naive","same","yellow","magenta","tame","cold","painful","nebulous","snotty","acoustic","chunky","yielding","oval","red","rainy","wicked","lacking","sedate","macho","ignorant","ordinary","lopsided","normal","hollow","wakeful","coherent","ragged","economic","rotten","long","bizarre","jolly","waiting","busy","dizzy","acid","nonstop","sore","cynical","vague","onerous","waggish","dynamic","dusty","racial","physical","tacky","hypnotic","excited","ethereal","shy","gusty","worried","lyrical","polite","sneaky","fixed","icky","husky","godly","bitter","utter","wacky","strong","uneven","skinny","bumpy","accurate","alleged","chief","solid","amuck","spurious","dirty","lush","ahead","ugly","mushy","unable","volatile","modern","jobless","dry","few","dazzling","used","first","binary","cheap","adhesive","upset","zonked","lively","jittery","phobic"],
      nouns=["lawyer","solo","key","kite","desk","dinner","amount","sofa","brush","size","jump","crush","spot","skate","jewel","mitten","cave","lumber","guide","drum","show","rod","finger","chair","thought","soda","hydrant","bat","science","cat","number","fruit","ocean","robin","river","bucket","opinion","juice","news","lip","car","pump","hill","ant","fuel","duck","father","ear","line","brother","gate","mint","cap","elbow","scent","crow","title","spiders","arm","hat","pipe","farm","summer","reward","drop","ship","garden","band","thing","nest","harbor","milk","can","pest","pin","quilt","frog","ball","beggar","group","match","jar","oil","scarf","whip","wire","rest","sheet","ring","fan","suit","degree","iron","nation","theory","brick","sink","bee","test","oatmeal","mark","crib","tin","hand","tax","patch","cow","drink","fall","sugar","queen","deer","silk","galley","lift","vest","wheel","map","space","truck","hall","wax","feet","rat","part","friend","cough","wine","smoke","shape","geese","bean","fowl","zipper","grip","land","bread","middle","man","cream","arch","prose","wave","quartz","death","paper","dress","leg","library","badge","zinc","temper","rifle","dad","watch","fear","hour","pan","baby","act","brake","crack","trouble","meeting","heat","cable","low","book","smile","drain","riddle","war","journey","hose","range","cook","side","need","sand","door","bomb","jeans","yard","tank","effect","frame","comb","regret","print","mouth","food","end","grain","island","neck","lead","power","salt","talk","goose","veil","meal","loss","van","hook","weight","smell","toy","seed","value","teeth","trip","nose","wall","home","coil","recess","voyage","pear","town","apple","route","look","fly","soup","moon","week","reason","smash","wrist","touch","button","club","dog","sea","rose","tree","orange","swim","team","offer","mom","twig","joke","egg","burn","fog","wound","curve","wren","join","glue","wealth","rabbit","dock","room","boat","tray","cup","aunt","sweater","year","table","blow","coal","tooth","clock","bun","noise","screw","wool","disgust","point","bulb","floor","goat","stop","glove","system","nut","fish","gun","lock","zoo","spring","history","eye","day","detail","throat","loaf","berry","art","yoke","voice","pocket","lunch","bike","list","flight","toe","stick","mist","cause","rock","edge","sock","plot","level","turn","liquid","base","cent","school","cast","alarm","road","square","bubble","kettle","faucet","flesh","bell","error","soap","cub","letter","run","pull","cellar","blade","slope","answer","toad","metal","stew","sun","clam","limit","sister","net","idea","rule","hen","fight","pet","nerve","flag","judge","laugh","star","help","camp","glass","visitor","ray","field","wish","cake","jelly","mass","box","slip","insect","bait","light","event","bed","game","hammer","time","pen","cover","paste","way","giants","night","bag","jam","animal","sleet","verse","bottle","pig","kick","debt","play","lamp","sense","hair","angle","taste","mice","rub","border","tent","corn","able","knot","pie","sign","self","back","tub","attack","lake","name","tiger","vase","cactus","jail","slave","copy","hot","ink","wash","pickle","sky","fork","zephyr","engine","maid","bone","love","oven","owner","horn","move","face","rice","nail","donkey","magic","view","ticket","hope","mother","knife","color","pain","owl","rake","snow","doll","note","church","rail","honey","morning","page","pot","fold","sail","lace","north","machine","order","gold","advice","tail","yam","hole","income","knee","porter","yak","money","bushes","popcorn","sort","cushion","body","unit","dust","sack","spy","top","cobweb","rhythm","zebra","polish","worm","sneeze","ghost","son","bit","straw","skin","tongue","air","alley","roll","bird","chin","justice","lizards","icicle","uncle","circle","snake","dirt","thumb","music","volcano","cry","fire","use","pizzas","humor","chess","ice","push"],
      wordListSize = adjectives.length,
      adjectiveMap = {},
      nounMap = {};

  for (var i=0; i<wordListSize; i++) {
    adjectiveMap[adjectives[i].substring(0, 3)] = i;
    nounMap[nouns[i].substring(0, 3)] = i;
  }
  
  this.processTextInput = function(text){
    if (isNaN(text))
    {
        words = text.split(' ');
        return this.wordsToNumber(words[0], words[1]);
    } else {
        return this.numberToWords(+text)
    }
  }
  this.numberToWords = function(n){
    var div = Math.floor((n - 1) / wordListSize);
    var adj = (n - 1) % wordListSize;
    var noun = (adj + div) % wordListSize;
    return adjectives[adj] + ' ' + nouns[noun];
  }

  this.wordsToNumber = function(adj, noun){
    if (!adj || !noun) { return; }
    var adj_index = adjectiveMap[adj.substring(0, 3)];
    var noun_index = nounMap[noun.substring(0, 3)];
    var mod = ((noun_index - adj_index) + wordListSize) % wordListSize;
    return (mod * wordListSize + adj_index + 1);
  }
}

var pleasantLawyer = new PleasantLawyer();
