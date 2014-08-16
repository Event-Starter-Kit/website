module.exports.conference = {
    site: {
        baseurl: "http://localhost:5000/",
        name: "Web European Conference"
    },
    date: {
        startdate: "2015-04-01 09:00",
        enddate: "2015-04-01 19:00"
    },
    location: {
        city: "Milan",
        latitude: 45.465422,
        longitude: 9.185924,
        email: "info@webnextconf.eu",
        phone: "(518) 457-5181",
        rooms: [{
            name: "Auditorium 1",
            numberOfSeats: 200
        }, {
            name: "Auditorium 2",
            numberOfSeats: 200
        }, {
            name: "Auditorium 3",
            numberOfSeats: 200
        }, {
            name: "Auditorium 4",
            numberOfSeats: 200
        }]
    },
    social: {
        twitter: "webnextconf",
        facebook: "WebnextConf",
        googlePlus: "",
        github: "Web-European-Conference",
        vimeo: "",
        instagram: "",
    },
    registration: {
        availableSeats: 400,
        maxWaitingList: 400
    }
};
