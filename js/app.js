
var config = {
    apiKey: "AIzaSyBuddga2i4I97hq18krbZ5EhTehY_EBy1Q",
    authDomain: "usable-post.firebaseapp.com",
    databaseURL: "https://usable-post.firebaseio.com",
    storageBucket: "usable-post.appspot.com"
};

firebase.initializeApp(config);

var db = {
    jobs: firebase.database().ref('jobs'),
}
// Components

var postList = {
    template: '#postList',
    data: function() {
        return {
            jobs: [],
        };
    },
    watch: {
        '$route': 'fetchData'
    },
    created: function() {
        this.fetchData()
    },
    methods: {
        fetchData: function() {
            var self = this;

            db.jobs.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  var jobs = childSnapshot.val();
                  self.jobs.push(jobs);
                });
            });
        }
    }
}


var newJob = {
    template: '#addJob',
    data: function() {
        return {
            jobs: {}
        }
    },
    methods: {
        save: function() {
            var today = getCurrentDate();
            this.jobs.slug = generateUUID();
            this.jobs.slugifiedTitle = slugify(this.jobs.title);
            this.jobs.slugifiedCompanyName = slugify(this.jobs.companyName);
            var four = randomFour();

            db.jobs.child(this.jobs.slug).set({
                title: this.jobs.title,
                location: this.jobs.location,
                type: this.jobs.type,
                description: this.jobs.description,
                salary: this.jobs.salary,
                applicationMethod: this.jobs.applicationMethod,
                companyName: this.jobs.companyName,
                companyWebsite: this.jobs.companyWebsite,
                adminContactName: this.jobs.adminContactName,
                adminContactEmail: this.jobs.adminContactEmail,
                approved: false,
                key: this.jobs.slug,
                slug: four + "-" + this.jobs.slugifiedTitle + "-" + this.jobs.slugifiedCompanyName,
                timestamp: today
            });
            this.$router.push('/');
        }
    }
};

var viewJob = {
    template: '#singleJob',
    data: function() {
        return {
            jobs: []
        };
    },
    watch: {
        '$route': 'fetchData'
    },
    created: function() {
        this.fetchData()
    },
    methods: {
        fetchData: function() {
            var self = this;

            db.jobs.child(this.$route.params.slug).once('value', function(jobs) {
                if (jobs.val() === null) {
                    router.push('/404');
                } else {
                    self.jobs = jobs.val();
                }
            });
        }
    }
}

var notFound = {
    template: '#NotFound'
};

// Routes
var router = new VueRouter({
    routes: [
        { name: 'home', path: '/', component: postList },
        { name: 'newJob', path: '/add-job', component: newJob },
        { name: 'viewJob', path: '/posts/:slug', component: viewJob },
        { name: '404', path: '/404', component: notFound }
    ]
});

var app = new Vue({ router: router }).$mount('#app');

// functions

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = dd+'/'+mm+'/'+yyyy;

    return today;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function randomFour() {
    var rndFour = Math.floor(1000 + Math.random() * 9000);
    return rndFour;
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
