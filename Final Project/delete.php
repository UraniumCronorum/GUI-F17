<?php
/*
    student: Wesley Nuzzo
    email: wesley_nuzzo@student.uml.edu
    class: comp.4610 GUI Programming at UMass Lowell
    date: December 13, 2017
    
    PHP script for deleting an image from the server. 
 */

/* Function read_file_list
 * Read in the file list from a text file and convert it to an array.
 */
function read_file_list() {
  // read from file
  $listFile = fopen("images/filelist.txt", "r");
  $list = fread($listFile, filesize("images/filelist.txt"));
  fclose($listFile);

  // convert to array
  $list = explode("\n", $list);
  return $list;
}

/* Function write_file_list
 * Write the file list back to text file.
 */
function write_file_list($list) {
  // convert to string
  $list = implode("\n", $list);

  // write to file
  $listFile = fopen("images/filelist.txt", "w");
  fwrite($listFile, $list);
  fclose($listFile);
}

/* Function verifyDeletion
 * Verify that the image is present and can be deleted.
 */
function verifyDeletion($filename, $target_file)
{
  // Check if file exists
  if (!file_exists($target_file))
  {
    echo "File not found.<br>";
    return false;
  }

  // check if file in list
  $list = read_file_list();

  if(!in_array($filename, $list)) {
    echo "Not an image.<br>";
    return false;
  }
  
  return true;
}

/* Function deleteImage
 * Remove an image from the server and remove its entry from the image list.
 */
function deleteImage($filename, $target_file)
{
  // remove from list
  $list = read_file_list();
  $pivot = array_search($filename, $list);
  $left = array_slice($list, 0, $pivot);
  $right = array_slice($list, $pivot+1);
  $list = array_merge($left, $right);

  // remove file and output modified list
  unlink($target_file);
  write_file_list($list);

  echo $target_file . " deleted successfully.<br>";
}

/*** Main ***/

$target_dir = "images/";
$filename = $_POST["img_del"];
$target_file = $target_dir . $filename;

if (verifyDeletion($filename, $target_file))
{
  deleteImage($filename, $target_file);
}
else {
   echo "<br> Unable to delete.";
}

echo("<a href='app.html'>Click here to reload the page.</a>");

?>
