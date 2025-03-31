class ApplicationService {

    getInfo()
    {
        return {
            name: "App",
            author: "Igor",
            version: "1.0.0",
        }
    }

}

module.exports = new ApplicationService()