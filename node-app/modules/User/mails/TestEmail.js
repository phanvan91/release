const {
    Mailer
} = require("../../../common/mail");

exports.TestEmail = async (data) => {
    await Mailer.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: "nicecollab.team@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    }, (err, info) => {
        if (err) {
            _log.error(err);
        } else {
            _log.info('Message sent: ' + info.response);
        }
    });
}