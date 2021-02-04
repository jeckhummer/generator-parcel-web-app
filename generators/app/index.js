"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
    async prompting() {
        this.log(
            yosay(
                `Welcome to the cool ${chalk.red(
                    "generator-parcel-web-app"
                )} generator!`
            )
        );

        const prompts = [
            {
                type: "input",
                name: "appName",
                message: "Enter application name:"
            },
            {
                type: "confirm",
                name: "semantic",
                message: "Do you want to add SemanticUI to project?",
                default: false
            }
        ];

        const props = await this.prompt(prompts);
        this.props = props;
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath("**/*"),
            this.destinationPath(this.props.appName),
            this.props
        );
    }

    install() {
        this.yarnInstall(
            ["react", "react-dom", "react-router-dom", "typescript"],
            { cwd: this.props.appName }
        );

        this.yarnInstall(
            [
                "@types/qs",
                "@types/react",
                "@types/react-dom",
                "@types/react-router-dom"
            ],
            {
                dev: true,
                cwd: this.props.appName
            }
        );

        if (this.props.semantic) {
            this.yarnInstall(["semantic-ui-css", "semantic-ui-react"], {
                cwd: this.props.appName
            });
        }
    }

    end() {
        this.spawnCommand("code", [this.props.appName]);
        this.spawnCommand("npm", ["start", "--prefix", this.props.appName]);
    }
};
