/**
 * ----- Quizzle -----
 * Fragen Pool + Übergabe dieser
*/

/** 
 * ----- Variablen -----
 * @questionPool    Ansammlung aller Fragen (Array)
 * @answerPool      Ansammlung aller Antworten (2d Array)
 * - Der erste Index Antwort = Index Frage
 * Die Richtige Antwort ist IMMER an erster Stelle, damit der
 * Code sie problemlos bestimmen kann.
 * @picturePool     Ansammlung aller Bilder
 * 
 * @rnd Zufällige Zahl, welche eine Zahl zwischen 0 und der Länge
 * des Fragenpools erzeugt -> Fragen werden zufällig ausgewählt
 * 
 * @qClone  Kopie des Fragenpools
 * @aClone  Kopie des Antwortenpools
 * @pClone  Kopie des Bilderpools
 * Mit diesen Kopien wird hauptsächlich gearbeitet, da nach jeder
 * ausgewählten Frage und deren Antworten aus dem Clone Array enfernt
 * werden, damit eine Frage nicht mehrmals gewählt wird.
 * 
 * @pickedQuest  Platzhalter für ausgewählte Frage
 * @pickedAnsw  Platzhalter für ausgewählten Antworten
 * @pickedPic   Platzhalter für ausgewähltes Bild
 * @rightAnswer Zum Zwischenspeichern der richtigen Antwort
 * 
 * @mixer Array, in welchem die Antworten gemischt werden
 * 
 * @correct Variable für die Korrekte Antwort
 * - Wird in 'eval()' aufgegriffen
*/
const questionPool = [
    "Welcher ist der längste Fluss der Welt?",
    "Was ist die meist gesprochene Sprache in Indien?",
    "Wie viele Tasten hat ein Klavier?",
    "Aus welchem Land kommt die Band AC/DC?",
    "Welches Tier trägt den Namen \"Rotfedern\"?", //5
    "Wann war die Zeit des Jugenstils?",
    "Welcher Planet unseres Sonnensystems ist der Sonne am nächsten?",
    "Welches Land ist flächenmäßig das zweitgrößte der Erde?",
    "Wie heißt die Hauptstadt von Brasilien?",
    "Mit wie vielen Figuren startet ein Schachspiel?", //10
    "Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?",
    "Wie viele Bundesländer hat Deutschland?",
    "Wie heißt der Götterbote in der griechischen Mythologie?",
    "Wer erfand die drahtlose Energieübertragung?",
    "Von welchem Planeten stammt Spock (StarTrek)?", //15
    "Von wann bis wann ging der 2. Weltkrieg?",
    "Welches ist das teuerste Metall der Welt?",
    "Welches ist das größte Organ des Menschen?",
    "Welche ist die weltweit größte Stadt?",
    "Welches Pokemon ist als erstes entstanden ?"
];

const answerPool = [
    ["Der Nil", "Der Amazonas", "Der Rhein", "Der Niger"],
    ["Hindi", "Urdu", "Punjabi", "Bengali"],
    ["88", "86", "82", "74"],
    ["Australien", "USA", "England", "Neuseeland"],
    ["Ein Fisch", "Eine Raupe", "Ein Vogel", "Eine Katze"],
    ["1890 bis 1910", "1950 bis 1980", "1920 bis 1940", "1820 bis 1850"],
    ["Merkur", "Pluto", "Mars", "Venus"],
    ["Kanada", "Russland", "China", "Indien"],
    ["Brasilia", "Rio de Janeiro", "Sao Paulo", "Salvador"],
    ["32", "16", "24", "40"],
    ["Konrad Adenauer", "Helmut Kohl", "Helmut Schmidt", "Kurt Kiesinger"],
    ["16", "17", "15", "14"],
    ["Hermes", "Poseidon", "Amor", "Merkur"],
    ["Nikola Tesla", "Thomas Edison", "Johannes Gutenberg", "Alexander Fleming"],
    ["Vulkan", "Erde", "Kronos", "Tatooine"],
    ["1939 bis 1945", "1933 bis 1945", "1936 bis 1945", "1930 bis 1940"],
    ["Rhodium", "Gold", "Platin", "Ruthenium"],
    ["Haut", "Lunge", "Herz", "Gehirn"],
    ["Tokyo", "New York", "London", "Peking"],
    ["Rizeros", "Pikachu", "Bisasam", "Mewtu"]
];

const picturePool = [
    "Images/Fragen/LaengsterFluss.webp",
    "Images/Fragen/SpracheIndien.webp",
    "Images/Fragen/TastenKlavier.webp",
    "Images/Fragen/ACDC.webp",
    "Images/Fragen/NameRotfedern.webp",
    "Images/Fragen/WannJugenstil.webp",
    "Images/Fragen/ErsterPlanet.webp",
    "Images/Fragen/ZweitGrLand.webp",
    "Images/Fragen/HauptstadtBrasilien.webp",
    "Images/Fragen/SpielfigurenSchach.webp",
    "Images/Fragen/ErsterKanzler.webp",
    "Images/Fragen/WieVieleBundeslaender.webp",
    "Images/Fragen/Goetterbote.webp",
    "Images/Fragen/EntdeckerElektro.webp",
    "Images/Fragen/PlanetSpock.webp",
    "Images/Fragen/WW2.webp",
    "Images/Fragen/WertvollstesMetall.webp",
    "Images/Fragen/GroesstesOrgan.webp",
    "Images/Fragen/GroessteStadt.webp",
    "Images/Fragen/ErstesPokemon.webp",
];

