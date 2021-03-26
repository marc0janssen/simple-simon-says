function vergelijkHumanInput () {
    if (sequence_human.length != 0) {
        for (let indexSavedHumanButton = 0; indexSavedHumanButton <= sequence_human.length - 1; indexSavedHumanButton++) {
            if (sequence_generated[indexSavedHumanButton] != sequence_human[indexSavedHumanButton]) {
                basic.showLeds(`
                    . # # # .
                    # . # . #
                    # # # # #
                    . # # # .
                    . # # # .
                    `)
                music.playMelody("D C D E C D E D ", 120)
                game.gameOver()
            } else if (sequence_generated.length == sequence_human.length && sequence_human.length - 1 == indexSavedHumanButton) {
                sequence_human = []
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                basic.pause(1000)
                repeatSequence()
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    sequence_human.push("A")
    music.playTone(330, music.beat(BeatFraction.Whole))
    vergelijkHumanInput()
})
function repeatSequence () {
    for (let nextSavedGeneratedButton of sequence_generated) {
        basic.showString("" + (nextSavedGeneratedButton))
        if (nextSavedGeneratedButton == "A") {
            music.playTone(330, music.beat(BeatFraction.Whole))
        } else if (nextSavedGeneratedButton == "B") {
            music.playTone(262, music.beat(BeatFraction.Whole))
        } else if (nextSavedGeneratedButton == "C") {
            music.playTone(440, music.beat(BeatFraction.Whole))
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
    newGeneratedButton = randint(0, 2)
    buttonArray = ["A", "B", "C"]
    sequence_generated.push(buttonArray[newGeneratedButton])
    basic.showString("" + (buttonArray[newGeneratedButton]))
    if (buttonArray[newGeneratedButton] == "A") {
        music.playTone(330, music.beat(BeatFraction.Whole))
    } else if (buttonArray[newGeneratedButton] == "B") {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (buttonArray[newGeneratedButton] == "C") {
        music.playTone(440, music.beat(BeatFraction.Whole))
    }
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(500)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    sequence_human.push("C")
    music.playTone(440, music.beat(BeatFraction.Whole))
    vergelijkHumanInput()
})
input.onButtonPressed(Button.B, function () {
    sequence_human.push("B")
    music.playTone(262, music.beat(BeatFraction.Whole))
    vergelijkHumanInput()
})
let buttonArray: string[] = []
let newGeneratedButton = 0
let sequence_human: string[] = []
let sequence_generated: string[] = []
sequence_generated = []
sequence_human = []
repeatSequence()
basic.forever(function () {
	
})
