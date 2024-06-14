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
      <div className='flex flex-col justify-start items-center h-screen'>
        <h3 className='text-primaryDark dark:text-primaryLight text-2xl font-semibold mb-4'>
          {userInfo}'s Profile
        </h3>
        <hr />
        <span className='text-primaryDark dark:text-primaryLight text-center text-lg'>
          Log in to Spotify to save playlists to your Spotify account.
        </span>
        <FontAwesomeIcon
          className='h-16 mt-8 text-green-500 hover:text-green-700 transition active:scale-50 active:text-green-700 hover:scale-125 cursor-pointer'
          icon={faSpotify}
          onClick={handleSpotfiyConnect}
          title='Save playlist to Spotify account'
        />
      </div>
    </div>
  );
};

export default UserProfile;
