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
  | darcy "EOF"
    { return "Darcy yipped " + $1 + " times"; }
  ;

bingley
  : "YAP" bingley
    { $$ = 0 + $2; }
  | "YIP" barkBingley
    { $$ = 1 + $2; }
  | "YAP"
    { $$ = 0; }
  ;

barkBingley
  : "YAP" barkBingley
    { $$ = 0 + $2; }
  | "YIP" bingley
    { $$ = 1 + $2; }
  | "YIP"
    { $$ = 1; }
  ;

  darcy
    : "YIP" barkDarcy
      { $$ = 1 + $2; }
    | "YAP" darcy
      { $$ = 0 + $2; }
    ;

  barkDarcy
    : "YIP" darcy
      { $$ = 1 + $2; }
    | "YAP" barkDarcy"
      { $$ = 0 + $2; }
    | /*empty*/
      { $$ = 0; }
    ;
