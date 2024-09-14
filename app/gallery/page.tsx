'use client';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-video.css';

import React, { useEffect, useState } from 'react';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import fjGallery from 'flickr-justified-gallery';
import blogsData from '../../data/blogs.json';
import Navbar from "@/components/NavBar/Navbar";
import Footer from '@/components/Footer';

// Type for blog data
interface Blog {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imgUrl: string;
  by: string;
}

const Gallery = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(blogsData.blogs);  // Set blogs from the JSON data
  }, []);

  useEffect(() => {
    const initializeGallery = () => {
      const galleryElements = document.querySelectorAll('.gallery');
      console.log('Gallery Elements:', galleryElements);
      if (galleryElements.length > 0) {
        fjGallery(galleryElements, {
          itemSelector: '.gallery__item',
          rowHeight: 250,
          lastRow: 'center',
          gutter: 10,
          rowHeightTolerance: 0.2,
          calculateItemsHeight: true,
        });
      } else {
        console.error('No gallery elements found.');
      }
    };

    if (blogs.length > 0) {
      const imgElements = document.querySelectorAll('.gallery__item img');
      let imagesLoaded = 0;

      imgElements.forEach((img) => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.complete) {
          imagesLoaded++;
        } else {
          imgElement.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === imgElements.length) {
              initializeGallery();
            }
          };
        }
      });

      if (imagesLoaded === imgElements.length) {
        initializeGallery();
      }
    }
  }, [blogs]);



  return (
    <div>
      <Navbar />
      <div className="gallery-container p-5 mt-10 w-[90vw] mx-auto">
        <LightGallery
          plugins={[lgZoom, lgVideo]}
          mode="lg-fade"
          pager={false}
          thumbnail={true}
          galleryId={'nature'}
          autoplayFirstVideo={false}
          elementClassNames={'gallery'}
          mobileSettings={{
            controls: false,
            showCloseIcon: false,
            download: false,
            rotate: false,
          }}
        >
          {blogs.map((blog) => (
            <a
              key={blog.id}
              className="gallery__item"
              data-src={blog.imgUrl}
              data-sub-html={`<h4>${blog.title}</h4><p>Read more at <a href='/blog/${blog.id}'>this link</a></p>`}
            >
              <img
                className="img-responsive cursor-pointer"
                src={blog.imgUrl}
                alt={blog.title}
              />
            </a>
          ))}
        </LightGallery>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
