import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from '../components'
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                        
                            <h1 className="text-2xl font-bold hover:text-gray-500 cursor-pointer my-4">
                                    Publish your passions, your way
                            </h1>
                            <p className="text-2xl font-bold hover:text-gray-500 cursor-pointer my-4">
                            Create a unique and beautiful blog easily.
                            </p>
                        <Link to='/Login'>
                        <Button className='my-4'>Create your Blog</Button>
                        </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home