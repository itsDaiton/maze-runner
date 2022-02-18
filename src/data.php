<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') { //kontrola, jestli nám přišli data pomocí metody POST
    $data = array();

    $dir = "../data/";
    $fileName = "data.json";
    $filePath = $dir . $fileName;   

    //pokud soubor neexistuje, tak se data naparsují do JSONu a vytvoří se soubor
    if (!file_exists($filePath)) {
        $data[] = array(
            'Name' => $_POST['name'],
            'Time' => $_POST['time'],
            'Difficulty' => $_POST['difficulty'],
        );
        
        $json = json_encode($data);
        file_put_contents($filePath, $json);
    }
    //pokud soubor již existuje, tak ho otevřeme a data do něj přidáme
    else {
        $jsonFile = file_get_contents($filePath);
        $array = json_decode($jsonFile, true);
        $array[] = array(
            'Name' => $_POST['name'],
            'Time' => $_POST['time'],
            'Difficulty' => $_POST['difficulty'],
        );

        $json = json_encode($array);
        file_put_contents($filePath, $json);
    }
}
?>