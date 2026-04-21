function obstacleHandler () {
    basic.showLeds(`
        . . # . .
        # . # . #
        . # # # .
        # . # . #
        # # . # #
        `)
    brake()
    avoidHinder()
}
function normalDrive () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    if (Math.randomBoolean()) {
        JoyCar.turn(
        FRDirection.Forward,
        LRDirection.Left,
        driveSpeed,
        randint(0, 10)
        )
    } else {
        JoyCar.turn(
        FRDirection.Forward,
        LRDirection.Right,
        driveSpeed,
        randint(0, 10)
        )
    }
}
function playGlassbilen () {
    music.playMelody("C E G E C - C E ", 200)
    music.playMelody("G E C - E F - F ", 200)
    music.playMelody("D - D C - - - - ", 200)
}
function ultrasonicHandler () {
    basic.showLeds(`
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        # # # # #
        `)
    brake()
    avoidHinder()
}
input.onButtonPressed(Button.A, function () {
    playGlassbilen()
})
function avoidHinder () {
    JoyCar.hazardlights(ToggleSwitch.On)
    JoyCar.turn(
    FRDirection.Reverse,
    LRDirection.Left,
    reverseSpeed,
    0
    )
    basic.pause(200)
    JoyCar.hazardlights(ToggleSwitch.Off)
}
function init () {
    JoyCar.initJoyCar(RevisionMainboard.OnepThree)
    music.setBuiltInSpeakerEnabled(false)
    pins.setAudioPin(DigitalPin.P16)
    pins.setAudioPinEnabled(true)
}
function brake () {
    JoyCar.brakelight(ToggleSwitch.On)
    JoyCar.stop(StopIntensity.Soft)
    JoyCar.brakelight(ToggleSwitch.Off)
}
function carStartStatus () {
    driveSpeed = 10
    reverseSpeed = 5
    JoyCar.light(ToggleSwitch.On)
    JoyCar.reversinglight(ToggleSwitch.Off)
}
let reverseSpeed = 0
let driveSpeed = 0
init()
carStartStatus()
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (JoyCar.obstacleavoidance(SensorLRSelection.Left) || JoyCar.obstacleavoidance(SensorLRSelection.Right)) {
        obstacleHandler()
    } else if (JoyCar.sonar() < 30) {
        ultrasonicHandler()
    } else {
        normalDrive()
    }
})
