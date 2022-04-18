import { FiledropStatus } from './status';
import { SetData } from 'src/app/shared/models/_basic/set-data';

export class FiledropFile extends SetData<FiledropFile> {
    name = '';
    size = 0;
    get sizeLabel() {
        const bytes = this.size;
        const kB = this.size / 1000;
        const mB = kB / 1000;
        const gB = mB / 1000;

        if (gB > 1) { return `${gB.toFixed(2)} GB`; }
        if (mB > 1) { return `${mB.toFixed(2)} MB`; }
        if (kB > 1) { return `${kB.toFixed(2)} KB`; }
        return `${this.size} B`;
    }
    status = FiledropStatus.Iddle;
    statusLabel = '';

    constructor(file: File) {
        super();
        this.name = file.name;
        this.size = file.size;
    }
}
