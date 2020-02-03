Meteor.startup(function () {
    var restartFrequency = 1000 * 60 * 60 * 12 ; // 12 Horas
    setInterval(function () {
        process.exit();
    }, restartFrequency);
});