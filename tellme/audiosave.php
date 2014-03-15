<?php

if(isset($_POST['audio_file'])) {
	// pull the raw binary data from the POST array
	$data = substr($_POST['audio_file'], strpos($_POST['audio_file'], ",") + 1);
	// decode it
	$decodedData = base64_decode($data);
	// print out the raw data,
	$filename = $_POST['audio_name'];
	echo $filename;
	// write the data out to the file
	$fp = fopen('../audiofiles/'.$filename, 'wb');
	fwrite($fp, $decodedData);
	fclose($fp);
}

?>