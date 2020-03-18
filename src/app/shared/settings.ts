export class Settings {
    static getSettings(): ISettings {


        return { apiUrl: 'http://localhost:9002/api/' };
    }
}
export interface ISettings {
    apiUrl: string;

}
