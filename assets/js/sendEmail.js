
/** standard initialization of emailjs code */

function sendMail(contactForm) {
    emailjs.send("gmail", "template_YwPFSGX2", {
        "name": contactForm.name.value,
        "email": contactForm.email.value,
        "message": contactForm.message.value,
    })
        .then(

            /** Displays success message if it sends successfully */
            function (response) {
                document.getElementById("sendmessage").style.display = "block";

            },

            /** Displays error mesaage if it does not send successfully */
            function (error) {
                console.log("FAILED", error);
                document.getElementById("errormessage").style.display = "block";
            });
    return false;
}