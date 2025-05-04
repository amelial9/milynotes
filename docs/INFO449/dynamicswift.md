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

# Dynamic Swift

### Delegation

pattern used a lot within iOS  
enables a class to hand off (delegate) some of its responsibilities  
define a protocol to define the expected functionality  
hold one (or more) instances of the delegate in the class  
call to the delegate as the situation warrants/requires  

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