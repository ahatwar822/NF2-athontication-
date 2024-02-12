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

app.get('/index',(req,res) => {
    res.render('index')
})
app.post('/', async (req,res) => {
    try{
        // const {uname, pass} = req.body;
        const checkuser = await Student.findOne({uname:req.body.uname})
        if(checkuser){
            const checkpass = await phash.compare(req.body.pass, checkuser.pass)
            if(checkpass){
                res.redirect('/index')
            }
            else{res.send('Incorrect password')}
        }
        else{res.send('Username does not exist')}
        // console.log(uname, pass);
    }
    catch(error){
        res.send(error)
    }
})

app.get ('/register', (req, res) => {
    res.render('register',{ message: req.query.message })
});

app.post('/register', async(req, res) => {
   

    const {uname, pass} = req.body;
    
    existingUser = await Student.findOne({uname});
    if(existingUser) {res.send('User name alredy Exits. Plase try with another name')}
    else{
    enpass = await phash.hash(pass, 10);
    newStudent = new Student({
        uname: uname,
        pass: enpass
    });
    console.log(uname, enpass)
    Studentsave = await newStudent.save();
    res.redirect('/register?message=Registered+Successfuly');}
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})