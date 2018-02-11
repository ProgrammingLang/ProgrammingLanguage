var selectedTest = process.argv[2];

/////////////////////// define the test suite /////////////////////////
var tests= [
//    /* 0 */ [ "1 > 2", '["(1>2)",false]' ],

/* Test # 0*/ [ "a = 14 + (2^3)^2" , '["a",78]' ],
/* Test # 1*/ [ "a = b = 14 + (2^3)^2" , '["b a",78]' ],
/* Test # 2*/ [ "a = b = c = dogs = 14 + 2^3^2" , '["dogs c b a",526]' ],
/* Test # 3*/ [ "a = b = c = dogs = ~14 + 2^3^2" , '["dogs c b a",498]' ],
/* Test # 4*/ [ "a = b = c = dogs = ~14 + 3^2^3" , '["dogs c b a",6547]' ],
/* Test # 5*/ [ "a = b = c = dogs = ~14 + ~3^2^3" , '["dogs c b a",6547]' ],
/* Test # 6*/ [ "a = b = c = dogs = ~14 + ~(3^2^3)" , '["dogs c b a",-6575]' ],
/* Test # 7*/ [ "a = b = ~0" , '["b a",0]' ],
/* Test # 8*/ [ "a = b = ~~0" , '["b a",0]' ],
/* Test # 9*/ [ "a = b = ~~~0" , '["b a",0]' ],
/* Test # 10*/ [ "a = b = 1 - 2 - 3" , '["b a",-4]' ],
/* Test # 11*/ [ "a = b = 1 - (2 - 3)" , '["b a",2]' ],
/* Test # 12*/ [ "a = b = 1 - 2 + 3" , '["b a",2]' ],
/* Test # 13*/ [ "a = b = 1 - 2 - ~3" , '["b a",2]' ],
/* Test # 14*/ [ "a = b = 10 / 3" , '["b a",3]' ],
/* Test # 15*/ [ "a = b = 10 % 3" , '["b a",1]' ],
/* Test # 16*/ [ "a = b = 100 % 30 * 2 / 6" , '["b a",3]' ],
/* Test # 17*/ [ "a = b = 10 - 2 * 3 + 11 % 3 / 2" , '["b a",5]' ],
/* Test # 18*/ [ "a = b = 10 - 2 * (3 + 11) % 3 / 2" , '["b a",10]' ],
/* Test # 19*/ [ "a = b = ~(10 - 2 * (3 + 11) % 3 / 2)" , '["b a",-10]' ],
/* Test # 20*/ [ "a = b = ~~(10 - 2 * (3 + 11) % 3 / 2)" , '["b a",10]' ],
/* Test # 21*/ [ "a = b = ~~~(10 - 2 * (3 + 11) % 3 / 2)" , '["b a",-10]' ],

/* Test # 22*/    [ "a = b = = c = dogs = 14 + 2^3^2", "Does not parse" ],
/* Test # 23*/    [ "a = b = c = dogs = 14 + dogs + 2^3^2", "Does not parse" ],
/* Test # 24*/    [ "a = (b = c) = dogs = 14 + 2^3^2", "Does not parse" ],
/* Test # 25*/    [ "a = 22 = c = dogs = 14 + 2^3^2", "Does not parse" ],
/* Test # 26*/    [ "a = c = dogs = ", "Does not parse" ]


];

///////////////////////// load the parser /////////////////////////////
process.stdout.write("\nLoading parser... ");
try {
    parser = require('./astmts');
    console.log(" done\n");
} catch (e) {
    console.log("\nError loading the parser from file astmts.js\n");
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
    console.log("Test suite for astmts.js");
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
	console.log("\t\t\t\t\tTest ", outcome === "Does not parse" ? "PASSED" : "FAILED");
//	console.log("\t\t\t\t\tTest ", outcome !== result ? "PASSED" : "FAILED");
    }
    console.log("----------------------------------------------------");
}
