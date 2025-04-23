import express from 'express'; 

const app = express(); 

app.get('/', (req, res)=>{
    res.send('Server is ready');
})  

app.get('/api/jokes', (req, res)=>{
    const jokes = [
        {
            id: 1,
            title: 'Programmer Humor',
            content: 'Why do programmers prefer dark mode? Because the light attracts bugs.'
        },
        {
            id: 2,
            title: 'Debugging Life',
            content: 'I told my computer I needed a break, and it said "Error 404: Motivation not found."'
        },
        {
            id: 3,
            title: 'Tech Support',
            content: 'Why did the developer go broke? Because he used up all his cache.'
        },
        {
            id: 4,
            title: 'Binary Fun',
            content: 'There are 10 kinds of people in the world: those who understand binary and those who don’t.'
        },
        {
            id: 5,
            title: 'JavaScript Classic',
            content: 'Why was the JavaScript developer sad? Because he didn’t know how to “null” his feelings.'
        }
    ]; 

    res.send(jokes);
    
})

const port = process.env.PORT || 3000; 

app.listen(port, ()=>{
console.log(`Serve at http://localhost:${port}`);
    
})