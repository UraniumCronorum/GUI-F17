/*
    student: Wesley Nuzzo
    email: wesley_nuzzo@student.uml.edu
    class: comp.4610 GUI Programming at UMass Lowell
    date: December 13, 2017
    
    Javascript source code for the angularjs app. 
 */



var app = angular.module("app", [])
app.controller('ctrl', function($scope, $http) {

    // Load the list of images
    $http.get("images/filelist.txt").then(
	function(response) {
	    $scope.imageList = response.data.split("\n").slice(0,-1)
	})

    /* function imageTable(columns)
     * Return an array of rows where each row is an array containing
     * <column> number of image filenames.
     */
    $scope.imageTable = function(columns) {
	out = [];
	for (i=0; i<$scope.imageList.length; i+=columns)
	{
	    out.push($scope.imageList.slice(i, i+columns))
	}
	return out
    }
})
