import path from "path"
import ejs from "ejs"
import fs from "fs-extra"

//Import json file
const Github = require("./../Portfolio/github.json")
const Dataset = require("./../Portfolio/dataset.json")

//Create Temp directory for Static-Web-Page Generation
if(fs.existsSync(path.join(__dirname, "./../workTemp"))){
    fs.rmdirSync(path.join(__dirname, "./../workTemp"), { recursive: true })
}
fs.mkdirSync(path.join(__dirname, "./../workTemp"))

const Data:ejs.Data = {
    Data:{
        ID:Github.githubID,
        Title:Dataset.Title,
        Slogan:Dataset.Slogan,
        Greetings:Dataset.Greetings,
        Avatar:Dataset.Avatar,
        Favicon:Dataset.Favicon,
        Stacks:Dataset.Stacks,
        URL:Dataset.URL,
        Projects:{
            All:Dataset.Projects as Array<any>,
            Large:(Dataset.Projects as Array<any>).filter(it => it.Type == "Large"),
            Small:(Dataset.Projects as Array<any>).filter(it => it.Type == "Small"),
            Contributed:(Dataset.Projects as Array<any>).filter(it => it.Type == "Contributed")
        }
    }
}

const TemplatePath = path.join(__dirname, `./../templates/${process.argv.length == 2 ? "Default" : process.argv[2]}`)
ejs.renderFile(path.join(TemplatePath, "./index.ejs"), Data).then((RenderedHtml) => {
    fs.appendFileSync(path.join(__dirname, "./../workTemp/index.html"), RenderedHtml)
    fs.copy(path.join(__dirname, "./../UserAssets"), path.join(__dirname, "./../workTemp/UserAssets"))
    fs.copy(path.join(TemplatePath, "./assets"), path.join(__dirname, "./../workTemp/assets"))
})