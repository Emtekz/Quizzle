/**
 * ----- Quizzle -----
 * Ende/ Punktestand
*/

/**
 * ----- Variablen ----- 
 * @final Punktestand, welchen der Spieler erreicht hat
 * - Dieser wird über die URL übergeben und von dort auch genommen.
*/
let final = new URLSearchParams(location.search); 

/**
 * ----- Quiz Ende -----
 * Diese Funktion beendet das Quiz. Sie gibt den ereichten Punktestand
 * und den höchsten Punktestand aus.
 */
function endQuiz() {

    // Die "Punktestand Anzeigen" wird in einer Variable gespeichert.
    endScore = document.getElementById('score');

    // Wenn ein Punktestand vorhanden ist...
    if(final.get("score") != null){

        // ...zeige den erreichten Punktestand an...
        endScore.innerHTML = final.get("score");
    }
    // ...ansonsten...
    else {

        // ...zeige "0" an.
        endScore.innerHTML = 0;
    }

    if (final.get('score') == 20){
        document.getElementById('win').style.display = "block";
    }
    
    if (final.get('score') == 0){
        document.getElementById('lose').style.display = "block";
    }
}

endQuiz();