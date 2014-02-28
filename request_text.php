<?php


$ourURL = $_POST['download_url'];

   $data = file_get_contents($ourURL,0);
   $data = substr($data, strpos($data, "<pre>")+5);
  $data = substr($data, 0, strpos($data, "</pre>"));

 echo $data;
?>