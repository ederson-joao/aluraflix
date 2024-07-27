import React, { useEffect, useState } from 'react';
import EditForm from '../editVideo/index';
import edit from '../../img/edit.png';
import delet from '../../img/delet.png';
import db from '../../db.json'; // Supondo que o arquivo db.json está na pasta src
import './index.css';

function Category() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [editing, setEditing] = useState(false); 

  useEffect(() => {
    // Substitua a chamada fetch pela importação direta do db.json
    const data = db.videos; // Ajuste se a estrutura do JSON for diferente
    setVideos(data); 
    const firstFrontendVideo = data.find(video => video.category === 'frontend');
    if (firstFrontendVideo) {
      setSelectedVideo(firstFrontendVideo);
    }
  }, []);

  const handleDelete = (id) => {
    console.log(`Deleting video with ID: ${id}`);
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);
    if (selectedVideo && selectedVideo.id === id) {
      setSelectedVideo(null);
    }
  };

  const handleEdit = (id) => {
    const videoToEdit = videos.find(video => video.id === id);
    setSelectedVideo(videoToEdit);
    setEditing(true);
  };

  const handleSaveEdit = (updatedData) => {
    const updatedVideos = videos.map(video =>
      video.id === selectedVideo.id ? { ...video, ...updatedData } : video
    );
    setVideos(updatedVideos);
    setEditing(false);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  if (editing) {
    return (
      <EditForm video={selectedVideo} onSave={handleSaveEdit} />
    );
  }

  return (
    <div className='categories'>
      {selectedVideo && (
        <div className="video-details">
          <h2>{selectedVideo.title}</h2>
          <p>{selectedVideo.description}</p>
          <iframe className='video'
            title={selectedVideo.title}
            src={selectedVideo.videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="category frontend">
        <h2>Frontend</h2>
        <div className="videos-container">
          <div className="videos">
            {videos.map(video => {
              if (video.category === 'frontend') {
                return (
                  <div key={video.id} className="video-item">
                    <img className='image-item' src={video.image} alt={video.title} onClick={() => handleVideoClick(video)} />
                    <div className="buttons">
                      <button onClick={() => handleEdit(video.id)}><img src={edit} alt="Edit" />EDITAR</button>
                      <button onClick={() => handleDelete(video.id)}><img src={delet} alt="Delete" />DELETAR</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="category backend">
        <h2>Backend</h2>
        <div className="videos-container">
          <div className="videos">
            {videos.map(video => {
              if (video.category === 'backend') {
                return (
                  <div key={video.id} className="video-item">
                    <img className='image-item' src={video.image} alt={video.title} onClick={() => handleVideoClick(video)} />
                    <div className="buttons">
                      <button onClick={() => handleEdit(video.id)}><img src={edit} alt="Edit" />EDITAR</button>
                      <button onClick={() => handleDelete(video.id)}><img src={delet} alt="Delete" />DELETAR</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="category mobile">
        <h2>Mobile</h2>
        <div className="videos-container">
          <div className="videos">
            {videos.map(video => {
              if (video.category === 'mobile') {
                return (
                  <div key={video.id} className="video-item">
                    <img className='image-item' src={video.image} alt={video.title} onClick={() => handleVideoClick(video)} />
                    <div className="buttons">
                      <button onClick={() => handleEdit(video.id)}><img src={edit} alt="Edit" />EDITAR</button>
                      <button onClick={() => handleDelete(video.id)}><img src={delet} alt="Delete" />DELETAR</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Category;
