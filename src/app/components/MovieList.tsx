"use client";

import { Card } from './Card'
import { FC, useEffect, useState } from 'react'
import { Movie } from '../models/Movie'
import {useConnection} from "@solana/wallet-adapter-react";
import {publicKey} from "@solana/web3.js/src/layout";
import {PublicKey} from "@solana/web3.js";
import {MovieCoordinator} from "@/app/models/Moviecoordinator";
import { Center, Button, HStack,Spacer } from '@chakra-ui/react'

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export const MovieList: FC = () => {
    const { connection } = useConnection();
    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        MovieCoordinator.fetchPage(
            connection,
            page,
            10
        ).then((movies) => {
            setMovies(movies);
        });
    }, [connection,page]);

    return (
        <div>
            {
                movies.map((movie, i) => <Card key={i} movie={movie} /> )
            }
            <Center>
                <HStack w='full' mt={2} mb={8} ml={4} mr={4}>
                    {
                        page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>
                    }
                    <Spacer />
                    {
                        MovieCoordinator.accounts.length > page * 2 &&
                        <Button onClick={() => setPage(page + 1)}>Next</Button>
                    }
                </HStack>
            </Center>
        </div>
    )
}