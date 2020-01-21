Meteor.startup(function () {
    var restartFrequency = 1000 * 10; // 1 day (1000 millsec * 60 min * 24 hour)
    setTimeout(function () {
        process.exit();
    }, restartFrequency);
});