<?php

function unzip($location, $newLocation){
    if(exec("unzip $location", $arr)){
        mkdir($newLocation);
        for($i = 1; $i< count($arr); $i++){
            $file = trim(preg_replace("~inflating: ~", "", $arr[$i]));
            copy($location.'/'.$file, $newLocation.'/'.$file);
            unlink($location.'/'.$file);
        }
        return TRUE;
    }else{
        return FALSE;
    }
}

//Use the code as following:
// include 'functions.php';

if(isset($_REQUEST['audio_file'])) {
    //Requested name is -- hadithi-recoding.zip
    if(unzip('audiofiles/zipedfiles/' + $_REQUEST['audio_name'], 'audiofiles/unzipedfiles'))
        echo json_encode(array(
            "status"=>200, 
            "message"=>"Audio file was recieved and stored successfully at http://djotjog.com/hadithi/audiofiles/".$filename
            ));
    else
        echo 'Error';
}

?>