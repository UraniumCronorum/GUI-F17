
<?php
/*
    student: Wesley Nuzzo
    email: wesley_nuzzo@student.uml.edu
    class: comp.4610 GUI Programming at UMass Lowell
    date: December 13, 2017
    
    PHP script for uploading an image to the server. 
 */

/*** Functions ***/

/* Function verifyImage
 * Verify that the image prior to upload.
 */
function verifyImage($file)
{
  $target_dir = "images/";
  $target_file = $target_dir . basename($file["name"]);

  $check = getimagesize($file["tmp_name"]);

  // Verify file is actually an image
  if($check !== false)
  {
    echo "Image type: " . $check["mime"] . ".";
  }
  else
  {
    echo "Not an image.";
    return false;
  }
  echo "<br>";

  // Check if file already exists
  if (file_exists($target_file))
  {
    echo "File already exists.<br>";
    return false;
  }

  return true;
}

/* Function uploadImage
 * Upload the image to the server and record it in the list of images.
 */
function uploadImage($image)
{
  $target_dir = "images/";
  $target_file = $target_dir . basename($image["name"]);

  // upload the image
  if (move_uploaded_file($image["tmp_name"], $target_file))
  {
    // add to image list
    $listFile = fopen("images/filelist.txt", "a");
    fwrite($listFile, basename($image["name"] . "\n"));
    fclose($listFile);
    
    echo "File " . basename($image["name"]). " uploaded successfully.";
  }
  else
  {
    echo "Error uploading file.";
  }
  echo "<br>";
}


/*** Main ***/

$file = $_FILES["img_up"];
$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

if (verifyImage($file)) {
  uploadImage($file);
} else {
  echo "<p>File not uploaded.</p>";
}

echo("<p><a href='app.html'>Click here to reload the page.</a></p>");

?>