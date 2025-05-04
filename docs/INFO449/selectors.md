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

# Selectors

necessary for Objective-C compatibility/use  
&nbsp;&nbsp;&nbsp;&nbsp;but also useful in their own right, to add nominative binding capabilities  
references to methods by name  
&nbsp;&nbsp;&nbsp;&nbsp;with some amount of compiler checking  
selectors can be used to invoke methods  
&nbsp;&nbsp;&nbsp;&nbsp;permitting a degree of flexibility in setup/invocation  
used extensively in Cocoa and iOS to match-by-capabilities  

<br>

#### restrictions
class must inherit from NSObject  
&nbsp;&nbsp;&nbsp;&nbsp;necessary for the Obj-C plumbing "underneath"  
members must be annotated with @objc  
&nbsp;&nbsp;&nbsp;&nbsp;optional name describes the Obj-C name  
usable on methods and property methods

<br>

#### Syntax
`#selector` obtains method at compile-time  
parameter is method with names separated by colons  
use `getter:` or `setter:` to obtain property getter/setter methods  


```
class SomeClass: NSObject {
  @objc let property: String

  @objc(doSomethingWithInt:)
  func doSomething(_ x: Int) { }

  init(property: String) { self.property = property }
}
let selectorForMethod = #selector(SomeClass.doSomething(_:))
let selectorForPropertyGetter = #selector(getter: SomeClass.property)
```