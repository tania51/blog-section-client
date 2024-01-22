
import { useEffect, useState } from "react";

// swiper slider
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './App.css'
import { SlCalender } from "react-icons/sl";
import { CiStopwatch } from "react-icons/ci";
import { CgArrowTopRightO } from "react-icons/cg";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://blog-section-server.vercel.app/all-blog', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])

  return (
    <>
      <div className="bg-[#F4F0ED] py-20 px-10">

        {/* blog section header */}
        <div className="pb-8 z-10 blog-header">
          <div>
            <p className="text-[#5E43FF] text-lg font-semibold">News & Blogs</p>
            <span className="text-[#050213] text-5xl font-bold">Latest From Our Blog</span>
          </div>
          {/* arrow column */}
          <div></div>
        </div>

        {/* all blogs content using cards */}
        <div className="z-50 slider-content">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {
              blogs && blogs.map(aBlog => <SwiperSlide key={aBlog?._id}>
                <Card className="single-blog hover:border-t hover:boder-l hover:border-r-4 hover:border-b-4 hover:border-t-[#E2D3C8] hover:border-l-[#E2D3C8] hover:border-r-[#E2D3C8] hover:border-b-[#E2D3C8]">
                  <CardHeader shadow={false} floated={false} className="h-96">
                    <img
                      src={aBlog?.img}
                      alt={aBlog?.title}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography className="flex gap-2 items-center">
                        <span className="text-[#5E43FF]"><SlCalender /></span><span className="text-[#6B6B6B] text-lg">{aBlog?.date}</span>
                      </Typography>
                      <Typography className="flex gap-2 items-center">
                        <span className="text-[#5E43FF] text-3xl"><CiStopwatch /></span><span className="text-[#6B6B6B]">{aBlog?.time}</span>
                      </Typography>
                    </div>
                    <Typography
                    >
                      <h4 className="text-[#050213] text-3xl font-bold pt-1 pb-3">{aBlog?.title}</h4>
                      <p className="text-[#6B6B6B] text-lg">
                        {
                      aBlog?.short_description
                      }</p>
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      ripple={false}
                      fullWidth={true}
                      className="shadow-none text-left bg-transparent hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex gap-6 items-center"
                    >
                      <span className="text-lg text-[#000] font-semibold">{aBlog?.read_button}</span>
                      <span className="text-[#5E43FF] text-4xl"><CgArrowTopRightO /></span>
                    </Button>
                  </CardFooter>
                </Card>
              </SwiperSlide>)
            }
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default App
