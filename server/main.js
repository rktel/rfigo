Meteor.startup(function () {
    var restartFrequency = 1000 * 1 * 20 ; // 1 Hora
    setTimeout(function () {
        process.exit();
    }, restartFrequency);
});