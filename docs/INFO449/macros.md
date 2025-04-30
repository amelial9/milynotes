---
hide:
  - navigation
  - toc
---

<small><i>Last modified: {{ git_revision_date_localized }}</i></small>

<div class="back-button">
    <br>
    <a href="javascript:history.back()">← Back</a>
    <br>
    <br>
</div>

# Macros

_macros_: the ability to write a source-level construct

<br>

#### Two kinds of macros
_syntactic_ macros (C, C++ preprocessor)  
&nbsp;&nbsp;&nbsp;&nbsp;simple text drop-in replacement  
&nbsp;&nbsp;&nbsp;&nbsp;little to no compiler support  
&nbsp;&nbsp;&nbsp;&nbsp;potentially itself a source of bugs  

_semantic_ macros (Lisp, Scheme, etc)  
&nbsp;&nbsp;&nbsp;&nbsp;fully checked and understood by the compiler  
&nbsp;&nbsp;&nbsp;&nbsp;verified correct  
&nbsp;&nbsp;&nbsp;&nbsp;this is Swift's implementation  


<br>

#### Swift macro types
_freestanding_ macros  
&nbsp;&nbsp;&nbsp;&nbsp;`#`-prefixed  
&nbsp;&nbsp;&nbsp;&nbsp;appear anywhere in code  
&nbsp;&nbsp;&nbsp;&nbsp;almost like source-level function calls  

_attached_ macros  
&nbsp;&nbsp;&nbsp;&nbsp;`@`-prefixed  
&nbsp;&nbsp;&nbsp;&nbsp;modify a declaration they're "attached" to  
&nbsp;&nbsp;&nbsp;&nbsp;resemble other languages' "custom attributes" or "annotations"  

Freestanding macros: "#function" and "#warning"
```
func myFunction() {
    print("Currently running \(#function)")
    #warning("Something's wrong")
}
```

`#function` returns the name of the currently-scoped function  
`#warning` issues a warning during compilation  


An attached macro: "OptionSet"
```
@OptionSet<Int>
struct SundaeToppings {
    private enum Options: Int {
        case nuts
        case cherry
        case fudge
    }
}
```
This macro sets "nuts", "cherry", and "fudge" to be "bit flags" values (1, 2, 4, ...)