"use client";

import { Center, Box, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { AppBar } from '@/app/components/AppBar'
import { MovieList } from '@/app/components/MovieList'
import { Form } from '@/app/components/Form'
import styles from '../app/styles/Home.module.css'

export default function Home() {
  return (
      <div className={styles.App}>
        <Head>
          <title>Movie Reviews</title>
        </Head>
        <AppBar />
        <Center>
          <Box>
            <Heading as="h1" size="l" color="white" ml={4} mt={8}>
              Add a review
            </Heading>
            <Form />
            <Heading as="h1" size="l" color="white" ml={4} mt={8}>
              Existing Reviews
            </Heading>
            <MovieList />
          </Box>
        </Center>
      </div>
  );
}