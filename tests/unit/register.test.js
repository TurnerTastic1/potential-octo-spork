
const script = require('jest');


describe('Executing tests', () => {
    test('Testing if "App" is in "Apple"', async () => {
        expect("Apple").toContain("App");
    })
})

