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
    <div className='flex justify-center items-center mt-24'>
      <div className='flex flex-col p-8 lg:w-1/3 bg-light-100 dark:bg-primaryDark border shadow-md rounded-3xl hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition justify-center items-center'>
        <h3 className='text-slate-600 dark:text-slate-300 text-2xl text-center font-semibold mb-8'>
          {userInfo}'s Profile
        </h3>
        <hr className='text-slate-400' />
        <span className='text-slate-500 dark:text-slate-400 text-center text-lg'>
          Log in to Spotify to save playlists to your Spotify account.
        </span>
        <button
          className='mt-8 flex justify-center items-center py-3 px-7 w-fit bg-light-100 dark:bg-dark-400 border shadow-md rounded-full hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition cursor-pointer text-slate-400 text-2xl lg:hover:text-slate-300 active:text-slate-300 active:scale-50'
          onClick={handleSpotfiyConnect}
        >
          <FontAwesomeIcon
            className='mr-2 text-green-500 lg:hover:text-green-700 transition active:scale-50 active:text-green-700'
            icon={faSpotify}
            title='Save playlist to Spotify account'
          />
          Connect
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
