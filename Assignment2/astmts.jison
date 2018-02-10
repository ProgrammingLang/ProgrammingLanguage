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

