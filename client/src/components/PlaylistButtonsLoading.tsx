const PlaylistButtonsLoading = () => {
  return (
    <div className='container mx-auto px-3 animate-pulse'>
      <div
        role='status'
        className='flex justify-center items-center w-full mb-10 p-2 rounded'
      >
        <div className='h-8 w-2/5 ml-2 mr-1 my-4 p-2 bg-gray-300 rounded-xl shadow-inner'></div>
        <div className='h-8 w-1/2 p-2 my-4 bg-gray-300 rounded-xl shadow-inner'></div>
        <div className='h-8 w-10 ml-4 bg-gray-300 rounded-2xl shadow-md'></div>
        <div className='h-8 w-10 ml-4 bg-gray-300 rounded-2xl shadow-md'></div>
      </div>
      <div className='container mx-auto px-3'>
        <div className='h-28 lg:w-3/4 pt-4 pb-10 mx-auto bg-gray-300 rounded-xl shadow-inner'></div>
      </div>
    </div>
  );
};

export default PlaylistButtonsLoading;
