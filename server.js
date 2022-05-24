//load express
const express = require('express')

//import the Controller
const getData = require('./Controllers/getData')

//call getData
const productsData = getData()

//crreate an instance of expess
const app =express()
const PORT = 3000

//Middleware functions
//They update the request as soon as they coe in.

app.use((req, res, next) => {
    console.log('Running the middleware function!')
    next() //Go to the next middleware or the response.
})

//JSON Middleware
app.use(express.json())

//if we don't need to read data from the url
app.use(express.urlencoded({extended: false}))

//Set up view engine
app.set('view engine', 'ejs')
app.set('views', './Views')

//Root route
app.get('/', (req, res) => {
    res.render('home')
})

//get products route
app.get('/products', (req, res) => {
    res.render('products', {data: productsData})
})

app.get('/products/new', (req, res) => {
    res.render('new-products')
})
app.post('/products',(req, res) => {
    console.log(req.body)

productsData.push(req.body)
res.redirect('/products')

})


app.get('/product/:id',(req,res) => {
    // res.render(products[req.params.id])
    console.log(req.params.id);
    const result = products.filter(item => item.id === Number(req.params.id)) 
    console.log(result)
res.render('idPage',{product: result[0]})

})



app.listen(PORT, () => {
    console.log('Server is running...')
})