export class DataNode{
    name: string;
    summary: string;
    cover: string

    constructor(id: string, title: string, cover: string) {
        this.name = id;
        this.summary = title;
        this.cover = cover;
    }


}