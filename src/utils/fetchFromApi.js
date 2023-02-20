import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  headers: {
    'Content-Type': 'application/json',
  }
})

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const KEY3 = 'AIzaSyA2xo2tj2jXGM09LwBNvb_mPH5OeqnOLmE';
const KEY2 ='AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo';
const KEY = 'AIzaSyBDgAT_msY0KNZds-YwEdmqvCN_WU2gW2k';
const KEY1 = 'AIzaSyCzG25b7eabfZA7yjzXd56ov82J2KeCDjA';
const KEY4 = 'AIzaSyCjHFdkk2K1jp2IsB4Vmc4XxhqADOKFgpM';
const KEY5 = 'AIzaSyCofD9oJvjtdNHufeI1FRAs2zyn25XXHfw';
const KEY6 = 'AIzaSyD-4dgsz5YpYZERbx5Q83RRe-SGDJXyeNs';
const KEY7 = 'AIzaSyCvCF_iqiDLYrwuVRYrRciNFt6k7713LLw';



// const options = {
//     params: {},
//     headers: {
//       // 'X-Key': 'AIzaSyBDgAT_msY0KNZds-YwEdmqvCN_WU2gW2k',
//       // 'X-Host': 'www.googleapis.com/youtube/v3'
//     }
// };

export const fetchFromAPI = async (url)=>{
   const {data} = await axios.get(`${BASE_URL}/${url}&key=${KEY7}`);
   return data;
}