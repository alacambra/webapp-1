var express = require('express'),
    fs = require("fs"),
    Mongo = require('mongodb'),
    MongoClient = Mongo.MongoClient,
    ObjectId = Mongo.ObjectID,
    app = express(),
    restBasePath = "/rest";

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.static('/public'));
    app.use(express.methodOverride());
    app.use(app.router);
});

MongoClient.connect("mongodb://localhost:27017/poolingpeople", function (err, db) {

    var CRUD = {
        create: function (collectionName, callback, object) {

            var collection = db.collection(collectionName);

            collection.insert(object, function (err, data) {

                callback(data);

            });

        },
        read: function (collectionName, callback, object) {

            var collection = db.collection(collectionName);

            collection.find(object).toArray(function (err, data) {

                callback(data, 200);

            });

        },
        update: function (collectionName, callback, object, newObject) {

            var collection = db.collection(collectionName);

            delete newObject._id;

            collection.update(object, newObject, function (err, data) {

                callback('', 200);

            });

        },
        delete: function (collectionName, callback, object) {

            var collection = db.collection(collectionName);


            collection.remove(object, function (err) {

                callback('', 200);

            });
        },
        addPool: function (collectionName, callback, object, pool) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$push": {"pools": pool}}, function (err, data) {

                callback('', 200);

            });

        },
        dropPool: function (collectionName, callback, object, pool) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$pull": {"pools": pool}}, function (err, data) {

                callback('', 200);

            });

        },
        addTask: function (collectionName, callback, object, task) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$push": {"tasks": task}}, function (err, data) {

                callback('', 200);

            });

        },
        dropTask: function (collectionName, callback, object, task) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$pull": {"tasks": task}}, function (err, data) {

                callback('', 200);

            });

        },
        addCompetence: function (collectionName, callback, object, competence) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$push": {"competences": competence}}, function (err, data) {

                callback('', 200);

            });

        },
        dropCompetence: function (collectionName, callback, object, competence) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$pull": {"competences": competence}}, function (err, data) {

                callback('', 200);

            });

        },
        addPeople: function (collectionName, callback, object, people) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$push": {"people": people}}, function (err, data) {

                callback('', 200);

            });

        },
        dropPeople: function (collectionName, callback, object, people) {


            var collection = db.collection(collectionName);

            collection.update(object, {"$pull": {"people": people}}, {multi: true}, function (err, data) {

                callback('', 200);

            });

        }


    };


    function report (req) {
        console.log(new Date() + " - " + req.connection.remoteAddress + " - " + req.route.path + " " + req.route.method.toUpperCase());
    }


    // TASK CRUD


    app.get(restBasePath + '/tasks', function (req, res) {
        report(req);
        CRUD.read("tasks", function (data) {
            res.send(data, 200);
        }, {});
    });

    app.get(restBasePath + '/tasks/:id', function (req, res) {
        report(req);
        CRUD.read("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)});
    });

    app.put(restBasePath + '/tasks', function (req, res) {
        report(req);
        CRUD.create("tasks", function (data) {
            res.send(data, 200);
        }, req.body);
    });

    app.post(restBasePath + '/tasks/:id', function (req, res) {
        report(req);
        CRUD.update("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)}, req.body || {});
    });

    app.delete(restBasePath + '/tasks/:id', function (req, res) {
        report(req);
        CRUD.delete("tasks", function (data) {
            CRUD.dropTask("tasks", function (data) {
                CRUD.dropTask("competences", function (data) {
                    CRUD.dropTask("pools", function (data) {
                        CRUD.dropTask("people", function (data) {
                            res.send(data, 200);
                        }, {}, ObjectId(req.params.id));
                    }, {}, ObjectId(req.params.id));
                }, {}, ObjectId(req.params.id));
            }, {}, ObjectId(req.params.id));
        }, {_id: ObjectId(req.params.id)});
    });



    // POOLS CRUD


    app.get(restBasePath + '/pools', function (req, res) {
        report(req);
        CRUD.read("pools", function (data) {
            res.send(data, 200);
        }, {});
    });

    app.get(restBasePath + '/pools/:id', function (req, res) {
        report(req);
        CRUD.read("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)});
    });

    app.put(restBasePath + '/pools', function (req, res) {
        report(req);
        CRUD.create("pools", function (data) {
            res.send(data, 200);
        }, req.body);
    });

    app.post(restBasePath + '/pools/:id', function (req, res) {
        report(req);
        CRUD.update("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)}, req.body || {});
    });

    app.delete(restBasePath + '/pools/:id', function (req, res) {
        report(req);
        CRUD.delete("pools", function (data) {
            CRUD.dropPool("tasks", function (data) {
                CRUD.dropPool("competences", function (data) {
                    CRUD.dropPool("pools", function (data) {
                        CRUD.dropPool("people", function (data) {
                            res.send(data, 200);
                        }, {}, ObjectId(req.params.id));
                    }, {}, ObjectId(req.params.id));
                }, {}, ObjectId(req.params.id));
            }, {}, ObjectId(req.params.id));
        }, {_id: ObjectId(req.params.id)});
    });



    // PEOPLE CRUD


    app.get(restBasePath + '/people', function (req, res) {
        report(req);
        CRUD.read("people", function (data) {
            res.send(data, 200);
        }, {});
    });

    app.get(restBasePath + '/people/:id', function (req, res) {
        report(req);
        CRUD.read("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)});
    });

    app.put(restBasePath + '/people', function (req, res) {
        report(req);
        CRUD.create("people", function (data) {
            res.send(data, 200);
        }, req.body);
    });

    app.post(restBasePath + '/people/:id', function (req, res) {
        report(req);
        CRUD.update("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)}, req.body || {});
    });

    app.delete(restBasePath + '/people/:id', function (req, res) {
        report(req);
        CRUD.delete("people", function (data) {
            CRUD.dropPeople("tasks", function (data) {
                CRUD.dropPeople("competences", function (data) {
                    CRUD.dropPeople("pools", function (data) {
                        CRUD.dropPeople("people", function (data) {
                            res.send(data, 200);
                        }, {}, ObjectId(req.params.id));
                    }, {}, ObjectId(req.params.id));
                }, {}, ObjectId(req.params.id));
            }, {}, ObjectId(req.params.id));
        }, {_id: ObjectId(req.params.id)});
    });



    // COMPETENCES CRUD


    app.get(restBasePath + '/competences', function (req, res) {
        report(req);
        CRUD.read("competences", function (data) {
            res.send(data, 200);
        }, {});
    });

    app.get(restBasePath + '/competences/:id', function (req, res) {
        report(req);
        CRUD.read("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)});
    });

    app.put(restBasePath + '/competences', function (req, res) {
        report(req);
        CRUD.create("competences", function (data) {
            res.send(data, 200);
        }, req.body);
    });

    app.post(restBasePath + '/competences/:id', function (req, res) {
        report(req);
        CRUD.update("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.id)}, req.body || {});
    });

    app.delete(restBasePath + '/competences/:id', function (req, res) {
        report(req);
        CRUD.delete("competences", function (data) {
            CRUD.dropCompetence("tasks", function (data) {
                CRUD.dropCompetence("competences", function (data) {
                    CRUD.dropCompetence("pools", function (data) {
                        CRUD.dropCompetence("people", function (data) {
                            res.send(data, 200);
                        }, {}, ObjectId(req.params.id));
                    }, {}, ObjectId(req.params.id));
                }, {}, ObjectId(req.params.id));
            }, {}, ObjectId(req.params.id));
        }, {_id: ObjectId(req.params.id)});
    });



    // USER SINGLE RESOURCES


    app.get(restBasePath + '/users/:id/tasks', function (req, res) {
        report(req);
        CRUD.read("tasks", function (data) {
            res.send(data, 200);
        }, {creator: req.params.id});
    });

    app.get(restBasePath + '/users/:id/pools', function (req, res) {
        report(req);
        CRUD.read("pools", function (data) {
            res.send(data, 200);
        }, {creator: req.params.id});
    });
    app.get(restBasePath + '/users/:id/competences', function (req, res) {
        report(req);
        CRUD.read("competences", function (data) {
            res.send(data, 200);
        }, {creator: req.params.id});
    });
    app.get(restBasePath + '/users/:id/people', function (req, res) {
        report(req);
        CRUD.read("people", function (data) {
            res.send(data, 200);
        }, {creator: req.params.id});
    });




    // TASK <- PEOPLE

    app.post(restBasePath + '/tasks/:idtask/pools/:idpool', function (req, res) {
        report(req);
        CRUD.addPool("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask)}, ObjectId(req.params.idpool));
    });

    app.delete(restBasePath + '/tasks/:idtask/pools/:idpool', function (req, res) {
        report(req);
        CRUD.dropPool("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask)}, ObjectId(req.params.idpool));
    });

    // TASK <- COMPETENCE

    app.post(restBasePath + '/tasks/:idtask/competences/:idcompetence', function (req, res) {
        report(req);
        CRUD.addCompetence("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask)}, ObjectId(req.params.idcompetence));
    });

    app.delete(restBasePath + '/tasks/:idtask/competences/:idcompetence', function (req, res) {
        report(req);
        CRUD.dropCompetence("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask)}, ObjectId(req.params.idcompetence));
    });


    // TASK <- PEOPLE

    app.post(restBasePath + '/tasks/:idtask/people/:idpeople', function (req, res) {
        report(req);
        CRUD.addPeople("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask)}, ObjectId(req.params.idpeople));
    });

    app.delete(restBasePath + '/tasks/:idtask/people/:idpeople', function (req, res) {
        report(req);
        CRUD.dropPeople("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask)}, ObjectId(req.params.idpeople));
    });


    // TASK <- TASK

    app.post(restBasePath + '/tasks/:idtask1/tasks/:idtask2', function (req, res) {
        report(req);
        CRUD.addTask("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask1)}, ObjectId(req.params.idtask2));
    });

    app.delete(restBasePath + '/tasks/:idtask1/tasks/:idtask2', function (req, res) {
        report(req);
        CRUD.dropTask("tasks", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idtask1)}, ObjectId(req.params.idtask2));
    });








    // PEOPLE <- COMPETENCE

    app.post(restBasePath + '/people/:idpeople/competences/:idcompetence', function (req, res) {
        report(req);
        CRUD.addCompetence("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpeople)}, ObjectId(req.params.idcompetence));
    });

    app.delete(restBasePath + '/competences/:idcompetence/competences/:idpeople', function (req, res) {
        report(req);
        CRUD.dropPeople("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence)}, ObjectId(req.params.idpeople));
    });

    // PEOPLE <- POOL

    app.post(restBasePath + '/people/:idpeople/pools/:idpool', function (req, res) {
        report(req);
        CRUD.addPool("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpeople)}, ObjectId(req.params.idpool));
    });

    app.delete(restBasePath + '/people/:idpeople/pools/:idpool', function (req, res) {
        report(req);
        CRUD.dropPool("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpeople)}, ObjectId(req.params.idpool));
    });


    // PEOPLE <- TASK

    app.post(restBasePath + '/people/:idpeople/tasks/:idtask', function (req, res) {
        report(req);
        CRUD.addTask("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpeople)}, ObjectId(req.params.idtask));
    });

    app.delete(restBasePath + '/people/:idpeople/tasks/:idtask', function (req, res) {
        report(req);
        CRUD.dropTask("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpeople)}, ObjectId(req.params.idtask));
    });


    // PEOPLE <- PEOPLE

    app.post(restBasePath + '/people/:idpeople1/people/:idpeople2', function (req, res) {
        report(req);
        CRUD.addPeople("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpeople1)}, ObjectId(req.params.idpeople2));
    });

    app.delete(restBasePath + '/people/:idpeople1/people/:idpeople2', function (req, res) {
        report(req);
        CRUD.dropPeople("people", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpeople1)}, ObjectId(req.params.idpeople2));
    });












    // POOL <- PEOPLE

    app.post(restBasePath + '/pools/:idpool/people/:idpeople', function (req, res) {
        report(req);
        CRUD.addPeople("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool)}, ObjectId(req.params.idpeople));
    });

    app.delete(restBasePath + '/pools/:idpool/pools/:idpeople', function (req, res) {
        report(req);
        CRUD.dropPeople("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool)}, ObjectId(req.params.idpeople));
    });

    // POOL <- COMPETENCE

    app.post(restBasePath + '/pools/:idpool/competences/:idcompetence', function (req, res) {
        report(req);
        CRUD.addCompetence("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool)}, ObjectId(req.params.idcompetence));
    });

    app.delete(restBasePath + '/pools/:idpool/competences/:idcompetence', function (req, res) {
        report(req);
        CRUD.dropCompetence("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool)}, ObjectId(req.params.idcompetence));
    });


    // POOL <- TASK

    app.post(restBasePath + '/pools/:idpool/task/:idtask', function (req, res) {
        report(req);
        CRUD.addTask("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool)}, ObjectId(req.params.idtask));
    });

    app.delete(restBasePath + '/pools/:idpool/people/:idpeople', function (req, res) {
        report(req);
        CRUD.dropPeople("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool)}, ObjectId(req.params.idpeople));
    });


    // POOL <- POOL

    app.post(restBasePath + '/pools/:idpool1/pools/:idpool2', function (req, res) {
        report(req);
        CRUD.addPool("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool1)}, ObjectId(req.params.idpool2));
    });

    app.delete(restBasePath + '/pools/:idpool1/pools/:idpool2', function (req, res) {
        report(req);
        CRUD.dropPool("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool1)}, ObjectId(req.params.idpool2));
    });








    // COMPETENCE <- PEOPLE

    app.post(restBasePath + '/competences/:idcompetence/people/:idpeople', function (req, res) {
        report(req);
        CRUD.addPeople("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence)}, ObjectId(req.params.idpeople));
    });

    app.delete(restBasePath + '/competences/:idcompetence/competences/:idpeople', function (req, res) {
        report(req);
        CRUD.dropPeople("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence)}, ObjectId(req.params.idpeople));
    });

    // COMPETENCE <- POOL

    app.post(restBasePath + '/competences/:idcompetence/pools/:idpool', function (req, res) {
        report(req);
        CRUD.addPool("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence)}, ObjectId(req.params.idpool));
    });

    app.delete(restBasePath + '/pools/:idpool/competences/:idcompetence', function (req, res) {
        report(req);
        CRUD.dropCompetence("pools", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idpool)}, ObjectId(req.params.idcompetence));
    });


    // COMPETENCE <- TASK

    app.post(restBasePath + '/competences/:idcompetence/task/:idtask', function (req, res) {
        report(req);
        CRUD.addTask("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence)}, ObjectId(req.params.idtask));
    });

    app.delete(restBasePath + '/competences/:idcompetence/people/:idpeople', function (req, res) {
        report(req);
        CRUD.dropPeople("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence)}, ObjectId(req.params.idpeople));
    });


    // COMPETENCE <- COMPETENCE

    app.post(restBasePath + '/competences/:idcompetence1/competences/:idcompetence2', function (req, res) {
        report(req);
        CRUD.addCompetence("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence1)}, ObjectId(req.params.idcompetence2));
    });

    app.delete(restBasePath + '/competences/:idcompetence1/competences/:idcompetence2', function (req, res) {
        report(req);
        CRUD.dropCompetence("competences", function (data) {
            res.send(data, 200);
        }, {_id: ObjectId(req.params.idcompetence1)}, ObjectId(req.params.idcompetence2));
    });


















    app.get("*", function (req, res) {
        res.sendfile("public" + req._parsedUrl.path);
    });

    app.listen(3000);

});