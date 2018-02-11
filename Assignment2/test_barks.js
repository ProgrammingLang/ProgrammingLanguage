var selectedTest = process.argv[2];

/////////////////////// define the test suite /////////////////////////
var tests= [
    /* 0 */  [ "yap yap yap", 'Bingley yipped 0 times' ],
    /* 1 */  [ "yip yap yip", 'Bingley yipped 2 times' ],
    /* 2 */ [ "yip yap yip yap yip yap yip", 'Bingley yipped 4 times' ],
    /* 3 */ [ "yip yip yip yip yap yip yip yip yip yip yap yap", 'Bingley yipped 8 times' ],
    /* 4 */ [ "yip", 'Darcy yipped 1 times' ],
    /* 5 */ [ "yip yip yap yip", 'Darcy yipped 3 times' ],
    /* 6 */ [ "yap yap yap yap yip yip yip yip yap yip yap", 'Darcy yipped 5 times' ],
    /* 7 */ [ "yap yap yap yap yip yip yip yip yap yip", 'Darcy yipped 5 times' ],
    /* 8 */ [ "yap yip yap yip yipe", "Does not parse"]
];

///////////////////////// load the parser /////////////////////////////
process.stdout.write("\nLoading parser... ");
try {
    parser = require('./barks');
    console.log(" done\n");
} catch (e) {
    console.log("\nError loading the parser from file barks.js\n");
    process.exit(1);
}

///////////////////////// run the test(s) /////////////////////////////
if (selectedTest) {
    if ( (/^[0-9]+$/.test(selectedTest)) &&
	 (Number(selectedTest) < tests.length) ) {
	parseInput(selectedTest);
    } else {
	console.log("Error: Test number is invalid or out of range");
	process.exit(1);
    }
} else {
    console.log("===========================");
    console.log("Test suite for barks.js");
    console.log("===========================");
    for(var i=0; i<tests.length; i++) {
	parseInput(i);
    }
}

/////////////// helper function to perform one test //////////////////
function parseInput(testNumber) {
    var input = tests[testNumber][0];
    var outcome = tests[testNumber][1];
    var result;
    try {
	console.log("Test #",testNumber,"    Input = ", input);
	result = "" + parser.parse( input );
	console.log("result ", result);
  console.log("outcome: ", outcome);
	console.log("\t\t\t\t\tTest ", outcome ===  result ?
		    "PASSED" : "FAILED");
    } catch (e) {
	// exception is presumably due to a parsing error
	console.log(e.message);
	console.log("\t\t\t\t\tTest ", outcome === "Does not parse" ? "PASSED" : "FAILED");}
    console.log("----------------------------------------------------");
}
