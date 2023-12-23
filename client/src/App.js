import React, { useEffect, useState } from 'react';
import ImgCopy from './img/copy-icon.png';
import axios from 'axios'
import './App.css';

function App() {
const [url, setUrl] = useState('');
const [slug, setSlug] = useState('');
const [shortUrl, setShortUrl] = useState('');
const [links, setLinks]= useState([]);

const generateLink = async ()=> {
  const response = await axios.post('/link' , {
    url,
    slug
  })

  setShortUrl(response?.data?.data?.shortURL);
}

const copyShortUrl = () => {
  navigator.clipboard.writeText(shortUrl);
  alert("copy to clipboard");
}

const loadLinks = async ()=> {
  const response = await axios.get('/api/links');

  setLinks(response?.data?.data)
}

useEffect( ()=>{
  loadLinks();
}, [])

  return (
    <div className="App">
    
<h1 className='app-title'>🔗 Quick Links</h1>

<div className='app-container'>

<div className='link-generation-card'>
  <h2>Link Generation</h2>

<input type='text'
 placeholder='URL'
  className='input'
  value={url}
  onChange={(e) => {
    setUrl(e.target.value)
  }}  />

<input type='text'
 placeholder='Slug (optional)'
  className='input'
  value={slug}
  onChange={(e) => {
    setSlug(e.target.value)
  }}  />

<input type='text'
 placeholder='Short URL'
  className='input-shortURL'
  value={shortUrl}
 disabled  />

 <img src={ImgCopy} alt='copy' className='copy-img'
 onClick={copyShortUrl}
 />

 <button type='button'
  className='shortURL-btn'
  onClick={generateLink}
  >Get ShortURL 🔗</button>

</div>

<div className='link-container'>
  <h2 className='link-heading'>All Links</h2>
  {
    links?.map( (linkObj, index) =>{
      const {url, slug, clicks} = linkObj;

      return  (
        <div className='link-card'> 
          <p>URL: {url} </p>
          <p>Short URL :{process.env.REACT_APP_BASE_URL}/ {slug}</p>
          <p>Clicks : {clicks}</p>
        </div>
      )
    })
  }
</div>

</div>

    </div>
  );
}

export default App;
