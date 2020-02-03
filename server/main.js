Meteor.startup(function () {
    var restartFrequency = 1000 * 60 * 60 ; // 1 Hora
    setTimeout(function () {
        process.exit();
    }, restartFrequency);
});