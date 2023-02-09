const progressBars = document.querySelectorAll('.skill-progress > div');
const skillSection = document.getElementById('skills');

window.addEventListener('scroll', checkScroll);

let isAnimated = new Array(progressBars.length);

function initializeBars() {
    for (let bar of progressBars) {
        bar.style.width = "0%";
    }

    for (let i = 0; i < isAnimated.length; i++) {
        isAnimated[i] = false;
    }
}

initializeBars();

function checkScroll() {
    for (let i = 0; i < progressBars.length; i++) {
        let barcoordinates = progressBars[i].getBoundingClientRect();
        if (!isAnimated[i] && barcoordinates.top <= window.innerHeight) {
            fillBars(progressBars[i]);

            isAnimated[i] = true;
        }
        else if (barcoordinates.top > window.innerHeight) {
            progressBars[i].style.width = 0 + '%';
            isAnimated[i] = false;
        }
    }
}

function fillBars(bar) {
    let currentWidth = 0;
    let targetWidth = bar.getAttribute('data-bar-width');

    var intervalID = setInterval(function (e) {
        if (currentWidth > targetWidth) {
            clearInterval(intervalID);
            return;
        }
        bar.style.width = currentWidth + "%";
        currentWidth++;
    }, 10);
}

document.getElementById('contact-form').addEventListener('submit', sendMail);

function sendMail(e) {
    e.preventDefault();

    var params = {
        name: document.getElementById("input-name").value,
        email: document.getElementById("input-email").value,
        message: document.getElementById("input-message").value,
    };
    console.log("inside email");

    const serviceID = "service_1y9c2wp";
    const templateID = "template_b1o3kzj";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("input-name").value = "";
            document.getElementById("input-email").value = "";
            document.getElementById("input-message").value = "";
            alert("Your message sent successfully!!")
        })
        .catch(
            function (err) {
                console.log('err: ', err);
                alert("Unable to send email");
            });
}
