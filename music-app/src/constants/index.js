import React from 'react';
import axios from 'axios';

import images from '../assets';
import HomePage from '../pages/homepage'
import Page2 from '../pages/MusicDetail';
import { type } from '@testing-library/user-event/dist/type';
import MusicDetail from '../pages/MusicDetail';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const routes = {
  HOME: {
    path: '/',
    exact: true,
    component: HomePage
  },
  MusicDetail: (slug = '') => {
    let path = `/music-detail/:slug`;

    if (slug) {
      path = `/music-detail/${slug}`
    }
    return {
      path,
      component: MusicDetail,
    }
  }

}

export const musics =
{
  _id: "0",
  musicsLink: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=wTG2PpDZAZ8SbSqeNrIUwA&e=1645280314&download=true',
  type: "audio/mpeg",
  author: "Author 1",
  title: "title 1",
  category: ["category1", "category2"],
  views: "1000"
}

export const NavBarData = [
  {
    path: routes.HOME.path,
    navBarImage: images.logo_new,
  },
  {
    path: 'google.com',
    navBarImage: images.ic_new,
  },
  {
    path: 'google.com',
    navBarItem: 'Bài Hát',
    navBarItemList: [
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Nhạc Trẻ'
      },
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Trữ Tình'
      }
    ]
  },
  {
    path: 'google.com',
    navBarItem: 'Tuyển Tập',
    navBarItemList: [
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Nhạc Trẻ'
      },
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Trữ Tình'
      }
    ]
  },
  {
    path: 'google.com',
    navBarItem: 'Video',
    navBarItemList: [
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Nhạc Trẻ'
      },
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Trữ Tình'
      }
    ]
  },
  {
    path: 'google.com',
    navBarItem: 'BXH',
    navBarItemList: [
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Nhạc Trẻ'
      },
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Trữ Tình'
      }
    ]
  },
  {
    path: 'google.com',
    navBarItem: 'Chủ đề',
    navBarItemList: [
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Nhạc Trẻ'
      },
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Trữ Tình'
      }
    ]
  },
  {
    path: 'google.com',
    navBarItem: 'Top 100',
    navBarItemList: [
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Nhạc Trẻ'
      },
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Trữ Tình'
      }
    ]
  },
  {
    path: 'google.com',
    navBarItem: '...',
    navBarItemList: [
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Nhạc Trẻ'
      },
      {
        dropDownContentLink: 'google.com',
        dropDownContent: 'Trữ Tình'
      }
    ]
  }
]





