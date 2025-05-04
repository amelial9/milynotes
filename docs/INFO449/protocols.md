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

# Protocols

describes an "intent to conform" for disparate types  
&nbsp;&nbsp;&nbsp;&nbsp;similar to an interface in C#/Java  
use `protocol` keyword  
&nbsp;&nbsp;&nbsp;&nbsp;then declare properties and methods, no implementation  
&nbsp;&nbsp;&nbsp;&nbsp;static properties/methods are acceptable  
&nbsp;&nbsp;&nbsp;&nbsp;protocols can also require specific initializers  
classes, enums, structs can all adopt protocols  
&nbsp;&nbsp;&nbsp;&nbsp;protocol members that modify a struct must be declared with "mutating"  
extend the protocol using inheritance syntax


```
protocol FullyNamed {
    var fullName : String { get }
}
    
protocol RandomNumberGenerator {
    func random() -> Double
}
```


```
class Dice {
    let sides : Int
    let generator : RandomNumberGenerator
    init(sides: Int, generator: RandomNumberGenerator) {
      self.sides = sides
      self.generator = generator
    }
    func roll() -> Int {
      return Int(generator.random() * Double(sides)) + 1
    }
}
protocol DiceGame {
    var dice : Dice { get }
    func play()
}
protocol DiceGameDelegate {
    func gameDidStart(game: DiceGame)
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int)
    func gameDidEnd(game: DiceGame)
}
```