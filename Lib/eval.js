/**
 * ----- Quizzle -----
 * Auswertung der Eingabe
*/

/** 
 * ----- Variablen -----
 * Hier werden alle Buttons in der Variable gespeichert
 * - Zugriff wie bei Array -> buttons[index] 
 * - index fängt bei 0 an
*/
const buttons = document.getElementsByClassName('btn');

let score = 0;

/** 
 * ----- Auswertung -----
 * Diese Funktion soll die Eingabe des Spielers auswerten und prüfen,
 * ob diese der Lösung Entspricht.
 * 
 * Hierbei werden Parameter zur Eingabe und ein Wert für die Lösung
 * übergeben und diese werden miteinander verglichen, ob diese 
 * Werte gleich sind.
 * - gleich -> Das Feld der Eingabe wird grün markiert und das Quiz geht weiter.
 * - ungleich -> Das Eingabefeld wird rot und das Lösungsfeld grün. Das Quiz 
 *   ist hier vorbei.
 * 
 * @input Wert der Eingabe (a = 0, b = 1, c = 2, d = 3)
 * 
 * @correct Wert der korrekten Antwort
 * - wird in 'pickQuestion()' deklariert und initiiert
*/
function eval(input) {

    // Wenn die Eingabe gleich der Lösung ist...
    if (input == correct) {

        // ...wird der Punktestand um 1 erhöht,...
        score += 1;

        console.log(score);

        // ...Färbe den Button grün und die Schrift weiß,...
        buttons[correct].style.backgroundColor = "green";
        buttons[correct].style.color = "white";

        // ...sperre die Knöpfe nach einer Antwort...
        for (let i = 0; i < 4; i++) {
            buttons[i].disabled = true;
        }

        // ...und zeige für kurze Zeit das Ergebnis.
        setTimeout(() => {

            if(score == 20){
                window.location = "end.html?score=" + score;  
            }

            // Dann setze das Spielfeld zurück und...
            reset();
            // ...wähle eine neue Frage.
            pickQuestion();
        }, 1.5 * 1000);
    }
    // ...ansonsten...
    else {

        //... Färbe die Eingabe rot und dessen Schrift weiß...
        buttons[input].style.backgroundColor = "red";
        buttons[input].style.color = "white";

        // ...und Färbe die Lösung grün und dessen Schrift weiß,...
        buttons[correct].style.backgroundColor = "green";
        buttons[correct].style.color = "white";

        // ...sperre die Knöpfe nach einer Antwort...
        for (let i = 0; i < 4; i++) {
            buttons[i].disabled = true;
        }

        // ...und zeige für kurze Zeit das Ergebnis.
        setTimeout(() => {

            console.log("Dein Endscore: " + score);

            // Seitenwechsel zum Ende und der Score wird per URL übergeben.
            window.location = "end.html?score=" + score;

        }, 1.5 * 1000);
    }
}