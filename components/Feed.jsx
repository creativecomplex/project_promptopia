'use client';

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const filterPrompts = (text) => {
    const regex = new RegExp(text, 'i');
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }
  
  useEffect(() => {
    if(searchText && posts.length > 0) {
      const searchResult = filterPrompts(searchText);
      setFilteredPosts(searchResult);
    } else {
      setFilteredPosts(posts);
    }

    if(posts.length <= 0) {
      const fetchPosts = async () => {
        const reponse = await fetch('/api/prompt');
        const data = await reponse.json();
    
        setPosts(data);
        setFilteredPosts(data);
      }

      fetchPosts();
    }
  }, [searchText]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={filteredPosts}
        handleTagClick={(e) => {setSearchText(e)}}
      />
    </section>
  )
}

export default Feed