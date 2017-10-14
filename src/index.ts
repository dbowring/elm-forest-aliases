#!/usr/bin/env node
'use strict';

import {Forest} from 'elm-forest'
import {parse} from 'path'


let main = async function(cmd: string, args: string[]) {
    try {
        let project = await Forest.current(true);
        await Forest.runCommand(project.version, cmd, args);
        process.exit(0);
    } catch (err) {
        if (err instanceof Forest.ForestError) {
            if (err.name !== Forest.Errors.ElmCommandFailed && err.name !== Forest.Errors.CommandFailed) {
                console.error(err.message);
            }
            process.exit(err.code);
        } else {
            throw err;
        }
    }
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

    let parsed = parse(process.argv[1])
    main(parsed.base, process.argv.slice(2));
}