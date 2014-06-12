(function () {
    'use strict';
    describe("ModelsService", function () {

        beforeEach(module("frontendPrototypeApp"));

        var $controller, controllerLoader, ModelsService;

        beforeEach(inject(function ($injector) {

            $controller = $injector.get('$controller');
            ModelsService = $injector.get('ModelsService');

            controllerLoader = function () {
                return $controller('MainCtrl', {
                    '$scope': $scope
                });
            };
        }));

        it("Create collection", function () {
            var items = ModelsService.collection();
            
            expect(items.collection).toBeDefined();
            expect(items.collection).toEqual([]);
            
        });

        it("Add elements to collection", function () {
            var items = ModelsService.collection(),
                newObject = {a: 1, b: 2};
                
            items.add(newObject);
            expect(items.collection).toNotEqual([]);
            expect(items.collection[0]).toBe(newObject);
            items.add(newObject);
            expect(items.collection[1]).toBe(newObject);
            items.add(newObject).add(newObject);
            expect(items.collection[2]).toBe(newObject);
            expect(items.collection[3]).toBe(newObject);
            
        });

        it("Add unique elements to collection", function () {
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2};
                
            // ADDING MULTIPLE TIMES ELEMENT 1
               
            items.addToCollection(newObject1);
            expect(items.collection).toNotEqual([]);
            expect(items.collection[0]).toBe(newObject1);
            items.addToCollection(newObject1);
            expect(items.collection[1]).toBeUndefined();
            items.addToCollection(newObject1).addToCollection(newObject1);
            expect(items.collection[1]).toBeUndefined(newObject1);
            expect(items.collection[0]).toBe(newObject1);  
            
            // ADDING MULTIPLE TIMES ELEMENT 2
            
            items.addToCollection(newObject2);
            expect(items.collection[1]).toBe(newObject2);
            items.addToCollection(newObject2);
            expect(items.collection[1]).toBe(newObject2);
            expect(items.collection[2]).toBeUndefined();
            items.addToCollection(newObject2).addToCollection(newObject2);
            
            // ADDING BOTH ELEMENT 1 AND ELEMENT 2
            
            items.addToCollection(newObject1).addToCollection(newObject2).addToCollection(newObject2).addToCollection(newObject1);
            expect(items.collection[0]).toBe(newObject1);
            expect(items.collection[1]).toBe(newObject2);
            expect(items.collection[2]).toBeUndefined();
            
        });

        it("Add unique and not unique elements to collection", function () {
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2};
                
            items.addToCollection(newObject1);
            items.addToCollection(newObject2);
            items.add(newObject1);
            expect(items.collection[0]).toBe(newObject1);
            expect(items.collection[1]).toBe(newObject2);
            expect(items.collection[2]).toBe(newObject1);

            items = ModelsService.collection();
            items.addToCollection(newObject1).addToCollection(newObject2).add(newObject1);
            expect(items.collection[0]).toBe(newObject1);
            expect(items.collection[1]).toBe(newObject2);
            expect(items.collection[2]).toBe(newObject1);
            
        });

        it("Find objects in collection", function () {
            var items = ModelsService.collection(),
                newObject = {a: 1, b: 2},
                similarObject = {a: 1, b: 2};
                
            expect(items.indexOf(newObject)).toBe(-1);
            items.addToCollection(newObject);
            expect(items.indexOf(newObject)).toBe(0);
            expect(items.indexOf(similarObject)).toBe(-1); // WONT WORK WITH PRIMITIVES
            
        });

        it("Find similar elements in collection", function () {
            var items = ModelsService.collection(),
                newObject = {a: 1, b: 2},
                similarObject = {a: 1, b: 2};
                
            expect(items.indexOf(newObject)).toBe(-1);
            items.addToCollection(newObject);
            expect(items.find(newObject)).toNotBe(-1);
            expect(items.find(similarObject)).toNotBe(-1);
            
        });

        it("Delete elements", function () {
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2};
                
            items.add(newObject1).add(newObject2).add(newObject1);
            expect(items.indexOf(newObject1)).toNotBe(-1);
            items.remove(newObject1);
            expect(items.indexOf(newObject1)).toBe(-1);
            expect(items.indexOf(newObject2)).toBe(0);
            
        });

        it("Bring to first", function () {
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2},
                newObject3 = {a: 1, b: 2};
                
            items.add(newObject1).add(newObject2).add(newObject3);
            expect(items.indexOf(newObject2)).toBe(1);
            expect(items.indexOf(newObject3)).toBe(2);
            items.first(2);
            expect(items.indexOf(newObject2)).toBe(2);
            expect(items.indexOf(newObject3)).toBe(0);
            
        });

        it("Bring to last", function () {
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2},
                newObject3 = {a: 1, b: 2};
                
            items.add(newObject1).add(newObject2).add(newObject3);
            expect(items.indexOf(newObject1)).toBe(0);
            expect(items.indexOf(newObject3)).toBe(2);
            items.last(0);
            expect(items.indexOf(newObject1)).toBe(2);
            expect(items.indexOf(newObject3)).toBe(1);
            
        });

        it("Move", function () {
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2},
                newObject3 = {a: 1, b: 2};
                
            items.add(newObject1).add(newObject2).add(newObject3);
            expect(items.indexOf(newObject2)).toBe(1);
            expect(items.indexOf(newObject3)).toBe(2);
            items.move(1, 2);
            expect(items.indexOf(newObject2)).toBe(2);
            expect(items.indexOf(newObject3)).toBe(1);
            
        });

        it("Clear", function () {
            
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2},
                newObject3 = {a: 1, b: 2};
                
            items.add(newObject1).add(newObject2).add(newObject3);
            expect(items.indexOf(newObject1)).toBe(0);
            expect(items.indexOf(newObject2)).toBe(1);
            expect(items.indexOf(newObject3)).toBe(2);
            items.clear()
            expect(items.indexOf(newObject1)).toBe(-1);
            expect(items.indexOf(newObject2)).toBe(-1);
            expect(items.indexOf(newObject3)).toBe(-1);
            
        });

        it("Method chaining", function () {
            
            var items = ModelsService.collection(),
                newObject1 = {a: 1, b: 2},
                newObject2 = {a: 1, b: 2},
                newObject3 = {a: 1, b: 2};
                
            items.add(newObject1)
                .add(newObject2)
                .add(newObject3)
                .remove(newObject2)
                .move(0,1)
                .move(1,0)
                .first(1)
                .last(1)
                .last(1)
                .last(1)
                .first(0);
           
            expect(items.get(1)).toBe(newObject1);
            
        });

        it("Collection class applied to real collection", function () {
            
            var subsection = ModelsService.subsection({label: "123"}),
                task1 = ModelsService.task(),
                task2 = ModelsService.task();
                
            subsection.add(task1);
            subsection.add(task2);
            expect(subsection.indexOf(task1)).toBe(0);
            expect(subsection.indexOf(task2)).toBe(1);
            
            
        });

    });
}());