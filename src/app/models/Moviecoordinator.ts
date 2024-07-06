import {Connection, PublicKey} from "@solana/web3.js";
import {Movie} from "@/app/models/Movie";

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export class MovieCoordinator {
    static accounts: PublicKey[] = []

    static async prefetchAccounts(connection: Connection) {
        const accounts = await connection.getProgramAccounts(
            new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
            {
                dataSlice: { offset: 2, length: 18 },
            }
        );

        accounts.sort((a, b) => {
            const lengthA = a.account.data.readUInt32LE(2);
            const lengthB = b.account.data.readUInt32LE(2);
            const dataA = a.account.data.slice(6, 6 + lengthA).toString('utf8');
            const dataB = b.account.data.slice(6, 6 + lengthB).toString('utf8');
            return dataA.localeCompare(dataB);
        });

        this.accounts = accounts.map((a) => a.pubkey);
    }

    static async fetchPage(connection: Connection,page: number,perPage: number) : Promise<Movie[]>{
        if(this.accounts.length === 0){
            await this.prefetchAccounts(connection);
        }

        const paginatedPublicKeys = this.accounts.slice((page-1)*perPage,page*perPage);

        if(paginatedPublicKeys.length === 0){
            return [];
        }

        const accounts = await connection.getMultipleAccountsInfo(paginatedPublicKeys);

        const movies = accounts.reduce((accum: Movie[], account) => {
            const movie = Movie.deserialize(account?.data);
            if (!movie) {
                return accum;
            }
            return [...accum, movie];
        }, []);

        return movies;
    }
}