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
  : darcy "EOF"
  | bingley "EOF"
  ;

darcy
  : "YIP" barkDarcy
  | "YAP" darcy
  ;

barkDarcy
  : "YIP" darcy
  | "YAP" barkDarcy
  | /*empty*/
  ;

bingley
  : barkBingley
  | bingley "YIP" barkBingley "YIP" 
  ;

barkBingley
  : barkBingley "YAP"
  | /*empty*/
  ;
