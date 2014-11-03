/**
 * Created by Pluto on 2/12/14.
 */

/**
 * Module dependencies.
 */

var express = require('express');
var httpProxy = require('http-proxy');


var fs = require('fs');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var users = [
    { id: 1, username: 'bob', password: 'bob', email: 'bob@example.com' },
    { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new localStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));



var app = express();
var proxy = httpProxy.createProxyServer({});


function apiProxy() {
    return function(req, res, next) {
        if(req.url.match(/^\/api\//)) {
            console.log('Proxying...');
            proxy.web(req, res, {target: 'http://192.168.1.84:8080'});
            /*if(req.isAuthenticated() || req.url.match(/^\/api\/config\//)){
                proxy.web(req, res, {target: 'http://localhost:9000'});
            }
            else{
                //todo tobe deleted;
                //just for test
                if(req.url.match(/^\/api\/pages\/2\/p1230.json/)){
                    proxy.web(req, res, {target: 'http://localhost:9000'});
                }else{
                    res.send(401);
                }
            }*/
        } else {
            next();
        }
    }
}



app.configure(function() {
    app.set('port', process.env.PORT || 10000);
    //app.set('views', 'app/views');
    //app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    //app.use(express.bodyParser());//not supported by connect 3.0
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.compress());//Compress response data with gzip / deflate
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(flash());
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    //app.use(passport.initialize());
    //app.use(passport.session());
    //app.use(express.favicon()); // favicon will be set dynamicly in the index page by js
    //app.use(express.json());
    //app.use(express.urlencoded());
    //app.use(express.multipart()); //for file upload
    //app.use(express.methodOverride());
    app.use(apiProxy());
    app.use(app.router);
    app.use(express.static('app'));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


/*app.get('/', function(req, res){
    res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
    res.render('login', { user: req.user, message: req.flash('error') });
});*/

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login

//todo to be deleted
app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        res.json({ id: req.user.id, username: req.user.username });
    });


// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
 app.post('/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
 if (err) { return next(err) }
 if (!user) {
 req.flash('error', info.message);
 return res.redirect('/login')
 }
 req.logIn(user, function(err) {
 if (err) { return next(err); }
 return res.redirect('/users/' + user.username);
 });
 })(req, res, next);
 });
 */

app.get('/logout', function(req, res){
    req.logout();
    res.send(200);
});

//appcache does not work
app.get('/offline.appcache', function(req, res){
    fs.readFile("offline.appcache", function(error, content){
        if(error){
            res.end();
        }else{
            res.header("Content-Type", "text/cache-manifest");
            res.end(content, "CACHE MANIFEST");
        }
    });

});




http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    next();
}
