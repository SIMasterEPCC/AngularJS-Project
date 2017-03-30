var express     = require('express');  
var app         = express();  
var mongoose     = require('mongoose');

mongoose.connect('mongodb://localhost:27017/medidas');

app.configure(function() {  
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev')); 
    app.use(express.bodyParser());
    app.use(express.methodOverride());                  
});



var Medida = mongoose.model('Medida', {  
    Dispositivo: String,
    Temperatura: String,
    Humedad: String,
    Fecha: String
});



app.get('/api/medidas', function(req, res) {  
    Medida.find(function(err, medidas) {
        if(err) {
            res.send(err);
        }
        res.json(medidas);
    });

});

app.post('/api/medidas', function(req, res) {  
    Medida.create({
        Dispositivo: req.body.Dispositivo,
        Temperatura: req.body.Temperatura,
        Humedad: req.body.Humedad,
        Fecha: req.body.Fecha,
        done: false
    }, function(err, medida){
        if(err) {
            res.send(err);
        }

        Medida.find(function(err, medidas) {
            if(err){
                res.send(err);
            }
            res.json(medidas);
        });
    });
});

app.delete('/api/medidas/:medida', function(req, res) {  
    Medida.remove({
        _id: req.params.medida
    }, function(err, medida) {
        if(err){
            res.send(err);
        }

        Medida.find(function(err, medidas) {
            if(err){
                res.send(err);
            }
            res.json(medidas);
        });

    })
});


app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});



app.listen(8080, function() {  
    console.log('App listening on port 8080');
});