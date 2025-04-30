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

# Object-orientated Swift


new instance
```
var aPoint = Point(x:2, y:3)
print("aPoint = \(aPoint.stringified)")
var anotherPoint = aPoint
aPoint.x = 12
print("anotherPoint = \(anotherPoint), aPoint = \(aPoint)")
```

```
class Person {
  let firstName : String
  let lastName : String
  var spouse : Person?

  init(first: String, last: String) {
      firstName = first
      lastName = last
  }
  deinit {
    print("\(firstName) is being deinitialized")
  }
}

var b = Person(first: "Brad", last: "Pitt")
var a = Person(first: "Angela", last: "Jolie")
b.spouse = angelina
a.spouse = brad
```

<br>

defining and calling methods on structs
```
 // ... still in struct Point ...
  func stringRep() -> String {
    return "(\(self.x),\(self.y))"
  }
  static func compare(left: Point, right: Point) -> Bool {
    return (left.x == right.x) && (left.y == right.y)
  }
var o = Point.ORIGIN
print(o.stringRep())
if Point.compare(left: o, right: Point.ORIGIN) {
  print("Yep, they point to the same place")
}
o.move(x: 3, y:5)
print(o.stringRep())
```

```
  init(x:Int32, y:Int32) {
    self.x = x
    self.y = y
  }
  init(x:Int32, y:Int32, name: String) {
    self.x = x
    self.y = y
    self.name = name
  }
  init(y: Int32, x: Int32) {
    self.x = x
    self.y = y
  }
  init(pt: Point, offsetX: Int32 = 0, offsetY : Int32 = 0) {
    self = pt
    self.move(x: offsetX, y:offsetY)
  }
}
```

<br>

#### Failable initializers  

Use "init?"
	Return nil if constuction should fail
	Makes the receiving reference an optional

Use "init!"
	Return unwrapped optional
	Makes the receiving reference an 


<br>

An example class:
```
struct Item {
    var price: Int
    var count: Int
}
class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 0
    func dispenseSnack(snack: String) {
        print("Dispensing \(snack)")
    }
	enum VendingMachineError: Error {
	    case InvalidSelection(desired: String)
	    case InsufficientFunds(coinsNeeded: Int)
	    case OutOfStock
	}
	
	// declare throws
	func vend(itemNamed name: String) throws -> String {
		guard var item = inventory[name] else {
            throw VendingMachineError.InvalidSelection(desired: name)
        }
        
        guard item.count > 0 else {
            throw VendingMachineError.OutOfStock
        }
        
        guard item.price <= coinsDeposited else {
            throw VendingMachineError.InsufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }
        
        coinsDeposited -= item.price
        item.count -= 1
        inventory[name] = item
        dispenseSnack(snack: name)
        return name
    }
}
```

<br>

catch exceptions
```
let vm = VendingMachine()
do {
    vm.coinsDeposited = 12
    try vm.vend(itemNamed: "Diet Coke")
}
catch VendingMachineError.OutOfStock {
    print("I don't have any of that")
}
catch VendingMachineError.InsufficientFunds(let coinsReq) {
    print("You need more money: \(coinsReq), to be precise")
}
catch VendingMachineError.InvalidSelection(let desired) 
    where desired == "Diet Coke" {
    print("Sorry, we're a Pepsi place")
}
catch VendingMachineError.InvalidSelection(_) {
    print("We don't carry that")
}
catch {
    print("We really have no idea what went wrong")
}
```