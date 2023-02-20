/**
 * ----- Quizzle -----
 * Reset bei Seitenaufruf und Neuer Frage
*/

/**
 * ----- "Spielfeld" zurücksetzen ----
 * Diese Funktion soll die farblichen Änderungen an den Antwort-
 * möglichkeiten zurücksetzen. Sie aktiviert auch die Knöpfe wieder,
 * die nach der Eingabe gesperrt worden sind ('eval()').
*/
function reset() {

    // Für alle 4 Antwortmöglichkeiten...
    for (let i = 0; i < buttons.length; i++) {

        // ...wird die Optik zu "Ursprung" zurückgesetzt...
        buttons[i].style.backgroundColor = "#e7e7e7";
        buttons[i].style.border = "1px solid #8e8e8e";
        buttons[i].style.color = "black";

        // ...und die Knöpfe wieder aktiviert.
        buttons[i].disabled = false;
    }
}