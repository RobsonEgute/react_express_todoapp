const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const client = require("./db");
const TodoUsers = require("./auth");
const bcrypt = require('bcrypt');
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES

// create a todo
app.post('/new_todo', async(req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        console.log(description);
        const newTodo = await client.query('INSERT INTO todo(description) VALUES($1) RETURNING *', [description]);
        res.json(newTodo.rows);
    } catch(err) {
        console.error(err.message)
    }
});

// get all todos
app.get('/todos', async(req, res) => {
    try {
        const result = await client.query('SELECT * FROM todo');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await client.query('SELECT * FROM todo WHERE id=$1', [id]);
        res.json(result.rows);
    } catch(err) {
        console.error(err.message)
    }
})

// update a todo
app.put('/todos/:id', (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body
        console.log(id, description);
        const updateInfo = client.query('UPDATE todo SET description = $1 WHERE id = $2', [description, id])
        res.json('description changed successfully');
    }catch(err) {
        console.error(err.message);
    }
})

// delete a todo
app.delete('/todos/:id', (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = client.query('DELETE FROM todo WHERE id=$1', [id])
        return res.json('Todo was successfully deleted');
    }catch(err) {
        console.error(err.message)
    }
});




// user authentication handling

// register
app.post('/register', async(req, res) => {
    try {
        console.log(req.body)
        const {firstname, lastname, username, password} = req.body;

        //check if user already exist
        const checkUser = await TodoUsers.findOne({username: username})

        //if user exist return duplicate error
        if(checkUser) {
           return res.json({
                message: 'user already exists in database',
                success: false
            })
        } else {
            //else register user
        const hashPass = await bcrypt.hash(password, 10);
        console.log(hashPass);
        const userObj = new TodoUsers({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashPass
        });
        const saveNewUser = await userObj.save()
       return res.json({
            success: true,
            message: 'user details added to database'
        })
        }

    }catch(err) {
        console.log(err)
    }
})

// middleware
const VerifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(' ')[1];
    if(token) {
        jwt.verify(token, 'token&key', (err, decoded) => {
            if(err) {
                const response = {
                    isLoggedIn: false,
                    success: false,
                    message: "error in decoding user token"
                }
                return res.json(response);
            }

            req.user = {};
            req.user.id = decoded._id
            req.user.email = decoded.email
            next()

        })
    } else {
        const errorRes = {
            isLoggedIn: false,
            message: "User token provided invalid",
            success: false
        }
       return res.json(errorRes)
    }
}


// login handling 
app.post('/login',  async(req, res) => {
    
    try {
        const userIsLoggingIn = req.body;
        console.log(userIsLoggingIn)
        TodoUsers.findOne({
            username: userIsLoggingIn.username
        })
        .then(dbUser => {
            console.log(dbUser);
            if(!dbUser) {
                return res.json({
                    success: false,
                    isLoggedIn: false,
                    message: 'user does not exist in database'
                })
            }

            bcrypt.compare(userIsLoggingIn.password, dbUser.password)
            .then(isCorrect => {
                console.log(isCorrect);
                if(isCorrect) {
                    const payload = {
                        username: dbUser.username,
                        id: dbUser._id
                    }
                    jwt.sign(
                        payload,
                        'token&key',
                        {expiresIn: '9000s'},
                        (err, token) => {
                            console.log(token)
                            if(err) {
                                
                                return res.json({
                                    success: false,
                                    isLoggedIn: false,
                                    message: 'user authentication failed'
                                })
                            }
                            
                            return res.json({
                                success: true,
                                message: 'user authentication successful',
                                token: 'bearer ' + token
                            })
                        }
                    )

                } else {
                    
                    return res.json({
                        success: false,
                        isLoggedIn: false,
                        message: 'invalid username or password'
                    })
                }
            })
        })
        

    } catch(err) {

    }

});









app.listen(5000, () => {
    console.log('App listening on port 5000')
})