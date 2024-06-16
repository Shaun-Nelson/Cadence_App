import { useSelector } from "react-redux";
import { useLoginSpotifyMutation } from "../slices/thirdPartyApiSlice";
import { RootState } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [loginSpotify] = useLoginSpotifyMutation();

  const handleSpotfiyConnect = async () => {
    try {
      const res = await loginSpotify({}).unwrap();

      window.location.href = res;
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to Spotify");
    }
  };

  return (
    <div className='container mx-auto px-8 mt-24'>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col my-4 p-12 lg:w-2/5 bg-light-100 dark:bg-primaryDark border shadow-md rounded-3xl hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition justify-center items-center'>
          <h3 className='text-slate-600 dark:text-slate-300 text-2xl text-center font-semibold mb-4'>
            {userInfo}'s Profile
          </h3>
          <hr className='text-slate-400' />
          <span className='text-slate-500 dark:text-slate-400 text-center text-lg mt-4'>
            Log in to Spotify to save playlists to your Spotify account.
          </span>
          <button
            className='mt-8 flex justify-center items-center p-4 w-fit bg-light-100 dark:bg-primaryDark border shadow-md rounded-full hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition cursor-pointer text-slate-400 text-2xl lg:hover:text-slate-300 active:text-slate-300 active:scale-50'
            onClick={handleSpotfiyConnect}
          >
            <FontAwesomeIcon
              className='mr-2 text-green-500 lg:hover:text-green-700 transition active:scale-50 active:text-green-700'
              icon={faSpotify}
              title='Save playlist to Spotify account'
              size='lg'
            />
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
