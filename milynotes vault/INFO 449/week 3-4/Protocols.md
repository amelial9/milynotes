
describes an "intent to conform" for disparate types
	similar to an interface in C#/Java
use `protocol` keyword
	then declare properties and methods, no implementation
	static properties/methods are acceptable
	protocols can also require specific initializers
classes, enums, structs can all adopt protocols
	protocol members that modify a struct must be declared with "mutating"
extend the protocol using inheritance syntax


```
protocol FullyNamed {
    var fullName : String { get }
}
    
protocol RandomNumberGenerator {
    func random() -> Double
}
```


### Implementing a protocol

```
struct Person : FullyNamed {
    var fullName : String
}
    
class LinearCongruentialGenerator: 
    RandomNumberGenerator {
    
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    func random() -> Double {
      lastRandom = (lastRandom * a + c).truncatingRemainder(dividingBy: m)
      return lastRandom / m
    }
}
```