const assert = require('assert')

describe('Application Service', function() {
    const applicationService = require('../lib/applicationService.js')
    
    it('Checks if application service is correctly initialized != undefined', function () {
        assert.ok(applicationService)
    })

    it('Checks if getInfo returns expected JSON', function () {
        assert.deepEqual(applicationService.getInfo(), {
            name: "App",
            author: "Igor",
            version: "1.0.0",
        })
    })
})






