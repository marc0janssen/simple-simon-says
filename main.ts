input.onButtonPressed(Button.A, function () {
    sequence_human.push("A")
    music.playTone(330, music.beat(BeatFraction.Whole))
    compareHumanInput()
})
function repeatSequence () {
    for (let nextSavedGeneratedButton of sequence_generated) {
        if (nextSavedGeneratedButton == "A") {
            music.playTone(330, music.beat(BeatFraction.Whole))
        } else if (nextSavedGeneratedButton == "B") {
            music.playTone(262, music.beat(BeatFraction.Whole))
        } else if (nextSavedGeneratedButton == "C") {
            music.playTone(440, music.beat(BeatFraction.Whole))
        } else if (nextSavedGeneratedButton == "D") {
            music.playTone(165, music.beat(BeatFraction.Whole))
        }
        basic.showString("" + (nextSavedGeneratedButton))
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(500)
    }
    newGeneratedButton = randint(0, 3)
    buttonArray = ["A", "B", "C", "D"]
    sequence_generated.push(buttonArray[newGeneratedButton])
    basic.showString("" + (buttonArray[newGeneratedButton]))
    if (buttonArray[newGeneratedButton] == "A") {
        music.playTone(330, music.beat(BeatFraction.Whole))
    } else if (buttonArray[newGeneratedButton] == "B") {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (buttonArray[newGeneratedButton] == "C") {
        music.playTone(440, music.beat(BeatFraction.Whole))
    } else if (buttonArray[newGeneratedButton] == "D") {
        music.playTone(165, music.beat(BeatFraction.Whole))
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
    compareHumanInput()
})
input.onButtonPressed(Button.AB, function () {
    sequence_human.push("D")
    music.playTone(165, music.beat(BeatFraction.Whole))
    compareHumanInput()
})
function gameOver () {
    basic.showLeds(`
        . # # # .
        # . # . #
        # # # # #
        . # # # .
        . # # # .
        `)
    music.playMelody("D C D E C D E D ", 120)
    game.gameOver()
}
function compareHumanInput () {
    isTimerActive = false
    if (sequence_human.length != 0) {
        for (let indexSavedHumanButton = 0; indexSavedHumanButton <= sequence_human.length - 1; indexSavedHumanButton++) {
            if (sequence_generated[indexSavedHumanButton] != sequence_human[indexSavedHumanButton]) {
                gameOver()
            } else if (sequence_generated.length == sequence_human.length && sequence_human.length - 1 == indexSavedHumanButton) {
                sequence_human = []
                basic.showLeds(`
                    . . . . #
                    . . . # #
                    # . # # .
                    # # # . .
                    . # . . .
                    `)
                basic.pause(500)
                if (sequence_generated.length % 4 == 0) {
                    game.addScore(sequence_generated.length / 4 * 10)
                } else {
                    game.addScore(1)
                }
                basic.pause(500)
                repeatSequence()
            }
        }
    }
    baseTimer = input.runningTime()
    isTimerActive = true
}
input.onButtonPressed(Button.B, function () {
    sequence_human.push("B")
    music.playTone(262, music.beat(BeatFraction.Whole))
    compareHumanInput()
})
let buttonArray: string[] = []
let newGeneratedButton = 0
let baseTimer = 0
let isTimerActive = false
let sequence_human: string[] = []
let sequence_generated: string[] = []
basic.showString("Start")
sequence_generated = []
sequence_human = []
let timerLimit = 5000
isTimerActive = false
repeatSequence()
isTimerActive = true
baseTimer = input.runningTime()
basic.forever(function () {
    if (isTimerActive && input.runningTime() - baseTimer > timerLimit) {
        gameOver()
    }
})
