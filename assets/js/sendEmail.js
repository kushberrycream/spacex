function sendMail(contactForm) {
    emailjs.send("gmail", "template_YwPFSGX2", {
        "name": contactForm.name.value,
        "email": contactForm.email.value,
        "message": contactForm.message.value,
    })
        .then(
            function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    return false;
}