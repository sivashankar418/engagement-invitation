/* =====================================================
   ENGAGEMENT INVITATION
   NAVEEN & SHINDHU
===================================================== */


/* =====================================================
   BASIC DETAILS
===================================================== */

const invitationDetails = {

    bride: "Naveen",

    groom: "Shindhu",

    date: "2026-10-28",

    time: "10:00:00",

    venue: "Home",

    location: "Chennur",

    whatsapp: "917075344066"

};


/* =====================================================
   OPEN INVITATION
===================================================== */

const openingScreen =
    document.getElementById("openingScreen");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


openInvitation.addEventListener("click", () => {

    openingScreen.classList.add("hidden");

    /*
        Browser allows music only after
        user interaction.
    */

    music.play()
        .then(() => {

            musicButton.innerHTML = "♫";

        })
        .catch(() => {

            musicButton.innerHTML = "♪";

        });

});


/* =====================================================
   MUSIC CONTROL
===================================================== */

musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play()
            .then(() => {

                musicButton.innerHTML = "♫";

            })
            .catch(() => {

                alert(
                    "Please add your music file at assets/music.mp3"
                );

            });

    } else {

        music.pause();

        musicButton.innerHTML = "♪";

    }

});


/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    const targetDate = new Date(
        `${invitationDetails.date}T${invitationDetails.time}`
    ).getTime();

    const now = new Date().getTime();

    const difference = targetDate - now;


    if (difference <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   FALLING PETALS
===================================================== */

const petalsContainer =
    document.getElementById("petalsContainer");


function createPetal() {

    const petal =
        document.createElement("div");

    petal.classList.add("petal");

    petal.innerHTML = "❀";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.fontSize =
        (10 + Math.random() * 15) + "px";

    petal.style.animationDuration =
        (5 + Math.random() * 6) + "s";

    petal.style.opacity =
        0.3 + Math.random() * 0.6;

    petalsContainer.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 12000);

}


setInterval(createPetal, 500);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section, .event-card, .person-card, .family-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    revealObserver.observe(element);

});


/* =====================================================
   WHATSAPP RSVP
===================================================== */

function sendWhatsApp() {

    const message =
        `Hello! I would like to confirm my presence for the engagement of ${invitationDetails.bride} & ${invitationDetails.groom} on 28 October 2026. ❤️`;

    const url =
        `https://wa.me/${invitationDetails.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


/* =====================================================
   ADD TO CALENDAR
===================================================== */

function downloadCalendar() {

    const startDate = "20261028T100000";

    /*
        Assuming approximately 2 hours
        for the engagement ceremony.
    */

    const endDate = "20261028T120000";


    const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Naveen & Shindhu//Engagement Invitation//EN
BEGIN:VEVENT
UID:naveen-shindhu-engagement-2026@example.com
DTSTAMP:20260101T000000Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:Naveen & Shindhu Engagement
LOCATION:Home, Chennur
DESCRIPTION:Engagement ceremony of Naveen & Shindhu.
END:VEVENT
END:VCALENDAR`;


    const blob =
        new Blob(
            [calendarContent],
            {
                type: "text/calendar"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "Naveen-Shindhu-Engagement.ics";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const closeModal =
    document.getElementById("closeModal");


galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        if (!image.src) return;

        modalImage.src = image.src;

        imageModal.classList.add("show");

    });

});


closeModal.addEventListener("click", () => {

    imageModal.classList.remove("show");

});


imageModal.addEventListener("click", (event) => {

    if (event.target === imageModal) {

        imageModal.classList.remove("show");

    }

});


/* =====================================================
   ESCAPE KEY FOR MODAL
===================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        imageModal.classList.remove("show");

    }

});


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "💍 Naveen & Shindhu Engagement Invitation Loaded ❤️"
);