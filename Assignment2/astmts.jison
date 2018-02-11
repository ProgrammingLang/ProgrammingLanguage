/*
    description: CS 331 - Spring 2017 - A2 - Problem 2
*/

// lexical section of the grammar
// ==============================

%lex
%%
\s+                   /* no return statement, so skip whitespace */
[0-9]+                return "NUMBER"
[a-zA-Z][a-zA-Z0-9_]* return "ID"
"~"                   return "UNARYMINUS"
"+"                   return "PLUS"
"-"                   return "MINUS"
"*"                   return "TIMES"
"/"                   return "DIV"
"%"                   return "MOD"
"^"                   return "POW"
"="                   return "EQUAL"
"("                   return "LPAREN"
")"                   return "RPAREN"
<<EOF>>               return "EOF"
.                     return "INVALID"

/lex

%start program

// phrase-structure section of the grammar.  You must complete this
// ================================================================

%%

program
  : assign "EOF"
    { return JSON.stringify($1); }
  ;

assign
  : exp
    { $$ = $1; }
  | "ID" "EQUAL" assign
    { $$ =  [$1, $3]; }
  ;

exp
  : factor
    { $$ = $1; }
  | exp "PLUS" factor
    { $$ = $1 + $3; }
  | exp "MINUS" factor
    { $$ = $1 - $3; }
  ;

factor
  : term
    { $$ = $1; }
  | factor "TIMES" term
    { $$ = $1 * $3; }
  | factor "DIV" term
    { $$ = Math.floor($1 / $3); }
  | factor "MOD" term
    { $$ = $1 % $3; }
  ;

term
  : power
    { $$ = $1; }
  | power "POW" term
    { $$ = Math.pow($1, $3); }
  ;

power
  : parenthesis
    { $$ = $1; }
  | "UNARYMINUS" power
    { $$ = -$2; }
  ;

parenthesis
  : "LPAREN" exp "RPAREN"
    { $$ = $2 ; }
  | "NUMBER"
    {$$ = Number($1); }
  ;
