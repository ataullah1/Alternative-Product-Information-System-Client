import img1 from '../../assets/banner/9.jpg';
import { Link } from 'react-router-dom';
import MultyImgBanner from '../../components/MultyImgBanner/MultyImgBanner';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../Hooks/useAxiosSec';
import useAuth from '../../Hooks/useAuth';

const MyRecommendations = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalDta, setModalDta] = useState(null);
  const axiosSecure = useAxiosSec();
  const { userDta } = useAuth();
  // My Recommendations data get
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => dataGeting(),
    queryKey: ['my-recommendation'],
  });
  const dataGeting = async () => {
    const { data } = await axiosSecure.get(
      `/my-recommendations/${userDta.email}`
    );
    return data;
  };
  console.log(error, isError, isLoading);
  //   console.log(modalDta);
  return (
    <div>
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
                  My Recommendations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Table Part */}
      <div className="w-11/12 mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full shadow-md border mx-auto border-gray-100 my-6 text-slate-700 dark:text-slate-100">
            <thead>
              <tr className="bg-[#0095FF] text-white">
                <th className="py-6 px-1 text-lg text-center border-b">
                  Image
                </th>
                <th className="py-6 px-1 text-lg text-left border-b">
                  Product Name
                </th>
                <th className="py-6 px-1 text-lg text-left border-b">Title</th>
                <th className="py-6 px-1 text-lg text-left border-b">Reason</th>
                <th className="py-6 px-1 text-lg border-b text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dta) => (
                <tr
                  key={dta._id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-900 border-b transition duration-300"
                >
                  <td
                    onClick={() => setOpenModal(true)}
                    className="flex justify-start"
                  >
                    <div
                      onClick={() => setModalDta(dta)}
                      className="h-24 w-32"
                      style={{
                        backgroundImage: `url(${dta.recImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>
                  </td>
                  <td
                    onClick={() => setOpenModal(true)}
                    className="px-3 border-b border-r text-xl font-medium min-w-48"
                  >
                    <p onClick={() => setModalDta(dta)}>
                      {dta.recName.slice(0, 18)}
                      {dta.recName.length > 18 && '...'}
                    </p>
                  </td>
                  <td
                    onClick={() => setOpenModal(true)}
                    className=" px-1 border-b border-r text-xl font-medium min-w-56"
                  >
                    <p onClick={() => setModalDta(dta)}>
                      {dta.recTitle.slice(0, 32)}
                      {dta.recTitle.length > 32 && '...'}
                    </p>
                  </td>
                  <td
                    onClick={() => setOpenModal(true)}
                    className=" px-3 border-b border-r text-base font-medium w-96"
                  >
                    <p onClick={() => setModalDta(dta)}>
                      {dta.recReson.slice(0, 95)}
                      {dta.recReson.length > 95 && '...'}
                    </p>
                  </td>
                  <td className=" px-5 border-b text-end">
                    <button className="bg-error hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-8 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details modal */}
      <div
        className={`fixed z-[100] flex items-center justify-center ${
          openModal ? 'opacity-1 visible' : 'invisible opacity-0'
        } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          className={`absolute recommendModalStyle overflow-y-scroll max-h-screen sm:max-h-max w-11/12 sm:w-10/12 md:w-9/12 lg:w-4/6 rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
            openModal
              ? 'scale-1 opacity-1 duration-300'
              : 'scale-0 opacity-0 duration-150'
          } `}
        >
          <div>
            <div className="p-3 rounded-md">
              <div className="bg-gray-300 dark:bg-slate-900 rounded-md flex flex-col lg:flex-row lg:items-center justify-between gap-2 p-3 lg:p-0 mb-6">
                {/* Avatar image  */}
                <div className="h-20 flex items-center gap-3">
                  <img
                    className="h-full w-20 rounded-sm border-2 border-mClr"
                    src={modalDta?.userImg}
                    alt="card navigate ui"
                  />
                  <div className="flex flex-col justify-start h-full py-2 text-left">
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 capitalize">
                      {modalDta?.recUserName}
                    </h2>
                    <p className="text-slate-800 dark:text-slate-300">
                      {modalDta?.recUserEmail}
                    </p>
                  </div>
                </div>
                {/* Setting button */}
                <div className="lg:pr-6 text-left">
                  <p className="text-slate-800 dark:text-slate-300">
                    <span className="font-semibold"> Date:</span>{' '}
                    {modalDta?.dateTime.slice(0, 10)}
                  </p>
                  <p className="text-slate-800 dark:text-slate-300">
                    <span className="font-semibold">Time:</span>{' '}
                    {modalDta?.dateTime.slice(11, 20)}
                  </p>
                </div>
              </div>
              <div className="w-full">
                {/* <div className="w-12"></div> */}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 w-full">
                  <div
                    className="h-64 w-full max-w-[550px] lg:w-3/5 bg-red-200 rounded-md"
                    style={{
                      backgroundImage: `url(${modalDta?.recImage})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                  {/* <div className="w-[1px] h-60 bg-gray-300 hidden lg:block"></div> */}
                  <div className="pt-3 w-full lg:w-2/5 flex flex-col md:flex-row lg:flex-col md:gap-10">
                    <div className="text-left sm:text-center md:text-left lg:text-center">
                      <p className="text-mClr font-bold text-lg">
                        Product Name:
                      </p>
                      <p className="text-xl xl:text-2xl font-medium text-slate-800 dark:text-slate-100 pb-0 sm:pb-5 md:pb-0 lg:pb-5">
                        {modalDta?.recName}
                      </p>
                    </div>
                    <div className="text-left sm:text-center md:text-left lg:text-center">
                      <p className="text-mClr font-bold text-lg">
                        Product Brand:
                      </p>
                      <p className="text-xl xl:text-2xl font-medium text-slate-800 dark:text-slate-100">
                        {modalDta?.recBrand}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-medium sm:text-3xl pt-4 pb-2 text-slate-800 dark:text-slate-100 font-serif">
                    {modalDta?.recTitle}
                  </h1>
                  <p className="text-slate-700 dark:text-slate-300 max-w-[800px]">
                    {modalDta?.recReson}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right pr-5">
            <button
              onClick={() => setOpenModal(false)}
              className="rounded-md bg-mClr hover:bg-[#1f81ba] px-6 py-1.5 text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecommendations;