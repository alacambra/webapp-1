(function () {
    'use strict';

    describe('directive', function () {
        it('bce', function () {

            browser.get("http://127.0.0.1:9000").then(function () {
                
                var loginLink = element(by.id("login")),
                    createButton = element(by.id("create"));
                    
                loginLink.click().then(function () {
                    expect(loginLink.getText()).toBe("Logout")
                })
                
                createButton.click().then(function() {
                    browser.wait(function() { return true }, 1000).then(function() {
                        
                        var newTaskButton = element(by.id("newTaskButton"));
                        
                        newTaskButton.click().then(function() {
                            expect(element.all(by.css(".bce")).count()).toBe(1);
                        })
                        
                    })
                })
                
                
                
            })

        });

    });

}());