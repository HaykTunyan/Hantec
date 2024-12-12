import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";

import "../../styles/slider.scss"; // Importing the SCSS file
// Import Swiper modules
import {Mousewheel, Navigation, Pagination, Scrollbar} from "swiper/modules";

// Import Swiper Data Json.
import {DashboardSpeedFeed} from "@/json";
import {IFBInfo} from "@/containers/dashboard/socialFeed";
import {formatDate} from "@/hooks/formatDate";

interface ISliderFeed {
    FBInfo: IFBInfo;
}

const SliderFeed = ({FBInfo}: ISliderFeed) => {
    /**
     * Social Feed Hooks.
     */

    const [feedData, setFeedData] = useState<any | null>(null);

    const swiper = useSwiper();

    if (swiper || feedData) {
    }

    useEffect(() => {
        setFeedData(DashboardSpeedFeed);
    }, []);

    return (
        <Swiper
            modules={[Navigation, Pagination, Mousewheel, Scrollbar]}
            spaceBetween={8}
            slidesPerView={1}
            mousewheel={true}
            cssMode={true}
            navigation
            className="slider-dashboard"
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                976: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
            }}
        >
            {FBInfo.posts.map((item, index) => {
                return <SwiperSlide className="slider-container" key={index}>
                    <div className="flex flex-col">
                        <div className="bg-black text-white p-8 pb-[44px] h-[317px] rounded-t-lg flex-grow flex flex-col justify-between">
                            <div className="flex flex-col">
                                <div className="flex flex-shrink-0">
                                    <Image
                                        src="/icons/Facebook-light.svg"
                                        alt="Facebook-Light"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="flex flex-col pt-2">
                                    <p className="text-xs leading-[14.4px] text-white80 opacity-70 tracking-[0.24px] min-h-8 line-clamp-[7]">
                                        {item.message}
                                    </p>
                                    <div className="pt-2"/>
                                    <Link
                                        href={item.permalink_url}
                                        target={"_blank"}
                                        className="text-12_14 flex flex-row gap-1.5"
                                    >
                                       <span className="text-xs font-normal text-white opacity-60">
                                         Know more
                                       </span>
                                        <Image
                                            src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                                            alt="Arrow-Up-Right-White-16x16"
                                            width={16}
                                            height={16}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center flex-row gap-2">
                                <div className="">
                                    <img
                                        src={FBInfo.picture}
                                        alt="Avatar-Official"
                                        className={"w-9 h-9 object-contain rounded-[200px] border border-grey-profile"}
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <p
                                        className="font-normal text-sidebar "
                                        style={{lineHeight: "16px"}}
                                    >
                                        {FBInfo.name}
                                    </p>
                                    <p className="text-grey-seccondary text-11">{formatDate(item.created_time)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="group rounded-b-lg w-full h-[146px] cursor-pointer">
                            <div className="w-full h-36 relative rounded-b-lg overflow-hidden">
                                <img
                                    src={item.full_picture}
                                    className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                                    alt="Avatar-Official"
                                />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>;
            })}

            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                    <Image
                      src="/icons/Youtube-ligth.svg"
                      alt="Youtube-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                  <Image
                  src="/images/speed-youtube.png"
                  alt="Speed-Youtube"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                <Image
                      src="/icons/Linkedin-light.svg"
                      alt="Linkedin-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                <Image
                  src="/images/speed-linkedin.png"
                  alt="Speed-Linkedin"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                <Image
                      src="/icons/Facebook-light.svg"
                      alt="Facebook-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                <Image
                    src="/images/speed-youtube.png"
                    alt="Speed-Youtube"
                    layout="fill"
                    objectFit="fill"
                    className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                  />

              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                    <Image
                      src="/icons/Youtube-ligth.svg"
                      alt="Youtube-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                  <Image
                  src="/images/speed-youtube.png"
                  alt="Speed-Youtube"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                <Image
                      src="/icons/Linkedin-light.svg"
                      alt="Linkedin-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                <Image
                  src="/images/speed-linkedin.png"
                  alt="Speed-Linkedin"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                <Image
                      src="/icons/Facebook-light.svg"
                      alt="Facebook-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                <Image
                    src="/images/speed-youtube.png"
                    alt="Speed-Youtube"
                    layout="fill"
                    objectFit="fill"
                    className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                  />

              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                    <Image
                      src="/icons/Youtube-ligth.svg"
                      alt="Youtube-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}

                  <Image
                  src="/images/speed-youtube.png"
                  alt="Speed-Youtube"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />

              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* <SwiperSlide className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                    <Image
                      src="/icons/Youtube-ligth.svg"
                      alt="Youtube-Light"
                      width={32}
                      height={32}
                    />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                  <Image
                  src="/images/speed-youtube.png"
                  alt="Speed-Youtube"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />

              </div>
            </div>
          </div>
        </SwiperSlide> */}
            {/* {Array.from({ length: 8 }).map((_, index) => (
        <SwiperSlide key={index} className="slider-container">
          <div className="flex flex-col ">
            <div className="bg-black text-white p-8 rounded-t-lg flex-grow">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0">
                {index === 0 ? (
                    <Image
                      src="/icons/Youtube-ligth.svg"
                      alt="Youtube-Light"
                      width={32}
                      height={32}
                    />
                  ) : index === 1 ? (
                    <Image
                      src="/icons/Linkedin-light.svg"
                      alt="Linkedin-Light"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/icons/Facebook-light.svg"
                      alt="Facebook-Light"
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                <div className="flex flex-col pt-2">
                  <p className="text-xs leading-4 text-white opacity-80">
                    Overview of Recent U.S. Economic Data: Attention on the
                    Federal Reserve&apos;s Policy Direction Recent U.S. economic
                    data has shown signs of cooling, including declines in April
                    retail sales, CPI, and PCE, as well as drops in...
                  </p>
                  <div className="pt-2" />
                  <Link
                    href="https://www.youtube.com/"
                    className="flex flex-row gap-2"
                  >
                    <span className="text-xs font-normal text-white opacity-60">
                      Know more
                    </span>
                    <Image
                      src="/icons/iconSmall/arrow-up-right-white-16x16.svg"
                      alt="Arrow-Up-Right-White-16x16"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
              <div className="pt-8" />
              <div className="flex flex-row gap-3">
                <div className="">
                  <Image
                    src="/images/Avatar-Official.png"
                    alt="Avatar-Official"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className="text-base font-normal text-sidebar">
                    Hantec Financial Global
                  </p>
                  <p className="text-grey-seccondary text-xs">05 Mar 24</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-b-lg w-full h-44 cursor-pointer">
              <div className="w-full h-36 relative rounded-b-lg">
                {" "}
                {index === 0  ? (
                  <Image
                  src="/images/speed-youtube.png"
                  alt="Speed-Youtube"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
                ) : index === 1 ? (
                  <Image
                  src="/images/speed-linkedin.png"
                  alt="Speed-Linkedin"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
                ) : (
                  <Image
                    src="/images/speed-youtube.png"
                    alt="Speed-Youtube"
                    layout="fill"
                    objectFit="fill"
                    className="rounded-b-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                  />
                ) }

              </div>
            </div>
          </div>
        </SwiperSlide>
      ))} */}
        </Swiper>
    );
};

export default SliderFeed;
