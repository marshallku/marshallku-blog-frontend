import { lstatSync, readdirSync } from "fs";
import { join } from "path";

export function walk(dir: string, cb: (path: string) => void) {
    const files = readdirSync(dir);

    for (let i = 0, max = files.length; i < max; ++i) {
        const file = join(dir, files[i]);
        const stat = lstatSync(file);

        if (stat.isDirectory()) {
            walk(file, cb);
        } else {
            cb(file);
        }
    }
}
