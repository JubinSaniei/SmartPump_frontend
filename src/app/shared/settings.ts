export class Settings {
    static getSettings(): ISettings {


        return { apiUrl: 'http://smartpump.jubinsaniei.com/api/' };
        
    }
}
export interface ISettings {
    apiUrl: string;

}
