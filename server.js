const http = require('http');
const fs = require('fs');
const path = require('path')

const EventEmitter = require('events');
const myEmitter = new EventEmitter(); 


global.DEBUG = true;


function getFile(fileName,res){
    fs.readFile(fileName,(error,content)=>{
        if(error){
            res.writeHead(500,{'Content-Type':'text/plain'})
            res.end('500 internal server error')
        }else{
            myEmitter.emit(`filereadsuccessfully`,fileName)
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content, 'utf-8')
        }
    })
}

myEmitter.on('route', (url) => {
    const date = new Date();
    console.log(`Route Event on: ${url} at ${date}`);
    console.log(__dirname);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `event on: ${url} at ${date}\n`, (error) => {
      if(error) throw error;
    });
  });


myEmitter.on('status',(statusCode)=>{
    console.log(`Http Status code: ${statusCode}`)
})


const server = http.createServer((req,res)=>{
    if(DEBUG) console.log('URL:',req.url);
    let path = './views/'
    switch(req.url){
        case '/':
            path += 'index.html'
            console.log("this is the index")
            getFile(path,res)
            myEmitter.emit('route',path)
            myEmitter.emit('status',200)
            myEmitter.on(`filereadsuccessfully`,(path)=>{
                console.log(`file reads successfully ${path}`)
            })
        break;
        case '/about':
            path += 'about.html'
            console.log("this is the about")
            getFile(path,res)
            myEmitter.emit('route',path)
            myEmitter.emit('status',200)
            myEmitter.on(`filereadsuccessfully`,(path)=>{
                console.log(`file reads successfully ${path}`)
            })
        break;
        case '/aboutme':
            path += 'about.html'
            console.log("this is the a Permanent Redirect")
            getFile(path,res)
            myEmitter.emit('route',path)
            myEmitter.emit('status',308)
        break;
        case '/help':
            path += 'help.html'
            console.log("this is the help")
            getFile(path,res)
            myEmitter.emit('route',path)
            myEmitter.emit('status',200)
            myEmitter.on(`filereadsuccessfully`,(path)=>{
                console.log(`file reads successfully ${path}`)
            })
        break;
        case '/order':
            path += 'order.html'
            console.log("this is the order")
            getFile(path,res)
            myEmitter.emit('route',path)
            myEmitter.emit('status',200)
            myEmitter.on(`filereadsuccessfully`,(path)=>{
                console.log(`file reads successfully ${path}`)
            })
        break;
        case '/menu':
            path += 'menu.html'
            console.log("this is the menu")
            getFile(path,res)
            myEmitter.emit('route',path)
            myEmitter.emit('status',200)
            myEmitter.on(`filereadsuccessfully`,(path)=>{
                console.log(`file reads successfully ${path}`)
            })
        break;
        case '/secret':
            path += 'secret.html'
            console.log("this is the secret")
            getFile(path,res)
            myEmitter.emit('route',path)
            myEmitter.emit('status',200)
            myEmitter.on(`filereadsuccessfully`,(path)=>{
                console.log(`file reads successfully ${path}`)
            })
        break;
        default:
            console.log("404")
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            myEmitter.emit('route',path)
            myEmitter.emit('status',404)

    }
})

server.listen(3000,()=>{
    console.log("server on port 3000")
})