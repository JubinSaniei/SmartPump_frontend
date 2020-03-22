export class Settings {
    static getSettings(): ISettings {

        //  return { apiUrl: 'http://localhost:9002/api/' };
        return { apiUrl: 'http://smartpump.jubinsaniei.com/api/' };

    }
}
export interface ISettings {
    apiUrl: string;

}
