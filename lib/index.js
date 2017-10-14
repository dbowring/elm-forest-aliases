#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const elm_forest_1 = require("elm-forest");
const path_1 = require("path");
let main = function (cmd, args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let project = yield elm_forest_1.Forest.current(true);
            yield elm_forest_1.Forest.runCommand(project.version, cmd, args);
            process.exit(0);
        }
        catch (err) {
            if (err instanceof elm_forest_1.Forest.ForestError) {
                if (err.name !== elm_forest_1.Forest.Errors.ElmCommandFailed && err.name !== elm_forest_1.Forest.Errors.CommandFailed) {
                    console.error(err.message);
                }
                process.exit(err.code);
            }
            else {
                throw err;
            }
        }
    });
};
if (require.main === module) {
    process.on('uncaughtException', (err) => {
        console.error('FOREST FATAL (uncaughtException)', err, err.stack);
        process.exit(1);
    });
    process.on('unhandledRejection', (reason, p) => {
        console.error('FOREST FATAL (unhandledRejection)', reason, p);
        process.exit(1);
    });
    let parsed = path_1.parse(process.argv[1]);
    main(parsed.base, process.argv.slice(2));
}
