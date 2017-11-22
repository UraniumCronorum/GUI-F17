/*
    student: Wesley Nuzzo
    email: wesley_nuzzo@student.uml.edu
    class: comp.4610 GUI Programming at UMass Lowell
    date: November 21, 2017
    
    This file contains the Javascript and JQuery code needed to implement the web app
    for assignment 5.
    This includes dynamically adjusting the form to accomodate new inputs and sizing the
    table accordingly, validating all inputs when the form is submitted, and computing
    the results to fill the table.
*/


/*** Price and MPG form inputs ***/

// Keep track of how many of each we have
price_count = 0
mpg_count = 0

/* addPrice()
 * add a price input to the div and increment price_count
 */
function addPrice()
{
    price_count += 1
    $("#prices").append(`<div id='pr${price_count}'>
Price ${price_count}:
$<input id='price_${price_count}' name='price_${price_count}' type='number' step='0.01' min='0'>
</div>`)
}

/* remPrice()
 * remove a price input from the div and decrement price_count
 */
function remPrice()
{
    if (price_count > 0)
    {
	$(`#pr${price_count}`).remove()
	price_count -= 1
    }
}

/* addMPG()
 * add an MPG input to the div and increment mpg_count
 */
function addMPG()
{
    mpg_count += 1
    $("#mpgs").append(`<div id='mpg${mpg_count}'>
MPG ${mpg_count}:
<input id='mpg_${mpg_count}' name='mpg_${mpg_count}' type='number' min='0'>
</div>`)
}

/* remPrice()
 * remove an MPG input from the div and decrement mpg_count
 */
function remMPG()
{
    if (mpg_count > 0)
    {
	$(`#mpg${mpg_count}`).remove()
	mpg_count -= 1
    }
}

/* initialize()
 * Initialize the form with 4 price and 4 mpg inputs
 */
function initialize()
{
    for (i=0; i<4; i++)
    {
	addPrice()
	addMPG()
    }
}

/*** Form Processing Functions ***/

/* formValid() --> Boolean
 * validate the form and return true iff the all inputs are valid
 */ 
function formValid()
{
    out = true
    out &= $('#months').valid()
    out &= $('#cpg').valid()

    // price and mpg inputs are dynamically created, so the validator
    // may not have been "told" they are required yet.
    for (i=1; i<=mpg_count; i++)
    {
	mpg = $(`#mpg_${i}`)
	mpg.rules('add', 'required')
	out &= mpg.valid()
    }
    for (j=1; j<=price_count; j++)
    {
	price = $(`#price_${j}`)
	price.rules('add', 'required')
	out &= price.valid()
    }
    
    return out
}

/* initializeTable(int, int)

 * Initialize the output table with the appropriate number of rows and columns.
 * This includes one row for the price headers, and one row for each mpg value.
 * Each row after the first has a column for mpg headers, 
 * and a column for each result.

 * rows: number of mpg rows
 * columns: number of price columns

 */
function initializeTable(rows, columns)
{
    table=$('table')

    // first row
    table.append("<tr id='price_headers'><td></td></tr>")
    for (j=1; j<=columns; j++)
    {
	$('#price_headers').append(`<th id='head_prc_${j}'> Price ${j} </th>`)
    }

    // rest
    for (i=1; i<=rows; i++)
    {
	table.append(`<tr id='row_${i}'><th id='head_mpg_${i}'> MPG ${i} </th></tr>`)
	for (j=1; j<=columns; j++)
	{
	    $(`#row_${i}`).append(`<td id='tab_${i}_${j}'> result ${i},${j} </td>`)
	}
    }
}

/* computeResults()
 * Read from the form, compute the per-month and per-mile results, and
 * output to the form.
 */
function computeResults()
{
    months = +$('#months').val()
    cpg = +$('#cpg').val()
    
    for (i=1; i<=mpg_count; i++)
    {
	for (j=1; j<=price_count; j++)
	{
	    mpg = +$(`#mpg_${i}`).val()
	    price = +$(`#price_${j}`).val()
	    
	    perMonth = price / months
	    perMile = cpg / mpg
	    
	    entry = $(`#tab_${i}_${j}`)
	    entry.text(`$${perMonth.toFixed(2)}/mo, $${perMile.toFixed(2)}/mi`)
	}
    }
}

/* submitForm
 * To be run when the submit button is pressed.
 * Validate the form, create the table and compute the results.
 */
function submitForm()
{
    $('table').empty()

    // only process the form if all inputs are valid
    if(formValid()){
	initializeTable(mpg_count, price_count)
	computeResults()
    }
}


/*** Main ***/

$(function(){
    // initialize the form
    initialize()

    // initialize the validator
    $('form').validate({
	rules: {
	    months: {
		required: true
	    },
	    cpg: {
		required: true
	    }
	},
    })

    // button functionality
    $("#submit").click(submitForm)
    $("#add_price").click(addPrice)
    $("#rem_price").click(remPrice)
    $("#add_mpg").click(addMPG)
    $("#rem_mpg").click(remMPG)
});
