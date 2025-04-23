const express = require('express'); 

const app = express(); 
const PORT = 3000; 

app.get('/', (req, res) => {
res.send('Todo List Data Modeling. '); 
}
); 

app.listen(PORT, (error) => { 
    if(!error)
    console.log(`Server is running on http://localhost:${PORT}`); 
    else 
    console.log("Error occurred, server can't start", error);
}
);