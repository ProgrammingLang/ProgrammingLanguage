/*
    description: Starting point for Problem 1
*/

// lexical part of the grammar
// ===========================

%lex
%%
\s+                   /* no return statement, so skip whitespace */
"yip"                   return "YIP"
"yap"                   return "YAP"
<<EOF>>               return "EOF"
.                     return "INVALID"

/lex

%start program

// phrase-structure section of the grammar.  You complete this
// ===========================================================
%%

program
  : bingley "EOF"
    { return "Bingley yipped " + $1 + " times"; }
  ;

bingley
  : "YAP" bingley
    { return $$ = 0 + $2; }
  | "YIP" barkBingley
    { return $$ = 1 + $2; }
  | "YAP"
    { return $$ = 0; }
  ;

barkBingley
  : "YAP" barkBingley
    { return $$ = 0 + $2; }
  | "YIP" bingley
    { return $$ = 1 + $2; }
  | "YIP"
    { return $$ = 1; }
  ;
