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

# Unit Testing

XCTestCase: base class for unit test suite  
&nbsp;&nbsp;&nbsp;&nbsp;`setUp()`: run before each individual test  
&nbsp;&nbsp;&nbsp;&nbsp;`tearDown()`: run after each individual test  
&nbsp;&nbsp;&nbsp;&nbsp;write "test" methods  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accept no parameters  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return no value  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prefixed with "test" in the name  
&nbsp;&nbsp;&nbsp;&nbsp;write "performance test" methods  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;use "self.measure { ... }" to mesaure time to execute  


XCTAssert...: assertion functions  
&nbsp;&nbsp;&nbsp;&nbsp;XCTAssert: expression yields true  
&nbsp;&nbsp;&nbsp;&nbsp;XCTAssertTrue: boolean condition is true  
&nbsp;&nbsp;&nbsp;&nbsp;XCTAssertFalse: boolean condition is false  
&nbsp;&nbsp;&nbsp;&nbsp;XCTAssertNil: expression yields Nil 
&nbsp;&nbsp;&nbsp;&nbsp;XCTAssertEqual: two expressions are equal  
&nbsp;&nbsp;&nbsp;&nbsp;XCTAssertNotEqual: two expressions are inequal  
&nbsp;&nbsp;&nbsp;&nbsp;... and a few others  
&nbsp;&nbsp;&nbsp;&nbsp;all overloaded to take a trailing "message" argument  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this message is what's displayed when the test fails