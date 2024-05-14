import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import QueryCard from './QueryCard';
import Swal from 'sweetalert2';
import AllQuerySkeleton from '../../pages/Loding/AllQuerySkeleton';
import MultyImgBanner from '../MultyImgBanner/MultyImgBanner';
import { Link } from 'react-router-dom';
import img1 from '../../assets/banner/1.jpg';
import { Search } from '@mui/icons-material';
import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt } from 'react-icons/tfi';
import { RiLayoutBottom2Fill } from 'react-icons/ri';
import QueryCardMeadium from './QueryCardMeadium';
import QueryCardLarge from './QueryCardLarge';
const AllQuerys = () => {
  const [serr, setSerr] = useState(null);
  // const [layouts, setLayouts] = useState(null);
  // Get all query data
  const axiosFetch = useAxios();
  let {
    data: datas = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => queryData(),
    queryKey: ['all-query'],
  });
  const queryData = async () => {
    const { data } = await axiosFetch(`/all-queries`);
    return data;
  };
  if ((error, isError)) {
    Swal.fire({
      title: 'Oppps ....!',
      text: 'Querys data is not coming. Check your network!',
      icon: 'error',
    });
  }
  // end all query data geting ==========

  // Sorting order =============
  const [sortDta, setSortDta] = useState(null);
  if (sortDta === 'default') {
    console.log('default');
    const sorting = datas.sort((a, b) => {
      const datA = new Date(a.dateTime);
      const datB = new Date(b.dateTime);
      return datB - datA;
    });
    datas = sorting;
  } else if (sortDta === 'dateTimeDown') {
    console.log('dateTime');
    const sorting = datas.sort((a, b) => {
      const datA = new Date(a.dateTime);
      const datB = new Date(b.dateTime);
      return datB - datA;
    });
    datas = sorting;
  } else if (sortDta === 'dateTimeUp') {
    console.log('dateTime');
    const sorting = datas.sort((a, b) => {
      const datA = new Date(a.dateTime);
      const datB = new Date(b.dateTime);
      return datA - datB;
    });
    datas = sorting;
  } else if (sortDta === 'recommendationDown') {
    console.log('recommendation');
    const sorting = datas.sort(
      (a, b) => b.recommendationCount - a.recommendationCount
    );
    datas = sorting;
  } else if (sortDta === 'recommendationUp') {
    console.log('recommendationUp');
    const sorting = datas.sort(
      (a, b) => a.recommendationCount - b.recommendationCount
    );
    datas = sorting;
  }
  // End Sorting order============

  // Handle layout Function
  const handleLayout = (e) => {
    console.log(e);
  };

  // end Handle layout Function

  // Search functionality========
  const handleSearch = (e) => {
    setSerr(null);
    e.preventDefault();
    const search = e.target.search.value;
    if (search.length < 3) {
      setSerr(true);
      return;
    }
    console.log(search);
  };
  // End Search functionality========
  return (
    <div className="">
      <div className="mb-10">
        {/* Banner Part */}
        <div className="h-64 sm:h-72 w-full bg-red-200 relative">
          <MultyImgBanner img1={img1} />
          <div className="absolute z-10 top-0 left-0 bg-[#00000073] w-full h-full">
            <div className="h-full w-10/12 mx-auto flex items-center justify-center pt-10 sm:pt-20 text-center">
              <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold text-white ">
                <Link to={'/'}>
                  <button className="border-b border-mClr tracking-wider">
                    Home
                  </button>
                </Link>
                <button className="">/</button>
                <Link to={''}>
                  <button className="border-b border-mClr tracking-wider">
                    All Querys
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        {/* Order Action layout  */}
        <div className="flex flex-col items-center gap-4 bg-gray-500 mb-3 p-4 rounded-t-md ">
          <div className="flex items-center gap-2 justify-between w-full">
            {/* Sorting Dropdown Button  */}
            <div className="sortingBtn">
              <Dropdown label="Sort By Query" className="">
                <Dropdown.Item onClick={() => setSortDta('default')}>
                  Default
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setSortDta('dateTimeDown')}>
                  <span className="flex items-center gap-2">
                    Date & Time
                    <span>
                      <FaArrowDown />
                    </span>
                  </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortDta('dateTimeUp')}>
                  <span className="flex items-center gap-2">
                    Date & Time
                    <span>
                      <FaArrowUp />
                    </span>
                  </span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setSortDta('recommendationDown')}>
                  <span className="flex items-center gap-2">
                    Recommendation
                    <span>
                      <FaArrowDown />
                    </span>
                  </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortDta('recommendationUp')}>
                  <span className="flex items-center gap-2">
                    Recommendation
                    <span>
                      <FaArrowUp />
                    </span>
                  </span>
                </Dropdown.Item>
              </Dropdown>
            </div>
            {/* End Sorting dropdown  */}

            {/* Start Layout Button  action */}
            <div className="lg:text-2xl px-4 lg:px-5 py-1 lg:py-2 bg-slate-400 rounded-md  flex items-center justify-between gap-3 lg:gap-5 text-white">
              <button
                onClick={() => handleLayout('threeColum')}
                className="px-2 py-2 rounded bg-slate-600"
              >
                <TfiLayoutColumn3Alt />
              </button>
              <button
                onClick={() => handleLayout('twoColum')}
                className="px-2 py-2 rounded bg-slate-600"
              >
                <TfiLayoutColumn2Alt />
              </button>
              <button
                onClick={() => handleLayout('oneColum')}
                className="px-2 py-2 rounded bg-slate-600"
              >
                <RiLayoutBottom2Fill />
              </button>
            </div>
            {/* end Layout Button  action */}

            {/* Start Searching  */}
            <div className="hidden lg:flex items-center">
              <form onSubmit={handleSearch} className="relative lg:w-80">
                <div className="absolute top-1/2 -translate-y-1/2 left-1">
                  <Search className={serr ? 'text-red-500' : ''} />
                </div>
                <input
                  type="text"
                  name="search"
                  id="default-search"
                  className={`block w-full pl-8 pr-[88px] py-[12px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${
                    serr ? 'placeholder-red-500' : 'placeholder-gray-700'
                  }`}
                  placeholder="Search keyword"
                />
                <button
                  type="submit"
                  className="text-white absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1"
                >
                  Search
                </button>
              </form>
              {/* <button className="py-2 rounded-r-md">Search</button> */}
            </div>
          </div>
          <div className="flex lg:hidden items-center w-full">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-1">
                <Search className={serr ? 'text-red-500' : ''} />
              </div>
              <input
                type="text"
                name="search"
                id="default-search"
                className={`block w-full pl-8 pr-[88px] py-[10px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${
                  serr ? 'placeholder-red-500' : 'placeholder-gray-700'
                }`}
                placeholder="Search keyword"
              />
              <button
                type="submit"
                className="text-white absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1"
              >
                Search
              </button>
            </form>
            {/* <button className="py-2 rounded-r-md">Search</button> */}
          </div>
          {/* End Searching  */}
        </div>

        {/* Start main Card Layout  */}
        <div>
          {isLoading ? (
            <AllQuerySkeleton
              crt={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              h={60}
              w={'40%'}
            />
          ) : (
            // Layout 3 colum ============
            // <div className="max-w-[500px] mx-auto sm:max-w-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 xl:gap-6">
            //   {datas.map((dta) => (
            //     <QueryCard dta={dta} key={dta._id} />
            //   ))}
            // </div>

            //  Layout 3 Colum ============
            // <div className="max-w-[500px] mx-auto sm:max-w-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-4 xl:gap-6">
            //   {datas.map((dta) => (
            //     <QueryCardMeadium dta={dta} key={dta._id} />
            //   ))}
            // </div>

            //  Layou 1 Colum ===============
            <div className="max-w-[500px] mx-auto sm:max-w-max grid grid-cols-1 gap-6 sm:gap-4 xl:gap-6">
              {datas.map((dta) => (
                <QueryCardLarge dta={dta} key={dta._id} />
              ))}
            </div>
          )}
        </div>
        {/* End main Card Layout  */}
      </div>
    </div>
  );
};

export default AllQuerys;
