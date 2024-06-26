import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import img1 from '../../assets/banner/5.jpg';
import noDataImg from '../../assets/error/noDta.jpg';
import MultyImgBanner from '../../components/MultyImgBanner/MultyImgBanner';
import useAuth from '../../Hooks/useAuth';
import useAxiosSec from '../../Hooks/useAxiosSec';
import QuerySkeleton from '../Loding/QuerySkeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MyQuery from './MyQuery';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
const MyQueries = () => {
  const [viewAll, setViewAll] = useState(9);
  const axiosSecure = useAxiosSec();
  const queryClient = useQueryClient();
  const { userDta } = useAuth();

  const {
    data: myData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => queryData(),
    queryKey: ['my-query'],
  });

  const queryData = async () => {
    const { data } = await axiosSecure.get(`/my-queries/${userDta.email}`);
    return data;
  };
  // console.log(myData);

  // My Adding query deleting
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/my-queries-delete/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-query'] });
      console.log('Deleted Query');
    },
  });
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync({ id });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  if ((error, isError)) {
    Swal.fire({
      title: 'Oppps ....!',
      text: 'Querys data is not coming. Check your network!',
      icon: 'error',
    });
  }

  return (
    <div className="pb-14">
      <Helmet>
        <title>Alt Query|| My Queries</title>
      </Helmet>
      {/*Banner part  */}
      <div className="h-72 sm:h-96 relative">
        <MultyImgBanner img1={img1} />
        <div className="absolute z-10 top-0 left-0 bg-[#000000a8] w-full h-72 sm:h-96 ">
          <div className="h-full w-10/12 mx-auto flex items-center justify-center flex-col gap-8 pt-10 sm:pt-20 text-center">
            <h1 className="text-3xl sm:text-5xl text-white">
              Explore and Add Queries
            </h1>
            <Link to={'/add-queries'}>
              <button className="py-2 px-8 rounded hover:-skew-x-12 bg-mClr hover:bg-transparent border-2 border-mClr duration-200 text-white font-semibold tracking-widest hover:shadow-2xl shadow-mClr hover:scale-110">
                Add New Queries
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl text-center my-12 text-slate-900 dark:text-white border-b-2 px-4 md:border-b-4 border-mClr inline-block">
            My added queries
          </h1>
        </div>
        {isLoading ? (
          <QuerySkeleton />
        ) : myData.length < 1 ? (
          <div className="flex flex-col justify-center items-center">
            <div className="h-[450px]">
              <img
                className="max-h-full mx-auto rounded-md"
                src={noDataImg}
                alt=""
              />
            </div>

            <Link to={'/add-queries'}>
              <button className="px-9 py-2 hover:scale-110 duration-200 border-2 bg-mClr text-white text-center rounded-md text-xl my-5">
                Add New Query
              </button>
            </Link>
          </div>
        ) : (
          <div className="">
            <div className="max-w-[500px] mx-auto sm:max-w-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 xl:gap-6">
              {myData.slice(0, viewAll).map((dta) => (
                <MyQuery key={dta._id} dta={dta} handleDelete={handleDelete} />
              ))}
            </div>
            <div className="text-center">
              {myData.length > 9 && myData.length !== viewAll && (
                <button
                  onClick={() => setViewAll(viewAll + 6)}
                  className="mt-8 border-b border-mClr px-2 text-black text-lg dark:text-white font-light"
                >
                  See more query ...
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
