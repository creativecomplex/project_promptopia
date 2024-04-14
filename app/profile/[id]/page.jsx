"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const reponse = await fetch(`/api/users/${params?.id}/posts`);
          const data = await reponse.json();
      
          setPosts(data);
        }
    
        if(params?.id) fetchPosts();
    }, []);

  return (
    <Profile
        name={name}
        desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
        data={posts}
    />
  )
}

export default UserProfile