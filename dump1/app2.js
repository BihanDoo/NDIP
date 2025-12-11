app.get("/students", (req, res)=> {
    res.json(students);
});
app.get("/student/:id", (req, res)=> {
    let sid=parseInt(req.params.id);
//assigned the first student object from the students array that matches the given sid
    let tempStu=students.filter((x) => x.id == sid)[0];
    if(tempStu){
//If a matching student is foundm responds with the tempStu object as a JSON response using res.json(tempStu). Otherwise, it sends a 404 status code using res.sendStatus(404).
      res.json(tempStu);
    }
    else{
      res.sendStatus(404);     
    }    
});
