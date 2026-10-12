/* =====================================================
   ENGAGEMENT INVITATION
   NAVEEN & SINDHURI
===================================================== */


/* =====================================================
   BASIC DETAILS
===================================================== */

const invitationDetails = {

    bride: "Naveen",

    groom: "Sindhuri",

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

const invitationSessionKey = "engagementInvitationOpened";

try {
    if (openingScreen && sessionStorage.getItem(invitationSessionKey) === "true") {
        openingScreen.classList.add("hidden");
    }
} catch (error) {
    console.warn("Could not restore the invitation page state.", error);
}

function startMusic() {
    music.play()
        .then(() => {
            musicButton.innerHTML = "♫";
        })
        .catch(() => {
            musicButton.innerHTML = "♪";
        });
}

if (openInvitation && openingScreen) {

    openInvitation.addEventListener("click", () => {

        try {
            sessionStorage.setItem(invitationSessionKey, "true");
        } catch (error) {
            console.warn("Could not save the invitation page state.", error);
        }

        openingScreen.classList.add("hidden");
        startMusic();

    });

}

const letterEnvelope =
    document.getElementById("letterEnvelope");

const tapLetterButton =
    document.getElementById("tapLetterButton");

letterEnvelope?.addEventListener("click", startMusic);
tapLetterButton?.addEventListener("click", startMusic);

startMusic();


/* =====================================================
   MUSIC CONTROL
===================================================== */

musicButton.addEventListener("click", () => {

    if (music.paused) {

        startMusic();

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

    const escapeCalendarText = (text) =>
        text
            .replace(/\\/g, "\\\\")
            .replace(/\r\n|\n|\r/g, "\\n")
            .replace(/([,;])/g, "\\$1");

    const [year, month, day] =
        invitationDetails.date.split("-").map(Number);
    const [hours, minutes, seconds] =
        invitationDetails.time.split(":").map(Number);
    const start = new Date(Date.UTC(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds || 0
    ));
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const formatCalendarDate = (date) => {
        const dateParts = [
            date.getUTCFullYear(),
            String(date.getUTCMonth() + 1).padStart(2, "0"),
            String(date.getUTCDate()).padStart(2, "0")
        ];
        const timeParts = [
            String(date.getUTCHours()).padStart(2, "0"),
            String(date.getUTCMinutes()).padStart(2, "0"),
            String(date.getUTCSeconds()).padStart(2, "0")
        ];

        return `${dateParts.join("")}T${timeParts.join("")}`;
    };
    const timestamp = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    const calendarLines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Naveen & Sindhuri//Engagement Invitation//EN",
        "BEGIN:VEVENT",
        "UID:naveen-sindhuri-engagement-2026@example.com",
        `DTSTAMP:${timestamp}`,
        `DTSTART:${formatCalendarDate(start)}`,
        `DTEND:${formatCalendarDate(end)}`,
        `SUMMARY:${escapeCalendarText("Naveen & Sindhuri Engagement")}`,
        `LOCATION:${escapeCalendarText(`${invitationDetails.venue}, ${invitationDetails.location}`)}`,
        `DESCRIPTION:${escapeCalendarText("Engagement ceremony of Naveen & Sindhuri.")}`,
        "END:VEVENT",
        "END:VCALENDAR",
        ""
    ];
    const blob = new Blob(
        [calendarLines.join("\r\n")],
        { type: "text/calendar;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Naveen-Sindhuri-Engagement.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

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

const downloadImage =
    document.getElementById("downloadImage");

const closeModal =
    document.getElementById("closeModal");


galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        if (!image.src) return;

        modalImage.src = image.src;

        const imageFileName =
            decodeURIComponent(new URL(image.src).pathname.split("/").pop() || "invitation-photo");

        downloadImage.href = image.src;
        downloadImage.download = imageFileName;

        imageModal.classList.add("show");

    });

});


closeModal.addEventListener("click", () => {

    imageModal.classList.remove("show");

});

downloadImage.addEventListener("click", async (event) => {
    if (!navigator.share || !navigator.canShare || typeof File === "undefined") {
        return;
    }

    event.preventDefault();

    const downloadFallback = () => {
        const link = document.createElement("a");
        link.href = downloadImage.href;
        link.download = downloadImage.download;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    try {
        const response = await fetch(downloadImage.href);
        if (!response.ok) {
            throw new Error(`Image download failed with status ${response.status}.`);
        }

        const imageFile = new File(
            [await response.blob()],
            downloadImage.download,
            { type: response.headers.get("content-type") || "application/octet-stream" }
        );

        if (!navigator.canShare({ files: [imageFile] })) {
            downloadFallback();
            return;
        }

        await navigator.share({
            files: [imageFile],
            title: "Engagement photo"
        });
    } catch (error) {
        if (error.name === "AbortError") {
            return;
        }

        console.warn("Could not open the image share sheet; downloading the image instead.", error);
        downloadFallback();
    }
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
    "💍 Naveen & Sindhuri Engagement Invitation Loaded ❤️"
);