let rnd;

/**
 * "let CopyArray = [...Array];" kopiert ein Objekt, ohne dass dabei
 * das Urspüngliche verändert wird - z. B. Alle Aktivitäten nur in der Kopie
*/
let qClone = [...questionPool];
let aClone = [...answerPool];
let pClone = [...picturePool];

let pickedQuest = "";
let pickedAnsw = [];
let pickedPic = "";
let rightAnswer = "";

let mixer = [];
let mixRnd;

var correct;

/**
 * ----- Frage auswählen -----
 * Diese Funktion soll zu Beginn und nach jeder richtigen Frage eine
 * neue Frage auswählen und diese sowie deren Antwortmöglichkeiten im
 * overlay ausgeben.
 * Zudem übergibt sie der Auswertung den Wert für die korrekte Antwort.
 * 
 * Dafür wird erst eine Zufallszahl generiert, wodurch die Fragen nicht
 * vorhersehbar sind. Danach wird die zufällig ausgewählte Frage an das
 * HTML Dokument übergeben und ausgegeben.
 * Die dazugehörigen Antworten werden durcheinander gewürfelt und in
 * einer nicht vorhersehbaren Reihenfolge ausgegeben.
 * Durch Abfrage wird der Wert der richtigen Antwort in der Variable 
 * 'correct' initiiert.
 * Abschließend werden die ausgewählten Elemente aus den Clone-Arrays
 * gelöscht und durch das letzte Element des jeweiligen Klons ersetzt.
*/
function pickQuestion() {

    // "rnd" wird mit einer hier generierten Zufallszahl initiiert
    rnd = Math.floor(Math.random() * qClone.length);

    // Zufällige Frage wird mithilfe der Zufallszahl ausgewählt
    pickedQuest = qClone[rnd];
    // Die dazugehörigen Antworten werden ausgewählt
    pickedAnsw = [...aClone[rnd]];
    // Das dazugehörige Bild wird Ausgewählt
    pickedPic = pClone[rnd];

    // Die Richtige Antwort wird gespeichert
    rightAnswer = pickedAnsw[0];

    // Für alle 4 Antwortmöglichkeiten wird...
    for (let j = 0; j < 4; j++) {

        // ...eine Zufällige Zahl zwischen 0 und 3 erstellt.
        mixRnd = Math.floor(Math.random() * 4);

        // Wenn die zufällige Antwortmöglichkeit leer ist...
        if (pickedAnsw[mixRnd] == "/") {
            // ... wird der Index um 1 gesenkt (wiederholung des Indexes) ...
            j--;
        }
        // ...ansonsten...
        else {
            //...bekommt das Misch-Array die Antwortmöglichkeit...
            mixer[j] = pickedAnsw[mixRnd];

            //... und diese wird durch eine Leerstelle ersetzt.
            pickedAnsw[mixRnd] = "/";
        }
    }

    // Die gewählte Frage wird ausgegeben
    document.getElementById('question').innerHTML = pickedQuest;

    // Das dazugehörige Bild wird angezeigt
    document.getElementById('picture').src = pickedPic;

    // Für alle 4 Antwortmöglichkeiten wird...
    for (let i = 0; i < 4; i++) {
        // ...die auf die Buttons ausgegeben.
        document.getElementsByClassName('answ')[i].innerHTML = mixer[i];

        // Wenn die ausgegebene Antwort gleich der Richtigen ist...
        if (mixer[i] == rightAnswer) {
            // ...wird "correct" mit dem jeweiligen Index initiiert.
            correct = i;
        }
    }

    // Wenn das Array mehr als 1 Inhalt hat...
    if (qClone.length > 1) {
        // ...ersetze die gewählten Frage durch die Letzte in der Liste,...
        qClone[rnd] = qClone[qClone.length - 1];
        // ...ersetze dazugehörigen Antworten durch die Letzten und...
        aClone[rnd] = aClone[aClone.length - 1];
        // ...ersetze dazugehöriges Bild durch das Letzte.
        pClone[rnd] = pClone[pClone.length - 1];

        // Lösche den letzten Eintrag des Arrays
        qClone.pop();
        aClone.pop();
        pClone.pop();
    }
    // ...ansonsten wenn genau 1 Inhalt vorhanden ist...
    else if (qClone.length == 1) {

        //... Kopiere wieder den Inhalt aus dem Original.
        qClone = [...questionPool];
        aClone = [...answerPool];
        pClone = [...picturePool];
    }
}

pickQuestion();