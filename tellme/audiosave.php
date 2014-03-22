<?php

if(isset($_REQUEST['audio_file'])) {
	// pull the raw binary data from the POST array
	$data = substr($_REQUEST['audio_file'], strpos($_REQUEST['audio_file'], ",") + 1);
	// decode it
	$decodedData = base64_decode($data);
	// print out the raw data,
	$filename = $_REQUEST['audio_name'];
	// echo $filename;

	// write the data out to the file
	$fp = fopen('../audiofiles/'.$filename, 'wb');
	fwrite($fp, $decodedData);
	fclose($fp);
	echo json_encode(array("status"=>200, "message"=>"Audio file was recieved and stored successfully at http://djotjog.com/hadithi/audiofiles/".$filename));
}

?>