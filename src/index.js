express = require('express');
path = require('path');
phash = require('bcrypt');
Student = require('./database.js');

app = express();
port = 3000;

//midelware 
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
// app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('login')
})

app.get ('/register', (req, res) => {
    res.render('register')
});

app.post('/register', async(req, res) => {
   

    const {uname, pass} = req.body;
    
    console.log(uname, pass)
    saltRounds = 10;
    encpass = phash.hash(pass, saltRounds);
    console.log(encpass)
    newstudent = new Student({uname, encpass});
    Studentsave = await newstudent.save();
    res.redirect('/register')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})